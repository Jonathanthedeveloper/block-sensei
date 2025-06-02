import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startMission } from "@/services/api";

export const useStartMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startMission"],
    mutationFn: (id: string) => startMission(id),
    onSuccess: (_, missionId) => {
      // Invalidate mission progress and user missions
      queryClient.invalidateQueries({
        queryKey: ["missionProgress", missionId],
      });
      queryClient.invalidateQueries({ queryKey: ["userMissions"] });
    },
  });
};
