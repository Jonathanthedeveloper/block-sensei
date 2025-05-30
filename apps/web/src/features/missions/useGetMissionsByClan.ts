import { useQuery } from "@tanstack/react-query";
import { getMissionsByClan } from "@/services/api";
import type { IPaginationParams } from "@/types";

export const useGetMissionsByClan = (
  clanId: string,
  params?: IPaginationParams
) => {
  return useQuery({
    queryKey: ["missions", "clan", clanId, params],
    queryFn: () => getMissionsByClan(clanId, params),
    enabled: !!clanId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
