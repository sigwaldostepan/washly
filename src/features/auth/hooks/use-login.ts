import { useMutation } from '@tanstack/react-query';
import { login } from '../services';
import { MutationConfig } from '@/lib/react-query';
import { LoginSchema } from '../forms';

interface UseLoginOptions extends MutationConfig<typeof login> {
  endpoint: string;
}

export const useLogin = ({ endpoint, ...options }: UseLoginOptions) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginSchema) => login(payload, endpoint),
    ...options,
  });
};
