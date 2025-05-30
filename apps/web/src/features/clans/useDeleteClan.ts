import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClan } from "@/services/api";

export const useDeleteClan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteClan(id),
    onSuccess: () => {
      // Invalidate and refetch clan queries
      queryClient.invalidateQueries({ queryKey: ["clans"] });
      queryClient.invalidateQueries({ queryKey: ["userCreatedClans"] });
    },
  });
};
