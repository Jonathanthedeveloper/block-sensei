import { useQuery } from "@tanstack/react-query";
import { getMissionById } from "@/services/api";

export const useGetMissionById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["mission", id],
    queryFn: () => getMissionById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
