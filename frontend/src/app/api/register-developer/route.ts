// src/app/api/register-developer/route.ts
import {NextResponse} from "next/server";
import clientPromise from "@/lib/db";
import {z} from "zod";

const DeveloperSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  techStack: z.string().min(1, "Tech stack is required"),
  programmingLanguages: z
    .array(z.string())
    .min(1, "At least one programming language is required"),
  codingIDEs: z.array(z.string()).min(1, "At least one coding IDE is required"),
  contactPreference: z.enum(["email", "social"]),
  socialMediaLink: z.string().optional(),
  projectInterest: z
    .string()
    .min(10, "Please provide more details about your interest"),
  ideas: z.string().min(10, "Please provide more details about your ideas"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = DeveloperSchema.parse(body);

    const client = await clientPromise;
    const db = client.db("dikeportfolio");

    const developerData = {
      ...validatedData,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("developers").insertOne(developerData);

    return NextResponse.json(
      {
        message: "Developer registered successfully",
        developerId: result.insertedId,
      },
      {status: 201}
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors,
        },
        {status: 400}
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {status: 500}
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("dikeportfolio");

    const developers = await db
      .collection("developers")
      .find({})
      .sort({createdAt: -1})
      .toArray();

    return NextResponse.json(developers);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {status: 500}
    );
  }
}