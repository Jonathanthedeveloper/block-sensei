import { getCompletedMissions } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCompletedMissions() {
  return useQuery({
    queryKey: ["completedMissions"],
    queryFn: getCompletedMissions,
  });
}
