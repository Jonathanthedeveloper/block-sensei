import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMission } from "@/services/api";
import type { IUpdateMission } from "@/types";

export const useUpdateMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateMission"],
    mutationFn: ({ id, data }: { id: string; data: IUpdateMission }) =>
      updateMission(id, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch mission queries
      queryClient.invalidateQueries({ queryKey: ["missions"] });
      queryClient.invalidateQueries({ queryKey: ["mission", variables.id] });
    },
  });
};
