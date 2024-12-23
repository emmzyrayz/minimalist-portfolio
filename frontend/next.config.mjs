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
};

export default nextConfig;
