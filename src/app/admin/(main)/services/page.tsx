import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { AdminServiceManagementPage } from './_components';
import { useGetServiceOptions } from '@/features/service/hooks';

const AdminServicesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    ...useGetServiceOptions(''),
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <AdminServiceManagementPage />
    </HydrationBoundary>
  );
};

export default AdminServicesPage;
