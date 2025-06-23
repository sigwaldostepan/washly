import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { AdminServices } from './_components';
import { getServicesQueryOptions } from '@/features/service/hooks';

const AdminServicesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    ...getServicesQueryOptions(''),
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <AdminServices />
    </HydrationBoundary>
  );
};

export default AdminServicesPage;
