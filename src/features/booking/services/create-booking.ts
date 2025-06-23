import { apiClient } from '@/lib/api-client';
import { CreateBookingSchema } from '../forms';
import { PaymentMethod } from '@/generated/prisma';

interface CreateBookingParas extends CreateBookingSchema {
  customerId: string;
}

export const createBooking = async (data: CreateBookingParas) => {
  const formData = new FormData();

  formData.append('customerName', data.customerName);
  formData.append('customerEmail', data.customerEmail);
  formData.append('time', data.bookingTime.toISOString());
  formData.append('vehicle', data.vehicle);
  formData.append('serviceId', data.serviceId.toString());
  formData.append('paymentMethod', data.paymentMethod);
  formData.append('customerId', data.customerId);

  if (data.paymentMethod !== PaymentMethod.CASH) {
    formData.append('proofImage', data.proofImage[0]);
  }

  const response = await apiClient.post('/bookings', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
