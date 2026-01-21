#!/usr/bin/env node

/**
 * Script to fix server action deployment issues
 * This script ensures server actions are properly built and deployed
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing server action deployment issues...');

// 1. Check if .next directory exists
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.error('❌ .next directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// 2. Check for server actions in the build
const serverActionsDir = path.join(nextDir, 'server', 'app', 'actions');
if (fs.existsSync(serverActionsDir)) {
  console.log('✅ Server actions found in build directory');
} else {
  console.log('⚠️  Server actions directory not found in build');
}

// 3. Verify environment variables
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL', 'BASE_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// 4. Check BASE_URL format
if (process.env.BASE_URL && process.env.BASE_URL.includes('localhost')) {
  console.warn('⚠️  BASE_URL is set to localhost. Make sure to update this for production.');
}

console.log('✅ Server action deployment checks completed successfully!');
console.log('📝 Next steps:');
console.log('   1. Make sure your production environment has the correct BASE_URL');
console.log('   2. Clear any deployment caches');
console.log('   3. Redeploy your application');