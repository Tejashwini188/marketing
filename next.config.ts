import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Profile photo uploads go through a server action (5 MB per photo).
    serverActions: { bodySizeLimit: "6mb" },
  },
};

export default nextConfig;
