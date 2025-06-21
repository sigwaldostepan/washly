import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { JWTPayload } from '@/lib/jwt';
import Link from 'next/link';
import React from 'react';

interface AdminLayoutNavbarProps {
  admin?: JWTPayload;
}

export const AdminLayoutNavbar: React.FC<AdminLayoutNavbarProps> = ({ admin }) => {
  return (
    <div className='border-border bg-primary-foreground/30 padded sticky top-0 z-50 h-fit w-full border-b shadow backdrop-blur'>
      <span className='flex h-8 items-center justify-start gap-2'>
        <SidebarTrigger />
        <Separator orientation='vertical' className='bg-muted-foreground/80 mr-2' />
        <Link
          href='/admin'
          className='hover:text-primary text-xl font-semibold transition-all duration-500 md:text-2xl'
        >
          Washly
        </Link>
      </span>
    </div>
  );
};
