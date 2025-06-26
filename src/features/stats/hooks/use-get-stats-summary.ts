import { queryOptions, useQuery } from '@tanstack/react-query';
import { getStatsSummary } from '../services';

export const getStatsSummaryOptions = () => {
  return queryOptions({
    queryKey: ['stats-summary'],
    queryFn: () => getStatsSummary(),
  });
};

type UseGetStatsSummaryOptions = ReturnType<typeof getStatsSummaryOptions>;

export const useGetStatsSummary = (options?: UseGetStatsSummaryOptions) => {
  return useQuery({
    ...getStatsSummaryOptions(),
    ...options,
  });
};
