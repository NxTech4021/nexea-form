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
ARG NEXT_PUBLIC_RESEND_API_KEY
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY

ENV NEXT_PUBLIC_RESEND_API_KEY=$NEXT_PUBLIC_RESEND_API_KEY
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY

# Generate Prisma client
RUN npx prisma generate

# Build the application with proper server actions support
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files for standalone build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

USER nextjs

# Expose port
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the app
#CMD ["node", "server.js"]
CMD ["npm", "start"]