import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['bullmq', 'fastify', 'pino', 'pino-pretty'],
};

export default nextConfig;