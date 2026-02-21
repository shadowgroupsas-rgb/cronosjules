FROM node:22-alpine AS builder

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json package-lock.json ./

# Copy workspace package.json files
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
# mobile is not needed for backend build

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build API
RUN npm run build --workspace=apps/api

# Production stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/

EXPOSE 4000

CMD ["node", "apps/api/dist/main"]
