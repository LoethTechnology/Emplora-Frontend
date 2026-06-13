import { useAuthStore } from "@/store/auth.store";
import { CreatePostMutationHookArgs } from "./hooks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../configs";

export function CreatePostMutationHook<TData>({
  endpoint,
  onSuccess,
  onError,
  onSettled,
  customHeaders = {},
  mutationOptions,
  requiresAuth = true,
}: CreatePostMutationHookArgs<TData>) {
  return function usePostMutation() {
    const token = useAuthStore((state) => state.token);
    const queryClient = useQueryClient();
    const mutationFn = async (data: TData) => {
      try {
        const headers = {
          ...customHeaders,
          ...(requiresAuth ? { Authorization: `Bearer ${token}` } : {}),
        };
        const response = AxiosInstance.post(endpoint, data, {
          headers,
        });
        return (await response).data;
      } catch (error) {
        console.error("Error in usePostMutation:", error);
      }
    };

    return useMutation<any, Error, TData>({
      mutationFn,
      onSuccess: (data) => {
        onSuccess?.(data, queryClient);
      },
      onError: (error) => onError?.(error as Error, queryClient),
      onSettled: (data, error) =>
        onSettled?.(data, error as Error | null, queryClient),
      ...mutationOptions,
    });
  };
}
