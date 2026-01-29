import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
// eslint: {
//   // Skip ESLint errors during production builds
//   ignoreDuringBuilds: true,
// },
//   images: {
//     domains: ['eba.nexea.co'],
//   },
//   // Remove standalone output - using regular Next.js build
//   // output: 'standalone',

//   // Enhanced server actions configuration
//   experimental: {
//     serverActions: {
//       allowedOrigins: ['localhost:3000', 'eba.nexea.co', '*.nexea.co'],
//       bodySizeLimit: '2mb',
//     },
//   },

//   // Ensure proper compilation of server actions
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       // Ensure server actions are properly compiled
//       config.optimization.splitChunks = {
//         ...config.optimization.splitChunks,
//         cacheGroups: {
//           ...config.optimization.splitChunks?.cacheGroups,
//           serverActions: {
//             name: 'server-actions',
//             test: /server-actions/,
//             chunks: 'all',
//             priority: 10,
//           },
//         },
//       };
//     }
//     return config;
//   },
// };

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
};

export default nextConfig;
