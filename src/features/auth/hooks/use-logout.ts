import { useMutation } from '@tanstack/react-query';
import { logout } from '../services';
import { MutationConfig } from '@/lib/react-query';

type UseLogoutOptions = MutationConfig<typeof logout>;

export const useLogout = (options?: UseLogoutOptions) => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
    ...options,
  });
};
