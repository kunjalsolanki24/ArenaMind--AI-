import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for production-quality code
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
