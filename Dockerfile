# Building stage
# Use an official node.js alpine runtime for building project
FROM node:20.0-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . ./

# Build the app
RUN npm run build

# Production stage
# Use an official Nginx alpine runtime for the final image
FROM nginx:1.21-alpine

# Copy the build output from the build stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
