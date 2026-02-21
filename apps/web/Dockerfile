FROM node:22-alpine AS builder

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json package-lock.json ./

# Copy workspace package.json files
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Web
RUN npm run build --workspace=apps/web

# Production stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/

EXPOSE 3000

CMD ["npm", "start", "--workspace=apps/web"]
