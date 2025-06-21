import { useMutation } from '@tanstack/react-query';
import { createService } from '../services';
import { MutationConfig } from '@/lib/react-query';

type UseCreateServiceOptions = MutationConfig<typeof createService>;

export const useCreateService = (options?: UseCreateServiceOptions) => {
  return useMutation({
    mutationKey: ['create-services', 'services'],
    mutationFn: createService,
    ...options,
  });
};
