import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['eba.nexea.co'],
  },
  // Remove standalone output - using regular Next.js build
  // output: 'standalone',
  
  // Add experimental settings to ensure server actions work properly
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'eba.nexea.co'],
    },
  },
};

export default nextConfig;
