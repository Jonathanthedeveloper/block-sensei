import { useQuery } from "@tanstack/react-query";
import { getUserFollowedClans } from "@/services/api";
import type { IPaginationParams } from "@/types";

export const useGetUserFollowedClans = (params?: IPaginationParams) => {
  return useQuery({
    queryKey: ["userFollowedClans", params],
    queryFn: () => getUserFollowedClans(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
