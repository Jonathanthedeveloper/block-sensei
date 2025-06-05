import { uploadImage } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export function useUploadImage() {
  return useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: uploadImage,
  });
}
