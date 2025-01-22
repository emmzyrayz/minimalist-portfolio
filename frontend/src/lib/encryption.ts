// /lib/encryption.ts
import crypto from "crypto";


// Helper function to get the encryption key based on the environment
const getEncryptionKey = () => {
  if (process.env.NODE_ENV === "development") {
    // Use NEXT_PUBLIC_ENCRYPTION_KEY for local development
    return process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "your-32-character-secret-key-here";
  } else {
    // Use ENCRYPTION_KEY for production (Vercel)
    return process.env.ENCRYPTION_KEY || "your-32-character-secret-key-here";
  }
};

const ENCRYPTION_KEY = getEncryptionKey();

// Ensure the encryption key is 32 bytes (required for AES-256)
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error(
    "Invalid encryption key. Please provide a 32-character key in your environment variables."
  );
}

// const IV_LENGTH = 16;
const IV = Buffer.from("1234567890123456"); 

/**
 * Deterministically encrypts a given text using AES-256-CBC.
 * @param text - The text to encrypt.
 * @returns The encrypted text in hex format.
 */
export function deterministicEncrypt(text: string): string {
  if (!text) return "";

  try {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY, "hex"),
      IV
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.error("Error during deterministic encryption:", error);
    throw new Error("Encryption failed");
  }
}

/**
 * Deterministically decrypts a given encrypted text using AES-256-CBC.
 * @param text - The encrypted text in hex format.
 * @returns The decrypted text.
 */
export function deterministicDecrypt(text: string): string {
  if (!text) return "";

  try {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY, "hex"),
      IV
    );
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Error during deterministic decryption:", error);
    throw new Error("Decryption failed");
  }
}

/**
 * Randomly encrypts a given text using AES-256-CBC.
 * @param text - The text to encrypt.
 * @returns An object containing the IV and encrypted data in hex format.
 */
export function randomEncrypt(text: string): {
  iv: string;
  encryptedData: string;
} {
  if (!text) return { iv: "", encryptedData: "" };

  try {
    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY, "hex"),
      iv
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return {
      iv: iv.toString("hex"),
      encryptedData: encrypted,
    };
  } catch (error) {
    console.error("Error during random encryption:", error);
    throw new Error("Encryption failed");
  }
}

/**
 * Randomly decrypts a given encrypted text using AES-256-CBC.
 * @param iv - The IV in hex format.
 * @param encryptedData - The encrypted data in hex format.
 * @returns The decrypted text.
 */
export function randomDecrypt(iv: string, encryptedData: string): string {
  if (!iv || !encryptedData) return "";

  try {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY, "hex"),
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Error during random decryption:", error);
    throw new Error("Decryption failed");
  }
}