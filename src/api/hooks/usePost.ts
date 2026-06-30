import { useAuthStore } from '@/store/auth.store';
import { ApiError, CreatePostMutationHookArgs } from './hooks.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AxiosInstance from '../configs';
import { AxiosError } from 'axios';

export function CreatePostMutationHook<TData>({
  endpoint,
  onSuccess,
  onError,
  onSettled,
  customHeaders = {},
  mutationOptions,
  requiresAuth = true,
}: CreatePostMutationHookArgs<TData>) {
  return function usePostMutation<
    RouteParams extends Record<string, string | number | undefined> = Record<
      string,
      string | number | undefined
    >,
    QueryParams extends Record<string, string | number | undefined> = Record<
      string,
      string | number | undefined
    >,
  >(params?: {
    query?: QueryParams;
    route?: RouteParams;
    headers?: Record<string, string | undefined>;
  }) {
    const token = useAuthStore(state => state.token);
    const queryClient = useQueryClient();
    const mutationFn = async (data: TData) => {
      let url = endpoint;
      if (params?.route) {
        url = Object.entries(params.route).reduce(
          (acc, [key, value]) => acc.replaceAll(`:${key}`, String(value)),
          endpoint
        );
      }

      if (params?.query) {
        const query = new URLSearchParams();
        Object.entries(params.query).forEach(([key, value]) => {
          if (value === undefined || value === null || value === '') return;
          query.append(key, String(value));
        });
        if (query.toString()) {
          url += `?${query.toString()}`;
        }
      }
      const headers = {
        ...customHeaders,
        ...(requiresAuth ? { Authorization: `Bearer ${token}` } : {}),
      };
      const response = AxiosInstance.post(url, data, {
        headers,
      });
      return (await response).data;
    };

    return useMutation<any, AxiosError<ApiError>, TData>({
      mutationFn,
      onSuccess: data => {
        onSuccess?.(data, queryClient);
      },
      onError: error => onError?.(error as Error, queryClient),
      onSettled: (data, error) => onSettled?.(data, error as Error | null, queryClient),
      ...mutationOptions,
    });
  };
}
