import { adminApiClient } from '@/lib/api-client';
import { CreateServiceSchema } from '../forms';

export const createService = async (payload: CreateServiceSchema) => {
  const response = await adminApiClient.post('/services', payload);

  return response.data;
};
