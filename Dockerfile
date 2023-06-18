# Building stage
# Use an official node.js alpine runtime for building project
FROM node:16.8 

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . ./

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
