import { Prisma } from "types";

export enum QuestType {
  QUIZ = "QUIZ",
  VISIT_SITE = "VISIT_SITE",
  WATCH_VIDEO = "WATCH_VIDEO",
  SOCIAL_ACTION = "SOCIAL_ACTION",
  BLOCKCHAIN_ACTION = "BLOCKCHAIN_ACTION",
  USER_CONTENT = "USER_CONTENT",
  REFERRALS = "REFERRALS",
  TRACKER = "TRACKER",
}

export enum MissionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface User {
  id: string;
  wallet_address: string;
  created_at: Date;
  updated_at: Date;
  points: number;
  rank: number;
  achievements: Achievement[];
  missions_completed: number;
  quests_completed: number;
}

export interface Clan {
  id: string;
  name: string;
  creator_id: string;
  logo_url: string;
  description: string;
  x_url?: string;
  website_url?: string;
  created_at: Date;
  updated_at: Date;
  member_count: number;
  missions_count: number;
}

export interface Mission {
  id: string;
  title: string;
  brief: string;
  description?: string;
  status: MissionStatus;
  clan_id: string;
  clan?: Clan;
  rounds: MissionRound[];
  created_at: Date;
  updated_at: Date;
  completion_percentage?: number;
}

export interface MissionRound {
  id: string;
  mission_id: string;
  quest_id?: string;
  quest?: Quest;
  title: string;
  content: string;
  welcome_message: string;
  introduction: string;
  created_at: Date;
  updated_at: Date;
}

export interface Reward {
  id: string;
  amount: number;
  token: string;
  created_at: Date;
  updated_at: Date;
}

export interface Quest {
  id: string;
  type: QuestType;
  description: string;
  reward_id: string;
  reward: Reward;
  created_at: Date;
  updated_at: Date;
  quiz_questions?: QuestQuiz[];
}

export interface QuestQuiz {
  id: string;
  question: string;
  options: string;
  answer: string;
  quest_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: Date;
  completed?: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  wallet_address: string;
  points: number;
  rank: number;
  clan?: {
    id: string;
    name: string;
    logo_url: string;
  };
}

export interface MissionParticipation {
  id: string;
  user_id: string;
  mission_id: string;
  started_at: Date;
  completed_at?: Date;
  current_round?: number;
  completed_rounds: number;
  total_rounds: number;
}

export interface RoundProgress {
  id: string;
  mission_round_id: string;
  user_id: string;
  completed: boolean;
  started_at: Date;
  completed_at?: Date;
}

export interface UserClan {
  user_id: string;
  clan_id: string;
  joined_at: Date;
}

export interface QuestAnswer {
  id: string;
  quest_quiz_id: string;
  user_id: string;
  user_answer: string;
  is_correct: boolean;
  created_at: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

// Auth types
export interface ILogin {
  address: string;
}

export interface IRefreshToken {
  refresh_token: string;
}

// Clan types
export interface ICreateClan {
  name: string;
  logo_url: string;
  description?: string;
  x_url?: string;
  website_url?: string;
}

export interface IUpdateClan {
  name?: string;
  logo_url?: string;
  description?: string;
  x_url?: string;
  website_url?: string;
}

// Mission types
export interface ICreateMissionWithRounds {
  title: string;
  brief?: string;
  clan_id: string;
  mission_rounds: ICreateMissionRound[];
}

export interface ICreateMissionRound {
  title: string;
  welcome_message?: string;
  introduction: number;
  content?: string;
  quest: ICreateQuest;
}

export interface ICreateQuest {
  description: string;
  type: string;
  reward: ICreateReward;
  quiz?: ICreateQuiz[];
}

export interface ICreateQuiz {
  question: string;
  options: string[];
  answer: string;
}

export interface ICreateReward {
  name: string;
  description?: string;
  reward_type: string;
  reward_value: number;
  max_winners?: number;
}

export interface IUpdateMission {
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
}

export interface IStartMission {
  mission_id: string;
}

export interface IStartRound {
  mission_round_id: string;
}

export interface ICompleteRound {
  mission_round_id: string;
  answers?: any[]; // You might want to define a proper answer type
  completion_data?: any;
}

// Common types for pagination
export interface IPaginationParams {
  page?: number;
  limit?: number;
}

export type UserParticipatedMissions = Prisma.MissionGetPayload<{
  include: {
       mission_rounds: {
      include: {
        quest: {
          include: {
            reward: true;
          };
        };
      };
    };
    round_progress: {
      include: {
        mission_round: true;
      };
    };
  };
}>;
