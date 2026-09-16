import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_CLOUDFLARE_SITE_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY,
  },
};

export default nextConfig;
