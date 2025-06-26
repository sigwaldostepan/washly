import { queryOptions, useQuery } from '@tanstack/react-query';
import { getBookingHistory } from '../services/get-booking-history';

const getBookingHistoryOptions = (userId: string, page: number) => {
  return queryOptions({
    queryKey: ['booking-history', userId, page],
    queryFn: () => getBookingHistory({ userId, page }),
  });
};

type GetBookingHistoryOptions = Omit<
  ReturnType<typeof getBookingHistoryOptions>,
  'queryKey' | 'queryFn'
>;

interface UseGetBookingHistoryOptions extends GetBookingHistoryOptions {
  userId: string;
  page: number;
}

export const useGetBookingHistory = ({ userId, page, ...options }: UseGetBookingHistoryOptions) => {
  return useQuery({
    ...getBookingHistoryOptions(userId, page),
    ...options,
  });
};
