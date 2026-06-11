FROM node:18-alpine AS builder

WORKDIR /app

# Copy package and lock files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the source code
COPY . .

# Build Next.js application
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built assets and dependencies from the builder phase
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose Next.js port
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]
