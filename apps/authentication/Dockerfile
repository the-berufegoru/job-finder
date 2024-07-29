# Use Node.js LTS version
FROM node:21-alpine3.18

# Set working directory
WORKDIR /authentication

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy all files to working directory
COPY . .

# Set production environment
ENV NODE_ENV=production

# Expose port 3001
EXPOSE 3001

# Define entrypoint with main entry file
CMD ["node", "authentication"]

# Health check to ensure the container is running as expected
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1
