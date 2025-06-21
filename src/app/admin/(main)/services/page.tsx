import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { AdminServiceManagementPage } from './_components';
import { getServiceQueryOptions } from '@/features/service/hooks';

const AdminServicesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    ...getServiceQueryOptions(''),
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <AdminServiceManagementPage />
    </HydrationBoundary>
  );
};

export default AdminServicesPage;
