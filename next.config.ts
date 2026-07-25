import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "assets.vercel.com",
      },
      {
        protocol: "https",
        hostname: "devicons.railway.com",
      },
      {
        protocol: "https",
        hostname: "console.groq.com",
      },
    ],
  },
};

export default nextConfig;
