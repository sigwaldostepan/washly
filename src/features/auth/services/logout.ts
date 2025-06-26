import { apiClient } from '@/lib/api-client';

export const logout = async () => {
  const response = await apiClient.post('/auth/logout');

  return response.data;
};
