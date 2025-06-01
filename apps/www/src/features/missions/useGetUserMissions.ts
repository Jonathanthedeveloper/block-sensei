import { useQuery } from "@tanstack/react-query";
import { getUserMissions } from "@/services/api";
import type { IPaginationParams } from "@/types";

export const useGetUserMissions = (params?: IPaginationParams) => {
  return useQuery({
    queryKey: ["userMissions", params],
    queryFn: () => getUserMissions(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
