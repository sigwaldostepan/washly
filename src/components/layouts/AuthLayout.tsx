import * as React from 'react';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className='flex min-h-screen w-full items-center justify-center'>{children}</main>;
};
