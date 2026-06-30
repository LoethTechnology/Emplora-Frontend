import { useAuthStore } from '@/store/auth.store';
import { CreateGetQueryHookArgs } from './hooks.types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosInstance from '../configs';
import { useEffect } from 'react';

export function CreateGetQueryHook<
  TData,
  RouteParams extends Record<string, string | number | undefined> = Record<
    string,
    string | number | undefined
  >,
  QueryParams extends Record<string, string | number | undefined> = Record<
    string,
    string | number | undefined
  >,
>({
  endpoint,
  queryKey,
  requiresAuth = true,
  onError,
  onSettled,
  onSuccess,
  options,
}: CreateGetQueryHookArgs<TData>) {
  return function useGetQuery(params?: {
    query?: QueryParams;
    route?: RouteParams;
    headers?: Record<string, string | undefined>;
  }) {
    const token = useAuthStore(state => state.token);
    const queryClient = useQueryClient();
    const queryFn = async (): Promise<TData> => {
      let url = endpoint;
      if (params?.route) {
        url = Object.entries(params.route).reduce(
          (acc, [key, value]) => acc.replaceAll(`:${key}`, String(value)),
          endpoint
        );
      }

      // Handle query parameters
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
      console.log('Hitting:', AxiosInstance.defaults.baseURL + url);

      const headers = {
        ...params?.headers,
        ...(requiresAuth ? { Authorization: `Bearer ${token}` } : {}), //will be updated when auth context is implemented
      };

      const response = await AxiosInstance.get(url, { headers });
      return response.data as TData;
    };

    const query = useQuery({
      queryKey: [...queryKey, params?.query, params?.route],
      queryFn,
      ...options,
    });
    useEffect(() => {
      if (query.isSuccess) {
        onSuccess?.(query.data, queryClient);
      }
    }, [query.isSuccess, query.data, queryClient, onSuccess]);
    useEffect(() => {
      if (query.isError) {
        onError?.(query.error as Error, queryClient);
      }
    }, [query.isError, query.error]);

    useEffect(() => {
      if (query.isSuccess || query.isError) {
        onSettled?.(query.data, query.error as Error | null, queryClient);
      }
    }, [query.isSuccess, query.isError, query.data, query.error]);
    return query;
  };
}
