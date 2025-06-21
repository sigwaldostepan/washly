import { apiClient } from '@/lib/api-client';
import { LoginSchema } from '../forms';

export const login = async (payload: LoginSchema, endpoint: string) => {
  return await apiClient.post(endpoint, payload);
};
