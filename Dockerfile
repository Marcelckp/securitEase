# Use official Node.js image
FROM node:23-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN rm -rf node_modules package-lock.json && npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 5173

# Start the app in development mode
CMD [ "npm", "run", "dev" ]
