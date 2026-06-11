import { CreateDeleteMutationHookArgs } from "./hooks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../configs/index";
import { useAuthStore } from "@/store/auth.store";

export function CreateDeleteMutationHook<TData = unknown>({
  endpoint,
  onSuccess,
  onError,
  onSettled,
  customHeaders = {},
  mutationOptions,
  requiresAuth = true,
  responseSchema,
}: CreateDeleteMutationHookArgs<TData>) {
  return function useDeleteMutation() {
    const token = useAuthStore((state) => state.token);
    const queryClient = useQueryClient();
    const mutationFn = async (): Promise<TData> => {
      const headers = {
        ...customHeaders,
        ...(requiresAuth ? { Authorization: `Bearer ${token}` } : {}), //will be updated when auth context is implemented
      };

      const response = await AxiosInstance.delete(endpoint, { headers });
      return responseSchema
        ? responseSchema.parse(response.data)
        : response.data;
    };

    return useMutation<TData, Error, void>({
      mutationFn,
      onSuccess: (data) => onSuccess?.(data, queryClient),
      onError: (error) => onError?.(error as Error, queryClient),
      onSettled: (data, error) =>
        onSettled?.(data, error as Error | null, queryClient),
      ...mutationOptions,
    });
  };
}
