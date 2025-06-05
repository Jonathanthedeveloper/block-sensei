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
  console.log('Seeding Block Sensei data...');

  // --- Create a default user ---
  // Using a fixed ID for the user for consistent seeding
  const defaultUser = await prisma.user.upsert({
    where: { id: 'user-seeder-id-001' }, // Fixed ID for upsert
    update: {
      wallet_address: '0xDefaultSeederWalletAddress',
    },
    create: {
      id: 'user-seeder-id-001', // Explicitly set ID during creation
      wallet_address: '0xDefaultSeederWalletAddress',
    },
  });

  // --- Create a default clan ---
  const defaultClan = await prisma.clan.upsert({
    where: { name: 'Block Sensei Academy' }, // 'name' is unique in Clan model
    update: {
      creator_id: defaultUser.id,
      logo_url: 'https://cdn.example.com/block-sensei-logo.png',
      description: 'The official academy for all Block Sensei learners!',
      x_url: 'https://x.com/blocksensei',
      website_url: 'https://blocksensei.com',
    },
    create: {
      name: 'Block Sensei Academy',
      creator_id: defaultUser.id,
      logo_url: 'https://cdn.example.com/block-sensei-logo.png',
      description: 'The official academy for all Block Sensei learners!',
      x_url: 'https://x.com/blocksensei',
      website_url: 'https://blocksensei.com',
    },
  });

  // --- Mission 1: Introduction to Web3 ---
  const web3Mission = await prisma.mission.upsert({
    where: { id: 'mission-web3-intro' }, // Using fixed ID for unique identification
    update: {
      title: 'Introduction to Web3',
      brief: 'What’s All the Hype About? Web1 to Web3 - How we got here.',
      description:
        'Dive deep into the evolution of the internet from its humble beginnings to the decentralized future of Web3. Understand the key concepts, technologies, and implications.',
      status: MissionStatus.ACTIVE,
      // No 'order' field in schema, so don't include it here
      clan_id: defaultClan.id,
    },
    create: {
      id: 'mission-web3-intro', // Set fixed ID in create as well
      title: 'Introduction to Web3',
      brief: 'What’s All the Hype About? Web1 to Web3 - How we got here.',
      description:
        'Dive deep into the evolution of the internet from its humble beginnings to the decentralized future of Web3. Understand the key concepts, technologies, and implications.',
      status: MissionStatus.ACTIVE,
      clan_id: defaultClan.id,
    },
  });

  // Rewards for Web3 Mission
  const web3Reward_100 = await prisma.reward.upsert({
    where: { id: 'reward-web3-100' },
    update: {},
    create: {
      id: 'reward-web3-100',
      amount: 100,
      token: 'BLOCK',
    },
  });

  // --- Mission 1 Rounds and Quests ---

  // Round 1.1: What is Web3? (Theory)
  const round1_1Quest = await prisma.quest.upsert({
    where: { reward_id: web3Reward_100.id + '-web3-round1-1-quest' }, // Use a unique string for 'reward_id'
    update: {
      type: QuestType.VISIT_SITE,
      description: 'Read an introductory article on Web3.',
      reward_id: web3Reward_100.id,
    },
    create: {
      type: QuestType.VISIT_SITE,
      description: 'Read an introductory article on Web3.',
      reward_id: web3Reward_100.id,
    },
  });

  await prisma.missionRound.upsert({
    where: { id: 'mission-round-web3-1' }, // Using fixed ID for unique identification
    update: {
      mission_id: web3Mission.id,
      title: 'What is Web3?',
      content:
        'Learn about the core concepts of Web3: decentralization, blockchain, and tokenomics.',
      welcome_message: 'Welcome to your first Web3 lesson!',
      introduction:
        'This round will introduce you to the fundamental ideas behind Web3. No prior knowledge required!',
      quest_id: round1_1Quest.id,
    },
    create: {
      id: 'mission-round-web3-1', // Set fixed ID in create as well
      mission_id: web3Mission.id,
      title: 'What is Web3?',
      content:
        'Learn about the core concepts of Web3: decentralization, blockchain, and tokenomics.',
      welcome_message: 'Welcome to your first Web3 lesson!',
      introduction:
        'This round will introduce you to the fundamental ideas behind Web3. No prior knowledge required!',
      quest_id: round1_1Quest.id,
    },
  });

  // Round 1.2: Blockchain Basics (Quiz)
  const round1_2QuizReward = await prisma.reward.upsert({
    where: { id: 'reward-quiz-blockchain' },
    update: {},
    create: {
      id: 'reward-quiz-blockchain',
      amount: 150,
      token: 'ETH',
    },
  });

  const round1_2Quest = await prisma.quest.upsert({
    where: { reward_id: round1_2QuizReward.id + '-web3-round1-2-quest' }, // Use a unique string for 'reward_id'
    update: {
      type: QuestType.QUIZ,
      description: 'Test your knowledge on basic blockchain concepts.',
      reward_id: round1_2QuizReward.id,
      quiz: {
        create: {
          question: 'What is a blockchain?',
          options: JSON.stringify([
            'A centralized database',
            'A distributed ledger',
            'A type of cryptocurrency',
            'A financial institution',
          ]),
          answer: 'A distributed ledger',
        },
      },
    },
    create: {
      type: QuestType.QUIZ,
      description: 'Test your knowledge on basic blockchain concepts.',
      reward_id: round1_2QuizReward.id,
      quiz: {
        create: {
          question: 'What is a blockchain?',
          options: JSON.stringify([
            'A centralized database',
            'A distributed ledger',
            'A type of cryptocurrency',
            'A financial institution',
          ]),
          answer: 'A distributed ledger',
        },
      },
    },
  });

  await prisma.missionRound.upsert({
    where: { id: 'mission-round-web3-2' }, // Using fixed ID for unique identification
    update: {
      mission_id: web3Mission.id,
      title: 'Blockchain Basics',
      content:
        'Explore the fundamental technology underpinning Web3: blockchain. Understand how blocks are chained and transactions are validated.',
      welcome_message: 'Ready for a quick quiz?',
      introduction:
        'This round will test your understanding of core blockchain principles.',
      quest_id: round1_2Quest.id,
    },
    create: {
      id: 'mission-round-web3-2', // Set fixed ID in create as well
      mission_id: web3Mission.id,
      title: 'Blockchain Basics',
      content:
        'Explore the fundamental technology underpinning Web3: blockchain. Understand how blocks are chained and transactions are validated.',
      welcome_message: 'Ready for a quick quiz?',
      introduction:
        'This round will test your understanding of core blockchain principles.',
      quest_id: round1_2Quest.id,
    },
  });

  // --- Mission 2: Diving into Sui Blockchain ---
  const suiMission = await prisma.mission.upsert({
    where: { id: 'mission-sui-dive' }, // Using fixed ID for unique identification
    update: {
      title: 'Diving into Sui Blockchain',
      brief:
        'Explore the Sui blockchain: its unique architecture and Move language.',
      description:
        'This mission focuses on the Sui blockchain, its object-centric model, and the Move programming language for smart contracts.',
      status: MissionStatus.INACTIVE,
      clan_id: defaultClan.id,
    },
    create: {
      id: 'mission-sui-dive', // Set fixed ID in create as well
      title: 'Diving into Sui Blockchain',
      brief:
        'Explore the Sui blockchain: its unique architecture and Move language.',
      description:
        'This mission focuses on the Sui blockchain, its object-centric model, and the Move programming language for smart contracts.',
      status: MissionStatus.INACTIVE, // This mission starts as INACTIVE
      clan_id: defaultClan.id,
    },
  });

  // Rewards for Sui Mission
  const suiReward_300 = await prisma.reward.upsert({
    where: { id: 'reward-sui-300' },
    update: {},
    create: {
      id: 'reward-sui-300',
      amount: 300,
      token: 'SUI',
    },
  });

  // --- Mission 2 Rounds and Quests ---
  const round2_1Quest = await prisma.quest.upsert({
    where: { reward_id: suiReward_300.id + '-sui-round2-1-quest' }, // Use a unique string for 'reward_id'
    update: {
      type: QuestType.WATCH_VIDEO,
      description: 'Watch an introductory video on Sui.',
      reward_id: suiReward_300.id,
    },
    create: {
      type: QuestType.WATCH_VIDEO,
      description: 'Watch an introductory video on Sui.',
      reward_id: suiReward_300.id,
    },
  });

  await prisma.missionRound.upsert({
    where: { id: 'mission-round-sui-1' }, // Using fixed ID for unique identification
    update: {
      mission_id: suiMission.id,
      title: 'Sui Fundamentals',
      content:
        'Understand the unique object-centric architecture of the Sui blockchain.',
      welcome_message: 'Welcome to the world of Sui!',
      introduction:
        'This round covers the core concepts that make Sui distinct.',
      quest_id: round2_1Quest.id,
    },
    create: {
      id: 'mission-round-sui-1', // Set fixed ID in create as well
      mission_id: suiMission.id,
      title: 'Sui Fundamentals',
      content:
        'Understand the unique object-centric architecture of the Sui blockchain.',
      welcome_message: 'Welcome to the world of Sui!',
      introduction:
        'This round covers the core concepts that make Sui distinct.',
      quest_id: round2_1Quest.id,
    },
  });

  console.log('Seeding complete!');
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
