# Three stages: base, development and production
# Base stage
# Build imagae from node
FROM node:20-alpine as base
# Create working directory in Docker
WORKDIR /app
# Copy package.json and package-lock.json from the current location
# and paste to the working dir in Docker
COPY package*.json /app
# Expose the port #8000
EXPOSE 8000

# Development stage
# It starts from base stage defined above
FROM base as development
# Set NODE_ENV variable as development
ENV NODE_ENV=development
# Download node_modules
RUN npm install
# Copy source code from the current location
# and paste to the Docker working dir.
COPY . .
# Run the cli to build the client side.
RUN npm run build

# Production stage
# It also starts from base stage defined above
FROM base as production
ENV NODE_ENV=production
# npm ci installs from package-lock.json to ensure consistency in dependencies
RUN npm ci --only=production
# Copy all files to container
COPY --from=development /app/dist ./dist
CMD ["node","dist/index.js"] 