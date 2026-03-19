import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Use basePath/assetPrefix only in production (GitHub Pages)
  ...(isProd
    ? {
        basePath: '/real-estate',
        assetPrefix: '/real-estate/',
        // Ensure paths like /real-estate/about/ resolve correctly on static hosting
        trailingSlash: true,
      }
    : {}),
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
