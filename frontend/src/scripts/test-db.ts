// src/scripts/test-db.ts
import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

async function test() {
  if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
    console.error(
      "NEXT_PUBLIC_MONGODB_URI is not defined in environment variables"
    );
    process.exit(1);
  }

  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("dikeportfolio");

    // Try to ping the database
    await db.command({ping: 1});
    // console.log("Successfully connected to MongoDB!");

    // List collections
    // const collections = await db.listCollections().toArray();
    // console.log(
    //   "Available collections:",
    //   collections.map((c) => c.name)
    // );
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    await client.close();
  }
}

test().catch(console.error);
