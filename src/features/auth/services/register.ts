import { apiClient } from '@/lib/api-client';
import { RegisterSchema } from '../forms';

export const register = async (payload: RegisterSchema) => {
  const response = await apiClient.post('/auth/register', payload);

  return response.data;
};
