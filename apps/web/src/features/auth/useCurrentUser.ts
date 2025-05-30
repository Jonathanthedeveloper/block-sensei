import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
