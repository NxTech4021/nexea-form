import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  // Add experimental settings to ensure server actions work properly
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'eba.nexea.co'],
    },
  },
  // Temporarily remove standalone output to fix server action issues
  // output: 'standalone',

  images: {
    domains: ['eba.nexea.co'],
  },
};

export default nextConfig;
