import {NextResponse} from "next/server";
import clientPromise from "@/lib/db";
import {deterministicDecrypt, deterministicEncrypt, randomEncrypt} from "@/lib/encryption";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {headers} from "next/headers";
import {ObjectId} from "mongodb";

// Define interfaces for better type safety
// Define interfaces for better type safety
interface UserDocument {
  _id?: ObjectId; // Make _id optional since MongoDB will generate it
  name: string;
  encryptedEmail: string;
  hashedPassword?: string;
  role: string;
  newsletter: boolean;
  lastLogin?: Date;
  loginHistory?: Array<{
    timestamp: Date;
    ip: string;
  }>;
  visits?: Array<{
    timestamp: Date;
    deterministicIp: string;
    randomIp: {
      iv: string;
      encryptedData: string;
    };
  }>;
  createdAt?: Date;
  lastVisited?: Date;
}

export async function POST(request: Request) {
  try {
    const {email, password} = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {error: "Email and password are required"},
        {status: 400}
      );
    }

    const encryptedEmail = deterministicEncrypt(email);

    const client = await clientPromise;
    const db = client.db("portfolio");
    const users = db.collection<UserDocument>("users");

    const user = await users.findOne({encryptedEmail});

    // If user is not found, check if it's a visitor
    // If user is not found, check if it's a visitor
    if (!user) {
      // If the user is not found, check if the IP exists for a visitor
      const headersList = headers();
      const ip = headersList.get("x-forwarded-for") || "unknown";
      const deterministicIp = deterministicEncrypt(ip);

      const visitor = await users.findOne({
        role: "visitor",
        "visits.deterministicIp": deterministicIp,
      });

      if (visitor) {
        // Update visitor's last login and return success
        const token = jwt.sign(
          {
            userId: visitor._id.toString(),
            role: visitor.role,
            email: email, // Email is not stored for visitors
          },
          process.env.NEXT_PUBLIC_JWT_SECRET || "your-jwt-secret",
          {expiresIn: "24h"}
        );

        await users.updateOne(
          {_id: visitor._id},
          {
            $set: {lastLogin: new Date()},
            $push: {
              loginHistory: {
                timestamp: new Date(),
                ip: deterministicIp,
              },
            },
          }
        );

        return NextResponse.json({
          success: true,
          token,
          user: {
            _id: visitor._id,
            name: visitor.name,
            role: visitor.role,
            newsletter: visitor.newsletter,
          },
        });
      } else {
        // If no visitor found, create a new visitor
        const newVisitor: UserDocument = {
          name: "Visitor",
          role: "visitor",
          encryptedEmail: encryptedEmail,
          newsletter: false, // Add the required newsletter field
          visits: [
            {
              timestamp: new Date(),
              deterministicIp,
              randomIp: {
                iv: "",
                encryptedData: "",
              },
            },
          ],
          createdAt: new Date(),
          lastVisited: new Date(),
        };

        const result = await users.insertOne(newVisitor);
        const token = jwt.sign(
          {
            userId: result.insertedId.toString(),
            role: "visitor",
            email: email,
          },
          process.env.NEXT_PUBLIC_JWT_SECRET || "your-jwt-secret",
          {expiresIn: "24h"}
        );

        return NextResponse.json({
          success: true,
          token,
          user: {
            _id: result.insertedId,
            name: newVisitor.name,
            role: "visitor",
            newsletter: false,
          },
        });

        
      }
    }

    // If user is found, check for password if it's an admin or user
    if (user.hashedPassword) {
      const passwordValid = await bcrypt.compare(password, user.hashedPassword);

      if (!passwordValid) {
        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
      }
    } else {
      // If the user is a visitor, we don't check for a password
      return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
        email: email,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET || "your-jwt-secret",
      {expiresIn: "24h"}
    );

    const headersList = headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const deterministicIp = deterministicEncrypt(ip);

    // Update last login with proper MongoDB update operators
    await users.updateOne(
      {_id: user._id},
      {
        $set: {lastLogin: new Date()},
        $push: {
          loginHistory: {
            timestamp: new Date(),
            ip: deterministicIp,
          },
        },
      }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: deterministicDecrypt(user.encryptedEmail),
        role: user.role,
        newsletter: user.newsletter,
      },
    });
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
