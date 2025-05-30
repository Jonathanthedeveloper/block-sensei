import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followClan } from "@/services/api";

export const useFollowClan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clanId: string) => followClan(clanId),
    onSuccess: (data, clanId) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["clan", clanId] });
      queryClient.invalidateQueries({ queryKey: ["clanFollowers", clanId] });
      queryClient.invalidateQueries({ queryKey: ["userFollowedClans"] });
    },
  });
};
