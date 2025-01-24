// /utils/env.ts

/**
 * Type definition for environment variables configuration
 */
interface EnvConfig {
  name: string;
  required: boolean;
  default?: string;
}

/**
 * Environment variable configurations
 */
const ENV_CONFIG: Record<string, EnvConfig> = {
  // GitHub Configuration
  GITHUB_TOKEN: {
    name: "GITHUB_TOKEN",
    required: true,
  },
  NEXT_PUBLIC_GITHUB_TOKEN: {
    name: "NEXT_PUBLIC_GITHUB_TOKEN",
    required: false,
  },

  // Application URLs
  APP_URL: {
    name: "APP_URL",
    required: true,
    default: "http://localhost:3000",
  },
  NEXT_PUBLIC_APP_URL: {
    name: "NEXT_PUBLIC_APP_URL",
    required: false,
    default: "http://localhost:3000",
  },

  // MongoDB Configuration
  MONGODB_URI: {
    name: "MONGODB_URI",
    required: true,
  },
  NEXT_PUBLIC_MONGODB_URI: {
    name: "NEXT_PUBLIC_MONGODB_URI",
    required: false,
  },

  // JWT Configuration
  JWT_SECRET: {
    name: "JWT_SECRET",
    required: true,
  },
  NEXT_PUBLIC_JWT_SECRET: {
    name: "NEXT_PUBLIC_JWT_SECRET",
    required: false,
  },

  // Encryption Configuration
  ENCRYPTION_KEY: {
    name: "ENCRYPTION_KEY",
    required: true,
  },
  NEXT_PUBLIC_ENCRYPTION_KEY: {
    name: "NEXT_PUBLIC_ENCRYPTION_KEY",
    required: false,
  },
};

function debugEnvVar(key: string): void {
  // if (process.env.NODE_ENV === "development") {
  //   // console.log(`Checking ${key}:`, {
  //   //   exists: process.env[key] !== undefined,
  //   //   value: process.env[key] ? "[PRESENT]" : "[MISSING]",
  //   // });
  // }
}

function getEnvVar(key: keyof typeof ENV_CONFIG): string {
  debugEnvVar(key);

  const config = ENV_CONFIG[key];

  // Try getting the value from process.env
  const value = process.env[key];
  if (value) return value;

  // Use default value if available
  if (config.default !== undefined) {
    return config.default;
  }

  // Throw error if required and not found
  if (config.required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return "";
}

const env = {
  // Environment checks
  isDevelopment: () => process.env.NODE_ENV === "development",
  isProduction: () => process.env.NODE_ENV === "production",
  isTest: () => process.env.NODE_ENV === "test",

  // Getters for specific environment variables
  getGitHubToken: () =>
    getEnvVar(
      process.env.NODE_ENV === "development"
        ? "NEXT_PUBLIC_GITHUB_TOKEN"
        : "GITHUB_TOKEN"
    ),
  getMongoDBUri: () =>
    getEnvVar(
      process.env.NODE_ENV === "development"
        ? "NEXT_PUBLIC_MONGODB_URI"
        : "MONGODB_URI"
    ),
  getJwtSecret: () =>
    getEnvVar(
      process.env.NODE_ENV === "development"
        ? "NEXT_PUBLIC_JWT_SECRET"
        : "JWT_SECRET"
    ),
  getEncryptionKey: () =>
    getEnvVar(
      process.env.NODE_ENV === "development"
        ? "NEXT_PUBLIC_ENCRYPTION_KEY"
        : "ENCRYPTION_KEY"
    ),
  getAppUrl: () =>
    getEnvVar(
      process.env.NODE_ENV === "development" ? "NEXT_PUBLIC_APP_URL" : "APP_URL"
    ),

  // Validation
  validateEnvVars: () => {
    const missing: string[] = [];
    const available: string[] = [];

    Object.entries(ENV_CONFIG).forEach(([key, config]) => {
      if (config.required) {
        try {
          const value = getEnvVar(key as keyof typeof ENV_CONFIG);
          if (value) {
            available.push(key);
          } else {
            missing.push(key);
          }
        } catch {
          missing.push(key);
        }
      }
    });

    return {
      valid: missing.length === 0,
      missing,
      available,
    };
  },
};

export default env;
