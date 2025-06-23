import { BookingStatus } from '@/generated/prisma';

export const canUpdateBookingStatus = (status: BookingStatus, currentStatus: BookingStatus) => {
  if (currentStatus === status) {
    return false;
  }

  if (currentStatus === 'COMPLETED' || currentStatus === 'CANCELED') {
    return false;
  }

  const validStatusUpdate = {
    PENDING: ['BOOKED'],
    BOOKED: ['COMPLETED', 'CANCELED'],
    COMPLETED: [],
    CANCELED: [],
  };

  return validStatusUpdate[currentStatus].includes(status) || false;
};
