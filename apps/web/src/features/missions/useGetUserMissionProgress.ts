import { useQuery } from "@tanstack/react-query";
import { getUserMissionProgress } from "@/services/api";

export const useGetUserMissionProgress = (missionId: string) => {
  return useQuery({
    queryKey: ["missionProgress", missionId],
    queryFn: () => getUserMissionProgress(missionId),
    enabled: !!missionId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
