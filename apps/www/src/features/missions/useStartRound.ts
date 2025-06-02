import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startRound } from "@/services/api";

export const useStartRound = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roundId: string) => startRound(roundId),
    onSuccess: () => {
      // Invalidate mission progress
      queryClient.invalidateQueries({ queryKey: ["missionProgress"] });
    },
  });
};
