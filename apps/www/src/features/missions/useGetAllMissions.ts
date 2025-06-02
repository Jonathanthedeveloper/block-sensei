import { useQuery } from "@tanstack/react-query";
import { getAllMissions } from "@/services/api";
import type { IPaginationParams } from "@/types";

export const useGetAllMissions = (params?: IPaginationParams) => {
  return useQuery({
    queryKey: ["missions", params],
    queryFn: () => getAllMissions(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
