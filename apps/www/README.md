# Block Sensei Frontend

React-based frontend for the Block Sensei platform built with Vite, React, and Sui DappKit.

## Overview

This is the user interface for Block Sensei, a gamified learning platform for blockchain education. The frontend provides a modern, responsive interface for users to interact with the platform's features.

## Features

- **Web3 Integration**: Seamless connection with Sui wallets via Sui DappKit
- **Mission Interface**: Interactive mission completion and tracking
- **Clan Management**: Create, join, and manage clans
- **Dashboard**: User progress and achievements
- **Leaderboards**: Compete with other users and clans
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **React 18**: Modern component-based UI library
- **Vite**: Fast build tool and development server
- **TypeScript**: Strongly typed JavaScript for better developer experience
- **Sui DappKit**: SDK for interacting with Sui blockchain
- **Radix UI**: Accessible UI components
- **Framer Motion**: Animation library
- **React Router**: Client-side routing
- **React Hook Form**: Form state management and validation
- **Context API**: State management

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- Sui Wallet browser extension (for local testing)

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory with:

```
VITE_API_URL=http://localhost:3000
VITE_NETWORK=devnet
```

### Development

```bash
# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Create production build
pnpm build

# Preview production build locally
pnpm preview
```

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── layout/      # Layout components
│   ├── mission/     # Mission-specific components
│   └── ui/          # Basic UI components
├── context/         # React context providers
├── data/            # Static data and mock data
├── features/        # Feature-specific hooks and components
│   ├── auth/        # Authentication related
│   ├── clans/       # Clan management
│   ├── missions/    # Mission-related features
│   └── upload/      # File upload features
├── lib/             # Utility functions
├── pages/           # Page components
├── providers/       # Provider components
├── services/        # API services
└── types/           # TypeScript type definitions
```

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm lint`: Lint code

## Design System

The application uses a consistent design system with:

- Theme switching (light/dark mode)
- Responsive layout
- Accessible components
- Consistent animations

## License

[MIT](LICENSE)