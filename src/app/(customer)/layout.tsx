import * as React from 'react';
import { CustomerLayoutNavbar } from '@/components/layouts/Navbar';
import { getSession } from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Cuci kendaraanmu jadi lebih gampang',
    template: '%s - Washly',
  },
};

const CustomerLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await getSession();

  return (
    <>
      <CustomerLayoutNavbar customer={session?.user} />
      <main className='relative z-0'>{children}</main>
    </>
  );
};

export default CustomerLayout;
