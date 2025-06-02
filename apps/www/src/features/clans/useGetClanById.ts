import { useQuery } from "@tanstack/react-query";
import { getClanById } from "@/services/api";

export const useGetClanById = (id?: string) => {
  return useQuery({
    queryKey: ["clan", id],
    queryFn: () => getClanById(id),
    enabled: !!id,
  });
};
