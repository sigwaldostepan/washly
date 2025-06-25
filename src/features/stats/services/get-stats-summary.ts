import { adminApiClient } from '@/lib/api-client';
import { BookingSummary } from '../interfaces';

export const getStatsSummary = async (): Promise<BookingSummary> => {
  const response = await adminApiClient.get('/stats/summary');

  return response.data.data;
};
