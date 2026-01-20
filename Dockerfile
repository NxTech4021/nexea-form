# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# ENV DATABASE_URL=postgresql://nexea:nexea123_@34.143.207.72:5432/eba
# ENV DATABASE_URL="postgresql://nexea:nexea123_@/eba?host=/cloudsql/my-project-nexea:asia-southeast1:nexea-prod/.s.PGSQL.5432"


RUN npx prisma generate
# RUN npx prisma migrate deploy
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the standalone output (includes minimal node_modules)
COPY --from=builder /app/.next/standalone ./

# Copy static files to the correct location
COPY --from=builder /app/.next/static ./.next/static

# Copy public files
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Set hostname for Next.js
ENV HOSTNAME="0.0.0.0"

# Start the standalone server (NOT npm start)
CMD ["node", "server.js"]


# FROM node:18-alpine

# WORKDIR /app

# # Install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy everything else
# COPY . .

# # Generate Prisma client
# RUN npx prisma generate

# # Build app
# RUN npm run build

# # Expose port
# EXPOSE 3000

# # Run app
# CMD ["npm", "start"]
