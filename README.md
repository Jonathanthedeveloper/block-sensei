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
VITE_API_URL=http://localhost:3000
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
# Deploy the API with Prisma migrations
pnpm deploy:api
```bash
# Deploy the API with Prisma migrations
## Features

- **Authenticated Learning**: Secure user authentication with Sui wallet integration
- **Clan System**: Join or create clans with custom logos and descriptions to compete with other users
- **Mission System**: Create and complete various mission types with customizable rounds and quests
- **Quiz System**: Create interactive quizzes as part of mission rounds
- **Studio**: A content creation hub for clan owners to design educational content
- **Blockchain Integration**: 
  - Track progress and rewards on the Sui blockchain
  - Earn on-chain badges for achievements
  - Receive verifiable certificates for mission completion
- **Media Integration**:
  - Cloudinary integration for image uploads
  - AI-powered image generation for content
- **Leaderboards**: Compete with other users and clans on global and mission-specific leaderboards
- **Profile Management**: Track personal progress and showcase earned achievements

## Smart Contracts

The project includes Sui Move smart contracts for:
- Badge issuance and verification
- Certificate management for completed missions
- Block management for tracking user progress

## Environment Setup

The application requires several environment variables for proper configuration:
- Database connection settings
- Cloudinary API credentials
- Sui blockchain package ID and admin capability
- JWT settings for authentication

## License

[MIT](LICENSE)
## License

[MIT](LICENSE)
