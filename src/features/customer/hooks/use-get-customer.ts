import { queryOptions, useQuery } from '@tanstack/react-query';
import { getCustomers } from '../services';

export const getCustomersOptions = ({ page, search }: { page?: number; search?: string }) => {
  return queryOptions({
    queryKey: ['customers', page, search],
    queryFn: () => getCustomers({ page, search }),
  });
};

type GetCustomersParams = Omit<ReturnType<typeof getCustomersOptions>, 'queryKey' | 'queryFn'>;

interface UseGetCustomersOptions extends GetCustomersParams {
  page?: number;
  search?: string;
}

export const useGetCustomers = ({ page, search, ...options }: UseGetCustomersOptions) => {
  return useQuery({ ...getCustomersOptions({ page, search }), ...options });
};
