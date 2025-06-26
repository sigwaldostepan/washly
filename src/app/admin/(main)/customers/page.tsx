import { getCustomersOptions } from '@/features/customer/hooks';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { CustomersList } from './_components';

const AdminCustomerPage = () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    ...getCustomersOptions({ page: 1, search: '' }),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <CustomersList />
    </HydrationBoundary>
  );
};

export default AdminCustomerPage;
