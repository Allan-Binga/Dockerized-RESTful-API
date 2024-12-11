# Use an official Node runtime as a parent image for building
FROM node:14-alpine AS builder

# Set the working directory in the builder stage
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
# This step benefits from Docker's layer caching, speeding up subsequent builds
COPY package*.json ./

# Install application dependencies
# Use npm ci for a clean install, which is more reliable for CI environments
# Set CI=true to avoid scripts that might fail due to environment differences

# If you need to run scripts, do it separately
RUN npm rebuild && npm run build --if-present

# Copy the rest of the application code to the container
COPY . .

# Production stage
FROM node:14-alpine


# Set the working directory in the final image
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json


# Expose the port the app runs on
EXPOSE 8100


# Define the command to run your app
CMD ["node", "index.js"]  

# Optional: Add a health check if your app supports it
# HEALTHCHECK CMD curl --fail http://localhost:8100/health || exit 1
