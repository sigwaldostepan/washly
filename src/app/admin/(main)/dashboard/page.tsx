import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Dashboard } from './_components';
import { getStatsSummaryOptions } from '@/features/stats/hooks';

const AdminDashboardPage = () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    ...getStatsSummaryOptions(),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <Dashboard />
    </HydrationBoundary>
  );
};

export default AdminDashboardPage;
