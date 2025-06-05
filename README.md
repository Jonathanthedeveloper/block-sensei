# Block Sensei

A gamified learning platform for blockchain and Web3 education built on the Sui blockchain.

## Overview

Block Sensei is a comprehensive platform that combines educational content with blockchain technology to create an engaging learning experience. Users can join clans, complete missions, earn rewards, and track their progress on the blockchain.

## Project Structure

This is a monorepo using pnpm workspaces containing:

- `apps/api`: NestJS backend API that handles authentication, missions, clans, and Sui blockchain integration
- `apps/www`: React frontend built with Vite, leveraging the Sui DappKit for blockchain interactions
- `packages/types`: Shared TypeScript types used across applications

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- MySQL database
- Sui wallet (for blockchain interactions)

### Installation

```bash
# Install dependencies for all workspaces
pnpm install
```

### Setup Environment Variables

```bash
# Create .env files in both api and www directories
cp apps/api/.env.example apps/api/.env
cp apps/www/.env.example apps/www/.env

# Configure your database and API connections
```

### Development

```bash
# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Start API development server
pnpm --filter=api start:dev

# Start frontend development server
pnpm --filter=www dev
```

### Building for Production

```bash
# Build all applications
pnpm build

# Or build individual applications
pnpm build:api
pnpm build:www
```

### Deployment

```bash
# Deploy the API with Prisma migrations
pnpm deploy:api
```

## Features

- **Authenticated Learning**: User authentication with Sui wallet integration
- **Clan System**: Join or create clans and compete with others
- **Mission System**: Complete various mission types to earn rewards
- **Blockchain Integration**: Track progress and rewards on the Sui blockchain
- **Leaderboards**: Compete with other users and clans

## License

[MIT](LICENSE)
