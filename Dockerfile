FROM node:20-alpine

WORKDIR /app

# Update system and install build dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache \
    libc6-compat \
    make \
    g++ \
    python3

# Install dependencies
COPY package*.json ./
RUN chmod -R 755 . && npm install

# Copy the rest of the code
COPY . .
RUN chmod -R 755 .

# Expose port 3000
EXPOSE 3000

# Run the development server with turbopack
CMD ["npm", "run", "dev"]