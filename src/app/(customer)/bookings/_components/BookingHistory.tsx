'use client';

import { SectionContainer } from '@/components/layouts';
import { useGetBookingHistory } from '@/features/booking/hooks';
import { JWTPayload } from '@/lib/jwt';
import { Pagination } from '@/components/shared';
import React from 'react';
import { BookingHistoryTable } from '@/features/booking/components';

interface BookingHistoryProps {
  user: JWTPayload;
}

export const BookingHistory = ({ user }: BookingHistoryProps) => {
  const { data: bookingHistories, isPending } = useGetBookingHistory({ userId: user.id, page: 1 });
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (bookingHistories) {
      setPage(bookingHistories.meta.currentPage);
    }
  }, [bookingHistories]);

  return (
    <>
      <SectionContainer hScreen navbarOffset paddedXl className='mt-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-bold'>History Booking</h1>
          <p className='text-muted-foreground'>Daftar booking-booking kamu</p>
        </div>

        <div className='mt-4'>
          <BookingHistoryTable
            bookingHistories={bookingHistories?.data ?? []}
            isPending={isPending}
          />
          <Pagination
            page={page}
            totalPages={Math.max(bookingHistories?.meta.totalPage ?? 1, 1)}
            onPageChange={setPage}
          />
        </div>
      </SectionContainer>
    </>
  );
};
