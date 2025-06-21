import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { editService } from '../services';
import { EditServiceSchema } from '../forms';

interface UseEditServiceProps extends MutationConfig<typeof editService> {
  id: number;
}

export const useEditService = ({ id, ...options }: UseEditServiceProps) => {
  return useMutation({
    mutationKey: ['edit-service', 'services', id],
    mutationFn: (data: EditServiceSchema) => editService({ id, ...data }),
    ...options,
  });
};
