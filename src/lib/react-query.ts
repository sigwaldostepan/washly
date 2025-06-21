/* eslint-disable */

import {
  DefaultOptions,
  MutationCache,
  QueryCache,
  QueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ZodError } from 'zod';

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: false,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => e.message);
        messages.forEach((message) => {
          toast.error('Validation Error', {
            description: message,
          });
        });
        return;
      }

      if (error instanceof AxiosError) {
        const err = error.response?.data;

        if (error.response && error.response.status >= 500) {
          toast.error('Server error');
          return;
        } else {
          toast.error('Error', {
            description: err.message,
          });
          return;
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        const err = error.response?.data;

        if (error.response && error.response.status >= 500) {
          toast.error('Server error');

          return;
        } else {
          toast.error('Waduh ada error nih', {
            description: err.message,
          });

          return;
        }
      }
    },
  }),
});

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
