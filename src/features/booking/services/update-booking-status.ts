import { adminApiClient } from '@/lib/api-client';

interface UpdateBookingStatusPayload {
  id: number;
  status: string;
}

export const updateBookingStatus = async ({ id, status }: UpdateBookingStatusPayload) => {
  const response = await adminApiClient.patch(`/bookings/${id}/status`, {
    status,
  });

  return response.data;
};
