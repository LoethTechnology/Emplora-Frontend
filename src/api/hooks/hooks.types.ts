import type { UseMutationOptions } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ZodSchema } from "zod";

type QueryKey =
  | [string]
  | [string, Record<string, string | number | undefined>];

export interface CreatePostMutationHookArgs<TData> {
  endpoint: string;
  onError?: (error: Error, queryClient: QueryClient) => void;
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    queryClient: QueryClient,
  ) => void;
  onSuccess?: (data: TData, queryClient: QueryClient) => void;
  customHeaders?: Record<string, string>;
  mutationOptions?: Omit<UseMutationOptions<any, Error, TData>, "mutationFn">;
  requiresAuth?: boolean;
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    refetchOnMount?: boolean;
    retry?:
      | boolean
      | number
      | ((failureCount: number, error: unknown) => boolean);
    gcTime?: number;
    staleTime?: number;
  };
}

export interface CreateGetQueryHookArgs<TData> {
  endpoint: string;
  queryKey: QueryKey;
  requiresAuth?: boolean;
  onError?: (error: Error, queryClient: QueryClient) => void;
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    queryClient: QueryClient,
  ) => void;
  onSuccess?: (data: TData, queryClient: QueryClient) => void;
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    refetchOnMount?: boolean;
    retry?:
      | boolean
      | number
      | ((failureCount: number, error: unknown) => boolean);
    gcTime?: number;
    staleTime?: number;
  };
}

export interface CreateDeleteMutationHookArgs<TData = unknown> {
  endpoint: string;
  onError?: (error: Error, queryClient: QueryClient) => void;
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    queryClient: QueryClient,
  ) => void;
  onSuccess?: (data: TData, queryClient: QueryClient) => void;
  customHeaders?: Record<string, string>;
  mutationOptions?: Omit<UseMutationOptions<TData, Error, void>, "mutationFn">;
  requiresAuth?: boolean;
  responseSchema?: ZodSchema<TData>;
}

export interface CreatePutMutationHookArgs<
  TData = unknown,
  TVariables = unknown,
> {
  endpoint: string;
  onError?: (error: Error, queryClient: QueryClient) => void;
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    queryClient: QueryClient,
  ) => void;
  onSuccess?: (data: TData, queryClient: QueryClient) => void;
  customHeaders?: Record<string, string>;
  mutationOptions?: Omit<
    UseMutationOptions<TData, Error, TVariables>,
    "mutationFn"
  >;
  requiresAuth?: boolean;
}
