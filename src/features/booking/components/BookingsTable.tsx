'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { canUpdateBookingStatus, getBookingStatusColor } from '../utils';
import { badgeVariants } from '@/components/ui/badge';
import { BookingStatus } from '@/generated/prisma';
import { toRupiah } from '@/utils/to-rupiah';
import { AdminBookingResponse } from '../interfaces';

interface BookingsTableProps {
  bookings: AdminBookingResponse[];
  isPending?: boolean;
  onPreviewImage: (image: string) => void;
  onUpdateBookingStatus: (status: BookingStatus, id: number) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  isPending,
  onPreviewImage,
  onUpdateBookingStatus,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Waktu</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Layanan</TableHead>
          <TableHead>Kendaraan</TableHead>
          <TableHead>Total Bayar</TableHead>
          <TableHead>Metode Pembayaran</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : bookings?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className='h-24 text-center'>
              Belom ada booking
            </TableCell>
          </TableRow>
        ) : (
          bookings?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{format(booking.time, 'dd-MM-yyyy, HH:mm')}</TableCell>
              <TableCell>{booking.customer.name}</TableCell>
              <TableCell>{booking.service.name}</TableCell>
              <TableCell>{booking.vehicle}</TableCell>
              <TableCell>{toRupiah(booking.totalPay)}</TableCell>
              <TableCell className='flex items-center gap-4'>
                {booking.payment.paymentMethod}
                {booking.payment.paymentMethod !== 'CASH' && booking.payment.proofImage && (
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-6 w-6 !rounded-full'
                    onClick={() => {
                      onPreviewImage(booking.payment.proofImage);
                    }}
                  >
                    <Eye />
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        badgeVariants({ variant: 'default' }),
                        getBookingStatusColor(booking.status, 'default'),
                        'flex h-fit w-fit items-center justify-center transition-all duration-300',
                      )}
                      disabled={booking.status === 'COMPLETED' || booking.status === 'CANCELED'}
                      size='icon'
                    >
                      {booking.status}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-fit'>
                    <div className='flex flex-col gap-2'>
                      {Object.keys(BookingStatus).map((status) => (
                        <Button
                          key={status}
                          onClick={() => {
                            onUpdateBookingStatus(status as BookingStatus, booking.id);
                          }}
                          disabled={
                            !canUpdateBookingStatus(
                              status as BookingStatus,
                              booking.status as BookingStatus,
                            )
                          }
                          variant='ghost'
                          className={cn(
                            badgeVariants(),
                            getBookingStatusColor(status as BookingStatus, 'outline'),
                            'flex h-fit w-full items-center justify-center transition-all duration-300',
                          )}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
