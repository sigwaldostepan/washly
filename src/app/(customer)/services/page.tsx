import { getServicesQueryOptions } from '@/features/service/hooks';
import { Services } from './_components';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const ServicesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    ...getServicesQueryOptions(),
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <Services />
    </HydrationBoundary>
  );
};

export default ServicesPage;
