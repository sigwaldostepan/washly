import { queryOptions, useQuery } from '@tanstack/react-query';
import { getServiceById } from '../services/get-service';

const getServiceQueryOptions = (serviceId: number) => {
  return queryOptions({
    queryKey: ['service', serviceId],
    queryFn: () => getServiceById(serviceId),
  });
};

interface UseGetServiceOptions
  extends Omit<ReturnType<typeof getServiceQueryOptions>, 'queryFn' | 'queryKey'> {
  serviceId: number;
}

export const useGetService = ({ serviceId, ...options }: UseGetServiceOptions) => {
  return useQuery({
    ...getServiceQueryOptions(serviceId),
    ...options,
  });
};
