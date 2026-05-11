import { useMutation } from "@tanstack/react-query";
import { previewQuery, executeQuery } from "@/services/api";

export const usePreviewQuery = () => {
  return useMutation({
    mutationFn: previewQuery,
  });
};

export const useExecuteQuery = () => {
  return useMutation({
    mutationFn: executeQuery,
  });
};
