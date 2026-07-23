# ===== BLOODFINDER AI - DOCKERFILE =====
# Multi-stage build for production

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .

# Production stage
FROM node:18-alpine
WORKDIR /app

# Create app directory
RUN mkdir -p /app/uploads

# Copy node modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Copy environment
COPY backend/.env ./.env

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/ || exit 1

# Start server
CMD ["node", "server.js"]
