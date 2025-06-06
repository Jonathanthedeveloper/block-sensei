import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClan } from "@/services/api";
import type { ICreateClan } from "@/types";

export const useCreateClan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createClan"],
    mutationFn: (data: ICreateClan) => createClan(data),
    onSuccess: () => {
      // Invalidate and refetch clan queries
      queryClient.invalidateQueries({ queryKey: ["clans"] });
      queryClient.invalidateQueries({ queryKey: ["userCreatedClans"] });
    },
  });
};
