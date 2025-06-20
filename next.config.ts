import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
