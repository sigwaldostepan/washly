import { adminApiClient } from '@/lib/api-client';

export const deleteService = async (serviceId: number) => {
  const response = await adminApiClient.delete(`/services/${serviceId}`);

  return response.data;
};
