# Block Sensei

A gamified learning platform for blockchain and Web3 education built on the Sui blockchain.

## Overview

Block Sensei is a comprehensive platform that combines educational content with blockchain technology to create an engaging learning experience. Users can join clans, complete missions, earn rewards, and track their progress on the Sui blockchain through verifiable badges and certificates.

## Project Structure

This is a monorepo using pnpm workspaces containing:

- `apps/api`: NestJS backend API that handles authentication, missions, clans, and Sui blockchain integration
- `apps/www`: React frontend built with Vite, leveraging the Sui DappKit for blockchain interactions
- `contracts/block_sensei`: Sui Move smart contracts for blockchain interactions, badges, and certificates
- `packages/types`: Shared TypeScript types used across applications

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- PostgreSQL database
- Sui CLI (for blockchain development)

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
```

Required environment variables for backend (apps/api/.env):
```
DATABASE_URL=postgresql://username:password@localhost:5432/blocksensei
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SUI_PACKAGE_ID=your_package_id
SUI_ADMIN_CAPABILITY_ID=your_admin_capability_id
```

Required environment variables for frontend (apps/www/.env):
```
VITE_ENOKI_API_KEY=
VITE_GOOGLE_CLIENT_ID=
VITE_BASE_API_URL=
VITE_BLOCK_COIN_TYPE=
```

### Smart Contract Deployment

```bash
# Move to the contracts directory
cd contracts/block_sensei

# Build and publish the smart contracts
sui client publish --gas-budget 100000000
```

After publishing, update the SUI_PACKAGE_ID and SUI_ADMIN_CAPABILITY_ID in your .env file.

### Development

```bash
# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Seed the database with initial data (optional)
pnpm --filter=api exec prisma db seed

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
pnpm deploy:api

```
