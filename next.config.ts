import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['eba.nexea.co'],
  },
  output: 'standalone',
};

export default nextConfig;
