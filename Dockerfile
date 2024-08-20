# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally (optional if you don't have it in devDependencies)
RUN npm install -g typescript

# Build the TypeScript code
RUN npm run dev

# Expose the port the app runs on (optional, depends on your app)
EXPOSE 3000
