import { adminApiClient } from '@/lib/api-client';
import { AdminBookingResponse } from '../interfaces';
import { PaginatedResponse } from '@/interfaces';

export const getBookings = async (
  page?: number,
): Promise<PaginatedResponse<AdminBookingResponse>> => {
  const response = await adminApiClient.get('/bookings', {
    params: {
      page,
    },
  });

  return response.data;
};
