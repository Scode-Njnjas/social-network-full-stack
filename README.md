# Bento Social Network

A modern social networking platform built with Next.js and Express.js microservices architecture.

## Overview

Bento Social Network is a full-stack social media application that provides real-time interactions, media sharing, and social networking features. The project is split into two main parts:

1. Frontend (`bento-social-next/`) - A Next.js application
2. Backend (`bento-microservices-express/`) - Express.js microservices

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- Framer Motion
- React Query
- Zod for validation

### Backend
- Express.js
- Prisma ORM
- MySQL
- Redis for real-time features
- Docker
- Microservices Architecture

## Key Features

- Modern UI with responsive design
- Server-side rendering
- Theme customization (Light/Dark/Auto)
- Real-time interactions
- Post creation and sharing
- Comments and replies
- Story features
- User following system
- Media upload and handling
- Topic-based content organization
- Bookmarking system
- SEO optimized
- Accessibility compliant

## Getting Started


### Backend Setup

1. Navigate to the backend directory:
```bash
cd bento-microservices-express
```

2. Install dependencies:
```bash
pnpm install
```

3. Start services with Docker:
```bash
docker-compose up -d
```

### Frontend Setup

1. Clone the repository
2. Install dependencies:
```bash
cd bento-social-next
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3001` (frontend) and `http://localhost:3000` (backend).

4. Set up the database:
```bash
export DATABASE_URL="mysql://root:200lab_secret@localhost:3306/social_network?connection_limit=100"
pnpx prisma migrate dev
pnpx prisma generate
```

5. Start the server:
```bash
pnpm dev
```

## Project Structure

### Frontend Structure
- `/src/components` - Reusable UI components
- `/src/layouts` - Page layouts and structure
- `/src/sections` - Feature-specific components
- `/src/apis` - API integration
- `/src/interfaces` - TypeScript interfaces
- `/src/schema` - Zod validation schemas
- `/src/styles` - Global styles and CSS modules

### Backend Structure
- `/src/modules` - Microservice modules
- `/src/shared` - Shared utilities and interfaces
- `/prisma` - Database schema and migrations
- `/src/infras` - Infrastructure layer

## Development

- Use `pnpm` as the package manager
- Follow the established code style using Prettier and ESLint
- Implement components following the atomic design pattern
- Use TypeScript for type safety
- Follow the microservices architecture pattern for backend services

## Docker Support

The project includes Docker configuration for both development and production environments. Use the provided Dockerfile and docker-compose files for containerization.


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Code by [@Scode Njnjas](https://github.com/Scode-Njnjas)