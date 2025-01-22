/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com", // The domain you want to allow
        port: "", // Leave empty if not using a specific port
        pathname: "/**", // Allow all paths
      },
    ],
  },
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    MONGODB_URI: process.env.MONGODB_URI,
    APP_URL: process.env.APP_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  },
};

export default nextConfig;
