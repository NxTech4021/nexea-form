#!/usr/bin/env node

/**
 * Debug script for server action issues
 * Run this after build to check if server actions are properly compiled
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging server actions...');

// Check if .next directory exists
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.error('❌ .next directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Check server actions directory
const serverActionsDir = path.join(nextDir, 'server', 'app', 'actions');
console.log('📁 Checking server actions directory:', serverActionsDir);

if (fs.existsSync(serverActionsDir)) {
  console.log('✅ Server actions directory found');
  const files = fs.readdirSync(serverActionsDir);
  console.log('📄 Server action files:', files);
} else {
  console.log('⚠️  Server actions directory not found');
}

// Check for server chunks
const serverDir = path.join(nextDir, 'server');
if (fs.existsSync(serverDir)) {
  console.log('✅ Server directory found');
  
  // Look for action-related files
  function findActionFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        findActionFiles(fullPath, files);
      } else if (item.includes('action') || item.includes('server')) {
        files.push(fullPath.replace(process.cwd(), '.'));
      }
    }
    return files;
  }
  
  const actionFiles = findActionFiles(serverDir);
  if (actionFiles.length > 0) {
    console.log('🎯 Found action-related files:');
    actionFiles.forEach(file => console.log('  -', file));
  } else {
    console.log('⚠️  No action-related files found in server directory');
  }
}

// Check environment variables
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL', 'BASE_URL'];
console.log('\n🌍 Environment variables:');
requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`✅ ${envVar}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${envVar}: Not set`);
  }
});

console.log('\n📝 Troubleshooting tips:');
console.log('1. Ensure all server actions have "use server" directive');
console.log('2. Check that actions are properly exported');
console.log('3. Verify environment variables are set in production');
console.log('4. Clear deployment cache and redeploy');
console.log('5. Check server logs for detailed error messages');