# ======================================================================================================================
# Stage 1: Build dev with an optimized image
FROM node:23-slim

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install

COPY . .

# Set the environment variable to production
CMD [ "npm", "run", "dev" ]

# ======================================================================================================================
# Stage 2: Serve the app with light weight and secure image and server - For future expansion
# FROM nginx:alpine

# COPY --from=builder /app/dist /app/dist
# COPY --from=builder /app/package*.json /app/
# COPY --from=builder /app/node_modules /app/node_modules
