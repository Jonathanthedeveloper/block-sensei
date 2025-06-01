import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
