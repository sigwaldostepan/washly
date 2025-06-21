import { queryOptions, useQuery } from '@tanstack/react-query';
import { getServices } from '../services';

export const useGetServiceOptions = (search?: string) =>
  queryOptions({
    queryKey: ['services', search],
    queryFn: () => getServices(search),
  });

type UseGetServiceOptions = Omit<ReturnType<typeof useGetServiceOptions>, 'queryFn'>;

export const useGetServices = (search?: string, options?: UseGetServiceOptions) => {
  return useQuery({ ...useGetServiceOptions(search), ...options });
};
