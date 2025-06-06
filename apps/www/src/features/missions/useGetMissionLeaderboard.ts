import { useQuery } from "@tanstack/react-query";
import { getMissionLeaderboard } from "@/services/api";
import type { IPaginationParams } from "@/types";

export const useGetMissionLeaderboard = (
  missionId: string,
  params?: IPaginationParams
) => {
  return useQuery({
    queryKey: ["missionLeaderboard", missionId, params],
    queryFn: () => getMissionLeaderboard(missionId, params),
    enabled: !!missionId,
    staleTime: 30 * 1000, // 30 seconds for real-time leaderboard
  });
};
