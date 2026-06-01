import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['172.20.10.2'], 
  distDir: "build", 
  devIndicators: false, 
};

export default nextConfig;
