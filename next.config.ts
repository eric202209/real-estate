import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/real-estate',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
