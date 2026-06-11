import { useAuthStore } from "@/store/auth.store";
import { CreatePutMutationHookArgs } from "./hooks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "../configs";

export function CreatePutMutationHook<TData = unknown, TVariables = unknown>({
  endpoint,
  onSuccess,
  onError,
  onSettled,
  customHeaders = {},
  mutationOptions,
  requiresAuth = true,
}: CreatePutMutationHookArgs<TData, TVariables>) {
  return function usePutMutation() {
    const token = useAuthStore((state) => state.token);
    const queryClient = useQueryClient();
    const mutationFn = async (data: TVariables): Promise<TData> => {
      const headers = {
        ...customHeaders,
        ...(requiresAuth ? { Authorization: `Bearer ${token}` } : {}), //will be updated when auth context is implemented
      };

      const response = await AxiosInstance.put(endpoint, data, { headers });
      return response.data as TData;
    };

    return useMutation<TData, Error, TVariables>({
      mutationFn,
      onSuccess: (data) => onSuccess?.(data, queryClient),
      onError: (error) => onError?.(error as Error, queryClient),
      onSettled: (data, error) =>
        onSettled?.(data, error as Error | null, queryClient),
      ...mutationOptions,
    });
  };
}
