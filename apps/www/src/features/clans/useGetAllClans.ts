import { useQuery } from "@tanstack/react-query";
import { getAllClans } from "@/services/api";
import type { IPaginationParams } from "@/types";

export const useGetAllClans = (params?: IPaginationParams) => {
  return useQuery({
    queryKey: ["clans", params],
    queryFn: () => getAllClans(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
