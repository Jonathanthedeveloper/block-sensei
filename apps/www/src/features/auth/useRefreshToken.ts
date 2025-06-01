import { useMutation } from "@tanstack/react-query";
import { refreshAccessToken } from "@/services/api";
import type { IRefreshToken } from "@/types";

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (data: IRefreshToken) => refreshAccessToken(data),
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
    },
  });
};
