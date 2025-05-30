import { useQuery } from "@tanstack/react-query";
import { getClanById } from "@/services/api";

export const useGetClanById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["clan", id],
    queryFn: () => getClanById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
