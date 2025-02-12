// /lib/encryption.ts
import env from "@/utils/env";
import crypto from "crypto";




const ENCRYPTION_KEY = env.getEncryptionKey();

// Ensure the encryption key is 64 characters (32 bytes when converted from hex)
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  throw new Error(
    "Invalid encryption key. Please provide a 64-character hex key in your environment variables."
  );
}

// Convert the hex key to a Buffer for use with crypto functions
const KEY_BUFFER = Buffer.from(ENCRYPTION_KEY, 'hex');
if (KEY_BUFFER.length !== 32) {
  throw new Error(
    "Invalid encryption key. The key must be a valid 64-character hex string that converts to 32 bytes."
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
    const cipher = crypto.createCipheriv("aes-256-cbc", KEY_BUFFER, IV);
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
    const decipher = crypto.createDecipheriv("aes-256-cbc", KEY_BUFFER, IV);
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
    const cipher = crypto.createCipheriv("aes-256-cbc", KEY_BUFFER, iv);
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
      KEY_BUFFER,
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