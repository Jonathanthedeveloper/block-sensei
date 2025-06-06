import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeRound } from "@/services/api";
import type { ICompleteRound } from "@/types";

export const useCompleteRound = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["completeRound"],
    mutationFn: ({
      roundId,
      data,
    }: {
      roundId: string;
      data: ICompleteRound;
    }) => completeRound(roundId, data),
    onSuccess: () => {
      // Invalidate mission progress and leaderboard
      queryClient.invalidateQueries({ queryKey: ["missionProgress"] });
      queryClient.invalidateQueries({ queryKey: ["missionLeaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["userMissions"] });
      options?.onSuccess?.();
    },
  });
};
