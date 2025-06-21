import { useMutation } from '@tanstack/react-query';
import { register } from '../services';
import { MutationConfig } from '@/lib/react-query';
import { RegisterSchema } from '../forms';

type UseRegisterOptions = MutationConfig<typeof register>;

export const useRegister = (options?: UseRegisterOptions) => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (payload: RegisterSchema) => register(payload),
    ...options,
  });
};
