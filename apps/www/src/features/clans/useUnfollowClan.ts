import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile, unfollowClan } from "@/services/api";

export const useUnfollowClan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["unfollowClan"],
    mutationFn: (clanId: string) => unfollowClan(clanId),
    onMutate(clanId) {
      queryClient.setQueriesData(
        {
          queryKey: ["profile"],
        },
        (oldData: Profile) => {
          return oldData?.joined_clans
            ? {
                ...oldData,
                joined_clans: oldData.joined_clans.filter(
                  (clan) => clan.clan_id !== clanId
                ),
              }
            : { ...oldData, joined_clans: [] };
        }
      );
    },
    onSuccess: (_, clanId) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["clan", clanId] });
      queryClient.invalidateQueries({ queryKey: ["clanFollowers", clanId] });
      queryClient.invalidateQueries({ queryKey: ["userFollowedClans"] });
    },
    onError: (_, clanId) => {
      queryClient.setQueriesData(
        {
          queryKey: ["profile"],
        },
        (oldData: Profile) => {
          const clan = {
            id: Date.now(),
            clan_id: clanId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user_id: oldData.id,
          };
          return oldData?.joined_clans
            ? {
                ...oldData,
                joined_clans: [...oldData.joined_clans, clan],
              }
            : {
                ...oldData,
                joined_clans: [clan],
              };
        }
      );
    },
  });
};
