import { Service } from '@/generated/prisma';
import { adminApiClient } from '@/lib/api-client';

export const getServiceById = async (id: number): Promise<Service> => {
  const response = await adminApiClient.get(`/services/${id}`);

  return response.data.data;
};
