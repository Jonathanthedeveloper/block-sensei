import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeRound } from "@/services/api";
import type { ICompleteRound } from "@/types";

export const useCompleteRound = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["completeRound"],
    mutationFn: ({
      roundId,
      data,
    }: {
      roundId: string;
      data: Omit<ICompleteRound, "mission_round_id">;
    }) => completeRound(roundId, data),
    onSuccess: () => {
      // Invalidate mission progress and leaderboard
      queryClient.invalidateQueries({ queryKey: ["missionProgress"] });
      queryClient.invalidateQueries({ queryKey: ["missionLeaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["userMissions"] });
    },
  });
};
