# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Copy the production build
COPY /build ./

# Install dependencies
RUN npm install

# Install serve globally to serve the service
RUN npm install -g serve

# Expose port 3000 for the container
EXPOSE 5000

# Serve the static files
CMD [ "serve", "-s", "build", "-l", "5000" ]
