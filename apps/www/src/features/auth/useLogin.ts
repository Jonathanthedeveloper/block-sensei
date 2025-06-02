import { login } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess(data) {
      localStorage.setItem("access_token", data.session.access_token);
      localStorage.setItem("refresh_token", data.session.refresh_token);
    },
  });
}
