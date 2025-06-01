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
