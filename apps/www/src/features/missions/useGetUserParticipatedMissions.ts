import { getUserParticipatedMissions } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUserParticipatedMissions() {
  return useQuery({
    queryKey: ["userParticipatedMissions"],
    queryFn: getUserParticipatedMissions,
    retry: false,
  });
}
