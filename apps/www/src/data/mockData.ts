import { 
  User, 
  Clan, 
  Mission, 
  MissionRound, 
  Quest, 
  QuestType, 
  MissionStatus, 
  Achievement,
  LeaderboardEntry 
} from '../types';

// Mock User
export const mockUser: User = {
  id: '1',
  wallet_address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  created_at: new Date('2023-01-15'),
  updated_at: new Date('2023-05-20'),
  points: 1500,
  rank: 42,
  missions_completed: 5,
  quests_completed: 23,
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first mission',
      image_url: 'https://via.placeholder.com/150',
      created_at: new Date('2023-01-20'),
      completed: true
    },
    {
      id: '2',
      title: 'Social Butterfly',
      description: 'Complete 5 social quests',
      image_url: 'https://via.placeholder.com/150',
      created_at: new Date('2023-02-10'),
      completed: true
    },
    {
      id: '3',
      title: 'Master Scholar',
      description: 'Complete 10 quiz quests with perfect scores',
      image_url: 'https://via.placeholder.com/150',
      created_at: new Date('2023-03-15'),
      completed: false
    }
  ]
};

// Mock Clans
export const mockClans: Clan[] = [
  {
    id: '1',
    name: 'Ethereum Explorers',
    creator_id: '1',
    logo_url: 'https://via.placeholder.com/150',
    description: 'Dive deep into Ethereum ecosystem and smart contracts',
    x_url: 'https://twitter.com/ethereum',
    website_url: 'https://ethereum.org',
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-05-15'),
    member_count: 245,
    missions_count: 8
  },
  {
    id: '2',
    name: 'Solana Samurai',
    creator_id: '2',
    logo_url: 'https://via.placeholder.com/150',
    description: 'Fast and efficient blockchain explorers',
    x_url: 'https://twitter.com/solana',
    website_url: 'https://solana.com',
    created_at: new Date('2023-02-15'),
    updated_at: new Date('2023-04-20'),
    member_count: 187,
    missions_count: 6
  },
  {
    id: '3',
    name: 'Sui Sages',
    creator_id: '3',
    logo_url: 'https://via.placeholder.com/150',
    description: 'Master Sui blockchain and its ecosystem',
    x_url: 'https://twitter.com/SuiNetwork',
    website_url: 'https://sui.io',
    created_at: new Date('2023-03-10'),
    updated_at: new Date('2023-06-05'),
    member_count: 132,
    missions_count: 4
  }
];

// Mock Missions
export const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Introduction to Blockchain',
    brief: 'Learn the basics of blockchain technology and how it works',
    description: 'This mission will teach you the foundational concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptographic hashing.',
    status: MissionStatus.ACTIVE,
    clan_id: '1',
    clan: mockClans[0],
    rounds: [],
    created_at: new Date('2023-01-05'),
    updated_at: new Date('2023-01-05'),
    completion_percentage: 75
  },
  {
    id: '2',
    title: 'Smart Contract Development',
    brief: 'Learn how to create and deploy smart contracts',
    description: 'Master the art of smart contract development using Solidity, and learn best practices for secure and efficient contract creation.',
    status: MissionStatus.ACTIVE,
    clan_id: '1',
    clan: mockClans[0],
    rounds: [],
    created_at: new Date('2023-02-10'),
    updated_at: new Date('2023-02-10'),
    completion_percentage: 30
  },
  {
    id: '3',
    title: 'DeFi Fundamentals',
    brief: 'Explore the world of decentralized finance',
    description: 'Understand the principles behind DeFi protocols, liquidity pools, yield farming, and other essential DeFi concepts.',
    status: MissionStatus.ACTIVE,
    clan_id: '2',
    clan: mockClans[1],
    rounds: [],
    created_at: new Date('2023-03-15'),
    updated_at: new Date('2023-03-15'),
    completion_percentage: 0
  }
];

// Mock Quests
export const mockQuests: Quest[] = [
  {
    id: '1',
    type: QuestType.QUIZ,
    description: 'Test your knowledge of blockchain basics',
    reward_id: '1',
    reward: {
      id: '1',
      amount: 100,
      token: 'BLOCK',
      created_at: new Date('2023-01-05'),
      updated_at: new Date('2023-01-05')
    },
    created_at: new Date('2023-01-05'),
    updated_at: new Date('2023-01-05'),
    quiz_questions: [
      {
        id: '1',
        question: 'What is a blockchain?',
        options: JSON.stringify(['A centralized database', 'A distributed ledger', 'A programming language', 'A type of cryptocurrency']),
        answer: '1',
        quest_id: '1',
        created_at: new Date('2023-01-05'),
        updated_at: new Date('2023-01-05')
      }
    ]
  },
  {
    id: '2',
    type: QuestType.VISIT_SITE,
    description: 'Visit Ethereum official website',
    reward_id: '2',
    reward: {
      id: '2',
      amount: 50,
      token: 'BLOCK',
      created_at: new Date('2023-01-05'),
      updated_at: new Date('2023-01-05')
    },
    created_at: new Date('2023-01-05'),
    updated_at: new Date('2023-01-05')
  }
];

// Mock MissionRounds
export const mockMissionRounds: MissionRound[] = [
  {
    id: '1',
    mission_id: '1',
    mission: mockMissions[0],
    quest_id: '1',
    quest: mockQuests[0],
    title: 'What is Blockchain?',
    content: 'Blockchain is a distributed, decentralized, public ledger that records transactions across many computers...',
    welcome_message: 'Welcome to your first step into blockchain technology!',
    introduction: 'In this round, you\'ll learn the fundamental concepts behind blockchain technology.',
    created_at: new Date('2023-01-05'),
    updated_at: new Date('2023-01-05')
  },
  {
    id: '2',
    mission_id: '1',
    mission: mockMissions[0],
    quest_id: '2',
    quest: mockQuests[1],
    title: 'Blockchain Applications',
    content: 'Blockchain technology has numerous applications beyond cryptocurrencies...',
    welcome_message: 'Ready to explore blockchain applications in the real world?',
    introduction: 'Discover how blockchain is transforming various industries beyond finance.',
    created_at: new Date('2023-01-05'),
    updated_at: new Date('2023-01-05')
  }
];

// Add rounds to missions
mockMissions[0].rounds = [mockMissionRounds[0], mockMissionRounds[1]];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first mission',
    image_url: 'https://via.placeholder.com/150',
    created_at: new Date('2023-01-20'),
    completed: true
  },
  {
    id: '2',
    title: 'Social Butterfly',
    description: 'Complete 5 social quests',
    image_url: 'https://via.placeholder.com/150',
    created_at: new Date('2023-02-10'),
    completed: true
  },
  {
    id: '3',
    title: 'Master Scholar',
    description: 'Complete 10 quiz quests with perfect scores',
    image_url: 'https://via.placeholder.com/150',
    created_at: new Date('2023-03-15'),
    completed: false
  },
  {
    id: '4',
    title: 'Clan Founder',
    description: 'Create your own clan',
    image_url: 'https://via.placeholder.com/150',
    created_at: new Date('2023-01-25'),
    completed: false
  },
  {
    id: '5',
    title: 'Web3 Pioneer',
    description: 'Complete all blockchain basics missions',
    image_url: 'https://via.placeholder.com/150',
    created_at: new Date('2023-02-18'),
    completed: false
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: '2',
    username: 'CryptoWhale',
    wallet_address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    points: 4850,
    rank: 1,
    clan: {
      id: '1',
      name: 'Ethereum Explorers',
      logo_url: 'https://via.placeholder.com/150'
    }
  },
  {
    userId: '3',
    username: 'BlockNinja',
    wallet_address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    points: 4200,
    rank: 2,
    clan: {
      id: '3',
      name: 'Sui Sages',
      logo_url: 'https://via.placeholder.com/150'
    }
  },
  {
    userId: '4',
    username: 'TokenMaster',
    wallet_address: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    points: 3750,
    rank: 3,
    clan: {
      id: '2',
      name: 'Solana Samurai',
      logo_url: 'https://via.placeholder.com/150'
    }
  },
  {
    userId: '5',
    username: 'ChainChampion',
    wallet_address: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
    points: 3200,
    rank: 4
  },
  {
    userId: '6',
    username: 'SatoshiStudent',
    wallet_address: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
    points: 2800,
    rank: 5,
    clan: {
      id: '1',
      name: 'Ethereum Explorers',
      logo_url: 'https://via.placeholder.com/150'
    }
  },
  {
    userId: '1',
    username: 'You',
    wallet_address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    points: 1500,
    rank: 42,
    clan: {
      id: '1',
      name: 'Ethereum Explorers',
      logo_url: 'https://via.placeholder.com/150'
    }
  }
];