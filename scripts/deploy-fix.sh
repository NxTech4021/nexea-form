#!/bin/bash

# Deployment fix script for server actions
# This script ensures proper deployment with stable server actions

set -e

echo "🚀 Preparing deployment with stable server actions..."

# Clean build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️  Building application..."
npm run build

# Verify server actions are built
echo "🔍 Verifying server actions..."
if [ -d ".next/server/app/actions" ]; then
    echo "✅ Server actions directory found"
    ls -la .next/server/app/actions/
else
    echo "⚠️  Server actions directory not found, but this might be normal for the new structure"
fi

# Check for stable actions
if [ -f ".next/server/app/actions/stable-auth.js" ]; then
    echo "✅ Stable auth actions found"
else
    echo "⚠️  Stable auth actions not found in expected location"
fi

echo "✅ Deployment preparation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Set environment variables in your deployment platform:"
echo "   - DATABASE_URL"
echo "   - JWT_SECRET" 
echo "   - BASE_URL (should be your production domain)"
echo "   - NEXT_PUBLIC_RESEND_API_KEY"
echo ""
echo "2. Deploy using your preferred method (Docker, Vercel, etc.)"
echo ""
echo "3. If server action errors persist, check:"
echo "   - Environment variables are correctly set"
echo "   - No caching issues in your deployment platform"
echo "   - Server logs for detailed error messages"