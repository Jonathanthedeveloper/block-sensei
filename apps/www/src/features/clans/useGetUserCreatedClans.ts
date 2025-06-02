import { useQuery } from "@tanstack/react-query";
import { getUserCreatedClans } from "@/services/api";
import type { IPaginationParams } from "@/types";

export const useGetUserCreatedClans = (params?: IPaginationParams) => {
  return useQuery({
    queryKey: ["userCreatedClans", params],
    queryFn: () => getUserCreatedClans(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
