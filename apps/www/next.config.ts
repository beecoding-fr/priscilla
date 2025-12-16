import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@priscilla/auth",
    "@priscilla/database",
    "@priscilla/ui",
  ],
};

export default nextConfig;
