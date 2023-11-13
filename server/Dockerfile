# Base stage for multi-stage build
FROM node:20-alpine as base
WORKDIR /app
COPY package*.json /app
EXPOSE 8000

# Extends the base stage to development stage
FROM base as development
ENV NODE_ENV=development
RUN npm install
COPY . .
RUN npm run build

# Extends the base stage to production stage
FROM base as production
ENV NODE_ENV=production
# npm ci installs from package-lock.json to ensure consistency in dependencies
RUN npm ci --only=production
# Copy all files to container
COPY --from=development /app/dist ./dist
CMD ["node","dist/index.js"] 

