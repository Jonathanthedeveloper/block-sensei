# Block Sensei API

Backend API for the Block Sensei platform built with NestJS and Prisma.

## Description

This API provides the backend services for the Block Sensei platform, handling user authentication, missions, clans, blockchain integration, and more.

## Features

- **Authentication**: User authentication with JWT and Sui wallet signatures
- **Mission Management**: Create, update, and track user progress on missions
- **Clan System**: Create and manage clans, handle user memberships
- **Blockchain Integration**: Connect with the Sui blockchain for token balances and transactions
- **File Upload**: Cloud storage integration with Cloudinary for mission and user content
- **Database**: Fully typed database access with Prisma ORM

## Installation

```bash
# Install dependencies
pnpm install
```

## Configuration

Create a `.env` file in the root of the API directory with the following variables:

```
# Database
DATABASE_URL="mysql://user:password@localhost:3306/block_sensei"

# JWT Authentication
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRATION="7d"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Sui Blockchain
SUI_NETWORK="devnet" # or "testnet", "mainnet"
```

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database with initial data (optional)
npx prisma db seed
```

## Running the API

```bash
# Development
pnpm start:dev

# Production mode
pnpm start:prod

# Debug mode
pnpm start:debug
```

## API Documentation

Once the server is running, you can access the API documentation at:

```
http://localhost:3000/api
```

## Testing

```bash
# Unit tests
pnpm test

# e2e tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## Main Modules

- **Auth**: User authentication and authorization
- **Users**: User profile management
- **Missions**: Educational missions and quests
- **Clans**: Social groups and team competition
- **Sui**: Blockchain integration services
- **Upload**: File upload and management
- **Cloudinary**: Cloud storage service integration

## API Architecture

The API follows a modular architecture with clear separation of concerns:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **DTOs**: Define data transfer objects for validation
- **Entities**: Map to database models through Prisma
- **Guards**: Protect routes based on authentication and permissions
- **Decorators**: Custom decorators for authentication and request handling

## License

[MIT](LICENSE)
