# Use Node.js LTS (Long Term Support) as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for development and pnpm
RUN apk add --no-cache \
    git \
    curl \
    openssh-client \
    # Add any other system dependencies you might need
    && corepack enable \
    && corepack prepare pnpm@latest --activate

# First copy only the files needed for pnpm install
COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

# Install dependencies but skip Prisma generation
RUN pnpm install --frozen-lockfile --ignore-scripts

# Now copy the rest of the application
COPY . .

# Generate Prisma client after all files are copied
RUN npx prisma generate

# Expose port (adjust according to your app's port)
EXPOSE 3000

# Set Node.js environment to development
ENV NODE_ENV=development

# Command to run the development server
CMD ["pnpm", "run", "dev"] 