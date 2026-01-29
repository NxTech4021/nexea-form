# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies (including devDependencies for build)
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables
ARG NEXT_PUBLIC_RESEND_API_KEY
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ARG DATABASE_URL
ARG JWT_SECRET
ARG BASE_URL

ENV NEXT_PUBLIC_RESEND_API_KEY=$NEXT_PUBLIC_RESEND_API_KEY
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV BASE_URL=$BASE_URL

# Generate Prisma client
RUN npx prisma generate

# Build the application with server actions debugging
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Verify server actions are built
RUN ls -la .next/server/app/actions/ || echo "Server actions directory not found"

# Production image, copy all the files and run next
# FROM node:18-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# # Create nextjs user
# # RUN addgroup --system --gid 1001 nodejs
# # RUN adduser --system --uid 1001 nextjs

# # Install only production dependencies for runtime
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production && npm cache clean --force

# # Copy the built application
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next

# # Copy Prisma files
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# # Change ownership of the app directory
# # RUN chown -R nextjs:nodejs /app

# # USER nextjs

# # Expose port
# EXPOSE 3000

# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# # Start the app using npm start (which runs next start)
# CMD ["npm", "start"]
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

COPY --from=builder /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

# syntax=docker.io/docker/dockerfile:1





# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# # Uncomment the following line in case you want to disable telemetry during runtime.
# # ENV NEXT_TELEMETRY_DISABLED=1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT=3000

# # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
# ENV HOSTNAME="0.0.0.0"
# CMD ["node", "server.js"]