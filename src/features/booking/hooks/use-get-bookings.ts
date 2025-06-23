import { queryOptions, useQuery } from '@tanstack/react-query';
import { getBookings } from '../services';

export const getBookingsQueryOptions = (page?: number) => {
  return queryOptions({
    queryKey: ['bookings', page],
    queryFn: () => getBookings(page),
  });
};

type GetBookingsOptions = Omit<ReturnType<typeof getBookingsQueryOptions>, 'queryKey' | 'queryFn'>;

interface UseGetBookingsOptions extends GetBookingsOptions {
  page?: number;
}

export const useGetBookings = ({ page, ...options }: UseGetBookingsOptions) => {
  return useQuery({
    ...getBookingsQueryOptions(page),
    ...options,
  });
};
