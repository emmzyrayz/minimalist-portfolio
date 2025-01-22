// src/lib/db.ts
import {MongoClient} from "mongodb";

// Helper function to get the MongoDB URI based on the environment
const getMongoDBUri = () => {
  if (process.env.NODE_ENV === "development") {
    // Use NEXT_PUBLIC_MONGODB_URI for local development
    return process.env.NEXT_PUBLIC_MONGODB_URI || null;
  } else {
    // Use MONGODB_URI for production (Vercel)
    return process.env.MONGODB_URI || null;
  }
};

const uri = getMongoDBUri();

if (!uri) {
  throw new Error(
    "Please add your MongoDB URI to .env.local (for development) or the Vercel environment variables (for production)."
  );
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the MongoClient across module reloads
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;