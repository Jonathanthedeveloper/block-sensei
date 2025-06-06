import { useQuery } from "@tanstack/react-query";
import { getMissionById } from "@/services/api";

export const useGetMissionById = (id?: string) => {
  return useQuery({
    queryKey: ["mission", id],
    queryFn: () => getMissionById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
