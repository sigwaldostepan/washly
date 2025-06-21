import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { deleteService } from '../services';

interface UseDeleteServiceOptions extends MutationConfig<typeof deleteService> {
  id: number;
}

export const useDeleteService = ({ id, ...options }: UseDeleteServiceOptions) => {
  return useMutation({
    mutationKey: ['delete-service', 'services', id],
    mutationFn: deleteService,
    ...options,
  });
};
