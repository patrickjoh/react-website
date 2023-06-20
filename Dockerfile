# Use an official node.js alpine runtime for building project
# Stage 1 - the build process
FROM node:20.0 AS builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the current directory contents into the container at /app
COPY . ./

# Build the app
RUN npm run build

# Stage 2 - the production environment
FROM node:20.0-alpine

# Set the working directory to /app
WORKDIR /app/

# Install serve
RUN npm install -g serve

# Copy the build output from the build environment
COPY --from=builder /app/build /app/build

# Expose port 3000 to the outside world
EXPOSE 80

# Serve the static files from the build folder
CMD ["serve", "-s", "build", "-l", "80"]