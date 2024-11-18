# Use an official Node runtime as a parent image
FROM node:14-alpine AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install application dependencies
 RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Add a multi-stage build for a lighter final image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy only the built application from the previous stage
COPY --from=build /usr/src/app /app

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run your app
CMD ["npm", "start"]
