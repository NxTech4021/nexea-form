#!/bin/bash

# Docker build script for Next.js app with server actions
# This script builds the Docker image with proper environment variables

set -e

echo "🐳 Building Docker image for Next.js app..."

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  Warning: DATABASE_URL not set"
fi

if [ -z "$JWT_SECRET" ]; then
    echo "⚠️  Warning: JWT_SECRET not set"
fi

if [ -z "$BASE_URL" ]; then
    echo "⚠️  Warning: BASE_URL not set"
fi

# Build the Docker image
docker build \
  --build-arg NEXT_PUBLIC_RESEND_API_KEY="${NEXT_PUBLIC_RESEND_API_KEY}" \
  --build-arg NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY}" \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --build-arg JWT_SECRET="${JWT_SECRET}" \
  --build-arg BASE_URL="${BASE_URL}" \
  -t nexea-form:latest \
  .

echo "✅ Docker image built successfully!"
echo "🚀 To run the container:"
echo "   docker run -p 3000:3000 --env-file .env nexea-form:latest"