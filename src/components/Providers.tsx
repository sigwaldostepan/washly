'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/react-query';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();

  const error = searchParams.get('error');
  const message = searchParams.get('message');

  React.useEffect(() => {
    if (error && message) {
      toast.error(message);
    }

    return () => {
      toast.dismiss();
    };
  }, [error, message]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position='top-right' duration={3000} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
