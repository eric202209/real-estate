import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/real-estate',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
