// /app/api/auth/validate-token/route.ts
import {NextResponse} from "next/server";
import {headers} from "next/headers";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/db";
import {ObjectId} from "mongodb";

interface JwtPayload {
  userId: string;
}

// Helper function to get the JWT secret based on the environment
const getJwtSecret = () => {
  if (process.env.NODE_ENV === "development") {
    // Use NEXT_PUBLIC_JWT_SECRET for local development
    return process.env.NEXT_PUBLIC_JWT_SECRET || "your-jwt-secret";
  } else {
    // Use JWT_SECRET for production (Vercel)
    return process.env.JWT_SECRET || "your-jwt-secret";
  }
};

export async function POST() {
  try {
    const headersList = headers();
    const authorization = headersList.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({error: "Invalid token format"}, {status: 401});
    }

    const token = authorization.substring(7);
    const secret = getJwtSecret();

    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;

      // Optional: Verify user still exists in database
      const client = await clientPromise;
      const db = client.db("portfolio");
      const user = await db.collection("users").findOne({
        _id: new ObjectId(decoded.userId),
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
    } catch {
      return NextResponse.json({error: "Invalid token"}, {status: 401});
    }
  } catch (err) {
    console.error("Error validating token:", err);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}