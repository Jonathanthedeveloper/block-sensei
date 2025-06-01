import type {
  ICreateClan,
  ILogin,
  IRefreshToken,
  IUpdateClan,
  ICreateMissionWithRounds,
  IUpdateMission,
  ICompleteRound,
  IPaginationParams,
} from "@/types";
import api from "./axios";
import type { Clan, Mission, Prisma, User } from "types";

/*******************
 * AUTH
 */

export async function login(data: ILogin) {
  const response = await api.post("auth/login", data);
  return response.data;
}

export async function refreshAccessToken(data: IRefreshToken) {
  const response = await api.post("auth/refresh", data);
  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get<
    Prisma.UserGetPayload<{
      include: {
        created_clans: true;
        joined_clans: true;
        mission_participations: true;
      };
    }> & { block_balance: number }
  >("auth/me");
  return response.data;
}

/************************
 * CLANS
 */

export async function createClan(data: ICreateClan) {
  const response = await api.post<Clan>("clans", data);
  return response.data;
}

export async function getAllClans(params?: IPaginationParams) {
  const response = await api.get<{
    clans: Prisma.ClanGetPayload<{
      include: {
        creator: {
          select: {
            id: true;
            wallet_address: true;
          };
        };
        _count: {
          select: {
            followers: true;
            missions: true;
          };
        };
      };
    }>;
    total: number;
    page: number;
    limit: number;
  }>("clans", { params });
  return response.data;
}

type FullClan = Prisma.ClanGetPayload<{
  include: {
    creator: {
      select: {
        id: true;
        wallet_address: true;
      };
    };
    followers: {
      include: {
        user: {
          select: {
            id: true;
            wallet_address: true;
          };
        };
      };
    };
    missions: true;
    _count: {
      select: {
        followers: true;
        missions: true;
      };
    };
  };
}>;

export async function getClanById(id?: string) {
  const response = await api.get<FullClan>(`clans/${id}`);
  return response.data;
}

export async function updateClan(id: string, data: IUpdateClan) {
  const response = await api.patch<Clan>(`clans/${id}`, data);
  return response.data;
}

export async function deleteClan(id: string) {
  const response = await api.delete(`clans/${id}`);
  return response.data;
}

export async function followClan(clanId: string) {
  const response = await api.post(`clans/${clanId}/follow`);
  return response.data;
}

export async function unfollowClan(clanId: string) {
  const response = await api.delete(`clans/${clanId}/follow`);
  return response.data;
}

export async function getClanFollowers(
  clanId: string,
  params?: IPaginationParams
) {
  const response = await api.get<{
    data: User[];
    total: number;
    page: number;
    limit: number;
  }>(`clans/${clanId}/followers`, { params });
  return response.data;
}

export async function getUserFollowedClans(params?: IPaginationParams) {
  const response = await api.get<{
    data: Clan[];
    total: number;
    page: number;
    limit: number;
  }>("clans/user/followed", { params });
  return response.data;
}

export async function getUserCreatedClans(params?: IPaginationParams) {
  const response = await api.get<{
    data: Clan[];
    total: number;
    page: number;
    limit: number;
  }>("clans/user/created", { params });
  return response.data;
}

/************************
 * MISSIONS
 */

export async function createMissionWithRounds(data: ICreateMissionWithRounds) {
  const response = await api.post<Mission>("missions", data);
  return response.data;
}

export type AllMissions = Prisma.MissionGetPayload<{
  include: {
    clan: {
      select: {
        id: true;
        name: true;
        logo_url: true;
        creator: {
          select: {
            id: true;
            wallet_address: true;
          };
        };
      };
    };
    mission_rounds: {
      include: {
        quest: {
          include: {
            reward: true;
          };
        };
      };
    };
  };
}>;

export async function getAllMissions(params?: IPaginationParams) {
  const response = await api.get<{
    missions: AllMissions[];
    total: number;
    page: number;
    limit: number;
  }>("missions", { params });
  return response.data;
}

export async function getMissionsByClan(
  clanId: string,
  params?: IPaginationParams
) {
  const response = await api.get<{
    data: Mission[];
    total: number;
    page: number;
    limit: number;
  }>(`missions/clan/${clanId}`, { params });
  return response.data;
}

export async function getMissionById(id?: string) {
  const response = await api.get<
    Prisma.MissionGetPayload<{
      include: {
        clan: {
          select: {
            id: true;
            name: true;
            logo_url: true;
            creator: {
              select: {
                id: true;
                wallet_address: true;
              };
            };
          };
        };
        mission_rounds: {
          include: {
            quest: {
              include: {
                quiz: true;
                reward: true;
              };
            };
          };
        };
      };
    }>
  >(`missions/${id}`);
  return response.data;
}

export async function updateMission(id: string, data: IUpdateMission) {
  const response = await api.patch<Mission>(`missions/${id}`, data);
  return response.data;
}

export async function deleteMission(id: string) {
  const response = await api.delete(`missions/${id}`);
  return response.data;
}

export async function startMission(id: string) {
  const response = await api.post(`missions/${id}/start`);
  return response.data;
}

export async function startRound(roundId: string) {
  const response = await api.post(`missions/rounds/${roundId}/start`);
  return response.data;
}

export async function completeRound(
  roundId: string,
  data: Omit<ICompleteRound, "mission_round_id">
) {
  const response = await api.post(`missions/rounds/${roundId}/complete`, data);
  return response.data;
}

export async function getUserMissionProgress(missionId?: string) {
  const response = await api.get<
    Prisma.MissionParticipationGetPayload<{
      include: {
        mission: {
          include: {
            clan: {
              select: {
                id: true;
                name: true;
                logo_url: true;
              };
            };
            mission_rounds: {
              include: {
                quest: {
                  include: {
                    reward: true;
                    quiz: true;
                  };
                };
              };
            };
          };
        };
        round_progress: {
          include: {
            mission_round: {
              include: {
                quest: {
                  include: {
                    reward: true;
                    quiz: true;
                  };
                };
              };
            };
            quest_answers: true;
          };
          orderBy: {
            created_at: "asc";
          };
        };
      };
    }>
  >(`missions/${missionId}/progress`);
  return response.data;
}

export async function getMissionLeaderboard(
  missionId: string,
  params?: IPaginationParams
) {
  const response = await api.get<{
    data: any[];
    total: number;
    page: number;
    limit: number;
  }>(`missions/${missionId}/leaderboard`, { params });
  return response.data;
}

export async function getUserMissions(params?: IPaginationParams) {
  const response = await api.get<{
    data: Mission[];
    total: number;
    page: number;
    limit: number;
  }>("missions/users/missions", { params });
  return response.data;
}

export async function getCompletedMissions() {
  const response = await api.get<Mission[]>("missions/users/completed");
  return response.data;
}

export async function getUserParticipatedMissions() {
  const response = await api.get<
    Prisma.MissionParticipationGetPayload<{
      include: {
        mission: {
          include: {
            clan: {
              select: {
                id: true;
                name: true;
                logo_url: true;
              };
            };
            mission_rounds: {
              include: {
                quest: {
                  include: {
                    reward: true;
                    quiz: true;
                  };
                };
              };
            };
          };
        };
        round_progress: {
          include: {
            mission_round: {
              include: {
                quest: {
                  include: {
                    reward: true;
                    quiz: true;
                  };
                };
              };
            };
            quest_answers: true;
          };
          orderBy: {
            created_at: "asc";
          };
        };
      };
    }>[]
  >("missions/users/participated");
  return response.data;
}
