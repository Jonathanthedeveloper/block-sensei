import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMission } from "@/services/api";

export const useDeleteMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMission(id),
    onSuccess: () => {
      // Invalidate and refetch mission queries
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    },
  });
};
