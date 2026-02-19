# ============================================
# Stage 1: Build frontend (Vite)
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build the React/Vite frontend
RUN npm run build

# ============================================
# Stage 2: Production server
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files and install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend from builder
COPY --from=builder /app/dist ./dist

# Copy server source
COPY server ./server
COPY tsconfig.json ./

# Create data directory
RUN mkdir -p server/data && echo '[]' > server/data/rsvps.json

# Install tsx for running TypeScript
RUN npm install -g tsx

EXPOSE 3001

ENV NODE_ENV=production

CMD ["tsx", "server/index.ts"]
