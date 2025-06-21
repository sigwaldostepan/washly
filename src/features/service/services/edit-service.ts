import { adminApiClient } from '@/lib/api-client';
import { EditServiceSchema } from '../forms';

interface EditServicePayload extends EditServiceSchema {
  id: number;
}

export const editService = async (payload: EditServicePayload) => {
  const response = await adminApiClient.patch(`/services/${payload.id}`, payload);

  return response.data;
};
