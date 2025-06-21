import { queryOptions, useQuery } from '@tanstack/react-query';
import { getServices } from '../services';

export const getServiceQueryOptions = (search?: string) =>
  queryOptions({
    queryKey: ['services', search],
    queryFn: () => getServices(search),
  });

type UseGetServiceOptions = Omit<ReturnType<typeof getServiceQueryOptions>, 'queryFn'>;

export const useGetServices = (search?: string, options?: UseGetServiceOptions) => {
  return useQuery({ ...getServiceQueryOptions(search), ...options });
};
