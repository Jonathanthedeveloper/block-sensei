import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMissionWithRounds } from "@/services/api";
import type { ICreateMissionWithRounds } from "@/types";

export const useCreateMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateMissionWithRounds) =>
      createMissionWithRounds(data),
    onSuccess: () => {
      // Invalidate and refetch mission queries
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    },
  });
};
