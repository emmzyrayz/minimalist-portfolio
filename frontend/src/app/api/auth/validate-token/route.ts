// /app/api/auth/validate-token/route.ts
import {NextResponse} from "next/server";
import {headers} from "next/headers";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/db";

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const authorization = headersList.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({error: "Invalid token format"}, {status: 401});
    }

    const token = authorization.substring(7);
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "your-jwt-secret";

    try {
      const decoded = jwt.verify(token, secret) as any;

      // Optional: Verify user still exists in database
      const client = await clientPromise;
      const db = client.db("portfolio");
      const user = await db.collection("users").findOne({
        _id: decoded.userId,
      });

      if (!user) {
        return NextResponse.json({error: "User not found"}, {status: 401});
      }

      return NextResponse.json({
        valid: true,
        user: {
          _id: user._id,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      return NextResponse.json({error: "Invalid token"}, {status: 401});
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}