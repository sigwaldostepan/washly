import { adminApiClient } from '@/lib/api-client';
import { CustomersWithSummaries } from '../interfaces';
import { PaginatedResponse } from '@/interfaces';

type GetCustomersParams = {
  page?: number;
  search?: string;
};

export const getCustomers = async ({
  page,
  search,
}: GetCustomersParams): Promise<PaginatedResponse<CustomersWithSummaries>> => {
  const response = await adminApiClient.get('/customers', {
    params: {
      page,
      search,
    },
  });

  return response.data;
};
