# Base stage for multi-stage build
FROM node:20-alpine as base

# Set working directory in container
WORKDIR /app
# Copy package.json and package-lock.json to container
COPY package*.json /app
# Expose the port on the container
EXPOSE 8000

# Extends the base stage to production stage
FROM base as production
ENV NODE_ENV=production
# npm ci installs from package-lock.json to ensure consistency in dependencies
RUN npm ci
# Copy all files to container
COPY . .
# TODO: What about CMD for build? 
CMD ["npm","start"] 

# Extends the base stage to development stage
FROM base as development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]