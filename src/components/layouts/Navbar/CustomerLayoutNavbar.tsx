'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NAVIGATIONS } from '@/constants';
import { useDeviceScreen } from '@/hooks';
import { JWTPayload } from '@/lib/jwt';
import { Menu, WashingMachine } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CustomerLayoutNavbarProps {
  customer?: JWTPayload;
}

export const CustomerLayoutNavbar: React.FC<CustomerLayoutNavbarProps> = ({ customer }) => {
  const { isMobile } = useDeviceScreen();

  return (
    <div className='border-border bg-primary-foreground/30 fixed top-0 left-0 z-50 w-full border-b px-4 py-4 shadow backdrop-blur md:px-12'>
      <div className='flex w-full items-center justify-between'>
        <Link href='/' className='group'>
          <span className='group-hover:stroke-primary group-hover:text-primary flex items-center text-xl font-semibold transition-all duration-500 md:text-3xl'>
            <WashingMachine className='mr-2 !size-5 md:mr-3 md:!size-6' />
            Washly
          </span>
        </Link>
        <nav className='flex items-center justify-center gap-6 md:gap-8'>
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='cursor-pointer'>
                  <Menu className='!size-4' />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className='items-center'>
                  <SheetTitle className='text-lg font-bold'>Menu</SheetTitle>
                </SheetHeader>
                <div className='flex flex-col items-start justify-center px-4'>
                  {NAVIGATIONS.map((navigation) => (
                    <Link
                      key={navigation.label}
                      href={navigation.href}
                      className='border-border flex w-full items-center border-b py-4 font-semibold capitalize last:border-b-0'
                    >
                      {navigation.label}
                    </Link>
                  ))}
                  {!customer && (
                    <div className='mt-4 flex w-full items-center justify-center gap-3'>
                      <Link href='/login' className={buttonVariants({ className: 'flex-1' })}>
                        Login
                      </Link>
                      <Link
                        href='/register'
                        className={buttonVariants({
                          variant: 'secondary',
                          className: 'flex-1',
                        })}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              {NAVIGATIONS.map((navigation) => (
                <Link
                  key={navigation.label}
                  href={navigation.href}
                  className='group font-medium capitalize transition-all duration-300'
                >
                  {navigation.label}
                  <span className='block h-0.5 w-full scale-0 bg-black transition-all duration-300 group-hover:scale-100'></span>
                </Link>
              ))}
              {!customer && (
                <span className='flex items-center gap-2'>
                  <Link href='/login' className={buttonVariants()}>
                    Login
                  </Link>
                  <Link href='/register' className={buttonVariants({ variant: 'secondary' })}>
                    Register
                  </Link>
                </span>
              )}
            </>
          )}
        </nav>
      </div>
    </div>
  );
};
