FROM node:20-alpine

WORKDIR /app

# Update system and install build dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache \
    libc6-compat \
    make \
    g++ \
    python3

# Install dependencies (with Windows-friendly file permissions)
COPY --chmod=0755 package*.json ./
RUN npm install

# Copy the rest of the code (with Windows-friendly file permissions)
COPY --chmod=0755 . .

# Expose port 3000
EXPOSE 3000

# Run the development server with turbopack
CMD ["npm", "run", "dev"]