import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowClan } from "@/services/api";

export const useUnfollowClan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clanId: string) => unfollowClan(clanId),
    onSuccess: (data, clanId) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["clan", clanId] });
      queryClient.invalidateQueries({ queryKey: ["clanFollowers", clanId] });
      queryClient.invalidateQueries({ queryKey: ["userFollowedClans"] });
    },
  });
};
