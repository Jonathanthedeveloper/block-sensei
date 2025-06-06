// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// async function main() {}
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// apps/api/prisma/seed.ts

import { PrismaClient, QuestType, MissionStatus } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const data: { id: string; content: string }[] = [
    {
      id: 'cmbizuokn000dm63x2l4ouolw',
      content:
        "# Sui's Scalable Architecture\n\nSui is a Layer 1 blockchain designed for exceptional scalability and low-latency transaction processing. Unlike traditional blockchains that process transactions sequentially, Sui leverages **parallel transaction execution**, enabling multiple transactions to be processed simultaneously without conflicts.\n\n## Key Features\n- **Parallel Execution**: Transactions involving independent objects are processed in parallel, reducing bottlenecks.\n- **Object-Centric Model**: Assets are represented as distinct objects with unique IDs, allowing efficient state management.\n- **Horizontal Scaling**: Validators can add resources to handle increased demand, ideal for high-throughput applications like gaming and DeFi.\n\nFor example, a gaming platform on Sui can process thousands of player actions per second, ensuring a seamless experience. This contrasts with Ethereum’s account-based model, where state changes impact the entire blockchain. By understanding Sui’s architecture, you’ll see why it’s a top choice for scalable decentralized applications (dApps).\n\n## Why It Matters\nSui’s design supports real-time use cases, making it perfect for mass-market adoption in industries like finance and entertainment.",
    },
    {
      id: 'cmbizuopd000mm63xjdviqtfr',
      content:
        '# Programming with Move\n\nThe Move programming language is a cornerstone of Sui’s ecosystem, designed for **secure and resource-oriented** smart contract development. Unlike Solidity, Move prevents vulnerabilities like reentrancy attacks by treating assets as first-class objects.\n\n## Key Features of Move\n- **Resource-Oriented Design**: Assets cannot be duplicated or destroyed, ensuring safe management of tokens and NFTs.\n- **Modularity**: Developers can create reusable modules, like Sui’s `coin` module for fungible tokens.\n- **Type Safety**: Formal verification reduces bugs, making Move ideal for mission-critical applications.\n\nFor example, a Move smart contract can define a token with transfer restrictions, ensuring only authorized users can interact with it. This is critical for applications like DeFi, where security is paramount. Move’s syntax is intuitive, resembling Rust, and its modularity supports complex dApps. In this round, you’ll explore Move’s syntax, its differences from other languages, and how it enables secure development on Sui.\n\n## Why It Matters\nMove’s security features make Sui a trusted platform for building robust decentralized applications.',
    },
    {
      id: 'cmbizuott000vm63xdc35iwuo',
      content:
        '# Sui’s Object-Centric Model\n\nSui’s object-centric model redefines how blockchains manage data, setting it apart from Ethereum’s account-based system or Bitcoin’s UTXO model. Every asset—tokens, NFTs, or smart contracts—is a distinct **object** with a unique ID, ownership, and state.\n\n## How It Works\n- **Unique Objects**: Each object has a unique ID, enabling direct manipulation without global state changes.\n- **Dynamic Fields**: Developers can attach custom metadata, like attributes for a game item.\n- **Efficient Transactions**: Object-based transactions reduce complexity, improving scalability.\n\nFor example, an NFT on Sui can be created or transferred in a single transaction, unlike Ethereum, where state updates affect the entire blockchain. This makes Sui ideal for gaming, where players own in-game assets as objects, or DeFi, where tokens are managed efficiently. This round covers the lifecycle of Sui objects, their structure, and their role in scalable dApps.\n\n## Why It Matters\nThe object model enables developers to build user-friendly, high-performance applications with precise control over assets.',
    },
    {
      id: 'cmbizuoxu0014m63xuze0mnbi',
      content:
        '# Consensus and Performance in Sui\n\nSui’s consensus mechanism drives its high performance, using a **Byzantine Fault Tolerant (BFT)** approach with Narwhal (mempool management) and Bullshark (consensus ordering). Unlike traditional blockchains, Sui optimizes for speed by distinguishing between simple and complex transactions.\n\n## Key Mechanisms\n- **Fast-Path Execution**: Simple transactions (e.g., token transfers) bypass consensus, achieving sub-second finality.\n- **BFT Consensus**: Complex transactions involving shared objects use Narwhal and Bullshark for agreement.\n- **High Throughput**: Parallel execution and optimized consensus enable thousands of transactions per second.\n\nFor example, a user swapping tokens on a Sui-based DEX like Kriya experiences near-instant confirmation, unlike Ethereum’s slower finality. This makes Sui ideal for real-time applications like gaming or payments. This round explores how Sui’s hybrid consensus model balances speed and security, comparing it to Proof of Work or Proof of Stake.\n\n## Why It Matters\nSui’s consensus enables scalable, low-latency dApps, making it a leader in blockchain performance.',
    },
    {
      id: 'cmbizup1x001dm63x5h8v5gbg',
      content:
        '# DeFi and Applications on Sui\n\nSui’s ecosystem is a thriving hub for **decentralized finance (DeFi)** and innovative applications, leveraging its high throughput and low latency. Platforms like Kriya DEX enable fast token swaps, liquidity provision, and yield farming with minimal fees.\n\n## Key Applications\n- **Kriya DEX**: Supports near-instant token swaps, e.g., trading `LEARNING_TOKEN` in under a second.\n- **NFT Marketplaces**: Sui’s object model powers scalable NFT trading and collectibles.\n- **Gaming and Social Apps**: High-performance architecture supports thousands of simultaneous transactions.\n\nFor example, a gaming platform on Sui can handle real-time player interactions, while DeFi protocols benefit from low-cost, fast transactions compared to Ethereum. This round covers Sui’s DeFi ecosystem, its SDK for developers, and use cases like supply chain tracking or ticketing systems. You’ll learn how Sui’s Move language and object model enable scalable dApps.\n\n## Why It Matters\nSui’s ecosystem fosters innovation, empowering developers to build user-friendly, high-performance applications for mass adoption.',
    },
  ];

  const p = data.map(async (item, index) => {
    await prisma.missionRound.update({
      where: {
        id: item.id,
      },
      data: {
        content: item.content,
      },
    });
  });

  await Promise.all(p);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
