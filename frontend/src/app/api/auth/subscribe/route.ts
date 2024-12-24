// /app/api/auth/subscribe/route.ts
import {NextResponse} from "next/server";
import clientPromise from "@/lib/db";
import {deterministicEncrypt, randomEncrypt} from "@/lib/encryption";
import {headers} from "next/headers";
import bcrypt from "bcryptjs";
import {UpdateFilter, Document} from "mongodb";

interface Visit {
  timestamp: Date;
  deterministicIp: string;
  randomIp: {
    iv: string;
    encryptedData: string;
  };
}

interface UserDocument extends Document {
  name: string;
  role: string;
  newsletter: boolean;
  encryptedEmail?: string;
  hashedPassword?: string;
  createdAt: Date;
  lastVisited: Date;
  visits: Visit[];
}

// type UpdateOperations = {
//   $set: Partial<Pick<UserDocument, "lastVisited">>;
//   $push: {
//     visits: {
//       $each: Visit[];
//     };
//   };
// };

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password,
      role = "user",
      newsletter = true,
    } = await request.json();

    // Get IP address from headers
    const headersList = headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";

    const client = await clientPromise;
    const db = client.db("portfolio");
    const users = db.collection("users");

    // Encrypt IP using deterministic encryption for comparison
    const deterministicIp = deterministicEncrypt(ip);
    const randomIpData = randomEncrypt(ip);

    // For visitors, check if IP already exists
    if (role === "visitor") {
      const existingVisitor = await users.findOne({
        "visits.deterministicIp": deterministicIp,
        role: "visitor",
      });

      if (existingVisitor) {
        const newVisit: Visit = {
          timestamp: new Date(),
          deterministicIp,
          randomIp: randomIpData,
        };

        // Update existing visitor's last visit
        await users.updateOne({_id: existingVisitor._id}, {
          $set: { lastVisited: new Date() },
          $push: {
            visits: {
              $each: [newVisit],
            },
          },
        } as unknown as UpdateFilter<UserDocument>);

        return NextResponse.json({
          success: true,
          message: "Visitor updated successfully",
          userId: existingVisitor._id,
        });
      }
    }

    // For email users, check if email exists
    if (email) {
      const encryptedEmail = deterministicEncrypt(email);
      const existingUser = await users.findOne({encryptedEmail});

      if (existingUser) {
        return NextResponse.json(
          {error: "User with this email already exists"},
          {status: 400}
        );
      }
    }

    // Handle admin registration
    if (role === "admin") {
      const existingAdmin = await users.findOne({role: "admin"});
      if (existingAdmin) {
        return NextResponse.json(
          {error: "Admin already exists"},
          {status: 400}
        );
      }
      if (!password) {
        return NextResponse.json(
          {error: "Password required for admin role"},
          {status: 400}
        );
      }
    }

    // Create new user/visitor document
    const userData: Partial<UserDocument>= {
      name: name || "Visitor",
      role,
      newsletter,
      createdAt: new Date(),
      lastVisited: new Date(),
      visits: [
        {
          timestamp: new Date(),
          deterministicIp,
          randomIp: randomIpData,
        },
      ],
    };

    if (email) {
      userData.encryptedEmail = deterministicEncrypt(email);
    }

    if (password) {
      userData.hashedPassword = await bcrypt.hash(password, 12);
    }

    const result = await users.insertOne(userData as UserDocument);

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Error in subscribe API:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}