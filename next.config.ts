import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/real-estate',
  images: {
    unoptimized: true,
  },
  // Output to dist instead of out
  distDir: 'dist',
};

export default nextConfig;
