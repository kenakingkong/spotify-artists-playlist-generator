import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://i.scdn.co/image/**")],
  },
};

export default nextConfig;
