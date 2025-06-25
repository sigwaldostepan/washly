import { Booking, Customer, User } from '@/generated/prisma';

export interface CustomersWithSummaries extends Pick<Customer, 'id' | 'name'> {
  bookings: Booking[];
  user: Pick<User, 'email'>;
  totalSpent: number;
  lastBooked?: Date;
}
