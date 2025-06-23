import { PaymentMethod } from '@/generated/prisma';

export interface BookingPayment {
  id: string;
  paymentMethod: PaymentMethod;
  amount: number;
  proofImage: string;
}
