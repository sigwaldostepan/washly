import { queryOptions, useQuery } from '@tanstack/react-query';
import { getServices } from '../services';

export const getServicesQueryOptions = (search?: string) =>
  queryOptions({
    queryKey: ['services', search],
    queryFn: () => getServices(search),
  });

type UseGetServicesOptions = Omit<ReturnType<typeof getServicesQueryOptions>, 'queryFn'>;

export const useGetServices = (search?: string, options?: UseGetServicesOptions) => {
  return useQuery({ ...getServicesQueryOptions(search), ...options });
};
