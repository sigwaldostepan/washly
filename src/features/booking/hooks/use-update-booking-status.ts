import { useMutation } from '@tanstack/react-query';
import { updateBookingStatus } from '../services';
import { MutationConfig } from '@/lib/react-query';

type UseUpdateBookingStatusOptions = MutationConfig<typeof updateBookingStatus>;

export const useUpdateBookingStatus = ({ ...options }: UseUpdateBookingStatusOptions) => {
  return useMutation({
    mutationKey: ['update-booking-status', 'bookings'],
    mutationFn: ({ id, status }) => updateBookingStatus({ id, status }),
    ...options,
  });
};
