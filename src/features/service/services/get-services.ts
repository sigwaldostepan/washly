import { Service } from '@/generated/prisma';
import { adminApiClient } from '@/lib/api-client';

export const getServices = async (search?: string): Promise<Service[]> => {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }

  const response = await adminApiClient.get('/services', {
    params,
  });

  return response.data.data;
};
