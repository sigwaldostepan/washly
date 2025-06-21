import { AdminLayoutNavbar, AdminLayoutSidebar } from '@/components/layouts';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getSession } from '@/lib/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Manage Washly',
    template: '%s - Washly Admin',
  },
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await getSession();

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/?error=unauthorized&message=Anda tidak memiliki akses');

    return null;
  }

  return (
    <SidebarProvider>
      <AdminLayoutSidebar admin={session.user} />
      <div className='relative w-full'>
        <AdminLayoutNavbar />
        <main className='min-h-screen flex-1'>{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
