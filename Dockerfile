# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

RUN npm install -g serve

# Declares a volume
VOLUME /app/src/projects/

# Expose port 3000 for the container
EXPOSE 3000

# Serve the static files
CMD [ "serve", "-s", ".", "-l", "3000" ]
