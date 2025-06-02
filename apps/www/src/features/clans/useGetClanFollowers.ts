import { useQuery } from "@tanstack/react-query";
import { getClanFollowers } from "@/services/api";
import type { IPaginationParams } from "@/types";

export const useGetClanFollowers = (
  clanId: string,
  params?: IPaginationParams
) => {
  return useQuery({
    queryKey: ["clanFollowers", clanId, params],
    queryFn: () => getClanFollowers(clanId, params),
    enabled: !!clanId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
