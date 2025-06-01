import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClan } from "@/services/api";
import type { IUpdateClan } from "@/types";

export const useUpdateClan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateClan }) =>
      updateClan(id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch clan queries
      queryClient.invalidateQueries({ queryKey: ["clans"] });
      queryClient.invalidateQueries({ queryKey: ["clan", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["userCreatedClans"] });
    },
  });
};
