import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare quick tunnels change hostname each restart; allow their JS/HMR in dev.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
