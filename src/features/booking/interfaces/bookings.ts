import { Service } from '@/features/service/interfaces';
import { BookingPayment } from './booking-payment';

export interface AdminBookingResponse {
  id: number;
  time: string;
  vehicle: string;
  status: string;
  totalPay: number;
  customerId: string;
  service: Pick<Service, 'id' | 'name'>;
  payment: BookingPayment;
  customer: {
    id: string;
    name: string;
  };
}
