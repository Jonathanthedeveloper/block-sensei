import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followClan, Profile } from "@/services/api";

export const useFollowClan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["followClan"],
    mutationFn: (clanId: string) => followClan(clanId),
    onMutate(clanId) {
      queryClient.setQueriesData(
        {
          queryKey: ["profile"],
        },
        (oldData: Profile) => {
          const newClanFollow = {
            id: Date.now(),
            clan_id: clanId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user_id: oldData.id,
          };
          return oldData?.joined_clans
            ? {
                ...oldData,
                joined_clans: [...oldData.joined_clans, newClanFollow],
              }
            : { ...oldData, joined_clans: [newClanFollow] };
        }
      );
    },
    onSuccess: (_, clanId) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["clan", clanId] });
      queryClient.invalidateQueries({ queryKey: ["clanFollowers", clanId] });
      queryClient.invalidateQueries({ queryKey: ["userFollowedClans"] });
    },
    onError: (error, clanId) => {
      queryClient.setQueriesData(
        {
          queryKey: ["profile"],
        },
        (oldData: Profile) => {
          if (!oldData?.joined_clans) return oldData;
          return {
            ...oldData,
            joined_clans: oldData.joined_clans.filter(
              (clan) => clan.clan_id !== clanId
            ),
          };
        }
      );
    },
  });
};
