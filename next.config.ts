import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev HMR/assets: allow local hosts + Cloudflare quick tunnels.
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.trycloudflare.com"],
};

export default nextConfig;
