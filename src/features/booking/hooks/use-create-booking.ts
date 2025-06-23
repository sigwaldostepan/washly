import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../services';
import { MutationConfig } from '@/lib/react-query';

type UseCreateBookingOptions = MutationConfig<typeof createBooking>;

export const useCreateBooking = (options?: UseCreateBookingOptions) => {
  return useMutation({
    mutationKey: ['create-bookings', 'bookings'],
    mutationFn: createBooking,
    ...options,
  });
};
