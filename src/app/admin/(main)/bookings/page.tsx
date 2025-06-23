import { getBookingsQueryOptions } from '@/features/booking/hooks';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { AdminBookings } from './_components';

const AdminBookingPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    ...getBookingsQueryOptions(1),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <AdminBookings />
    </HydrationBoundary>
  );
};

export default AdminBookingPage;
