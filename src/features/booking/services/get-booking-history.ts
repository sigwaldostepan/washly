import { PaginatedResponse } from '@/interfaces';
import { apiClient } from '@/lib/api-client';
import { BookingHistoryResponse } from '../interfaces';

interface GetBookingHistoryParams {
  userId: string;
  page: number;
}

export const getBookingHistory = async ({
  userId,
  page,
}: GetBookingHistoryParams): Promise<PaginatedResponse<BookingHistoryResponse>> => {
  const response = await apiClient.get('/bookings', {
    params: {
      userId,
      page,
    },
  });

  return response.data;
};
