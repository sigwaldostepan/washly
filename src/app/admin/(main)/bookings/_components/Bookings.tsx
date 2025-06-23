'use client';

import { AdminPageContainer, SectionContainer } from '@/components/layouts';
import {
  getBookingsQueryOptions,
  useGetBookings,
  useUpdateBookingStatus,
} from '@/features/booking/hooks';
import { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDisclosure } from '@/hooks';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { keepPreviousData, useQueryClient } from '@tanstack/react-query';
import { PaginatedResponse } from '@/interfaces';
import { AdminBookingResponse } from '@/features/booking/interfaces';
import { BookingsTable } from '@/features/booking/components';
import { BookingStatus } from '@/generated/prisma';
import { ImageWithLoader, Pagination } from '@/components/shared';

export const AdminBookings = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedProof, setSelectedProof] = useState<string>();

  const queryClient = useQueryClient();
  const { data: bookings } = useGetBookings({
    page,
    placeholderData: keepPreviousData,
  });
  const { mutateAsync: updateBookingStatus } = useUpdateBookingStatus({
    onSuccess: () => {
      toast.success('Booking status updated');

      queryClient.invalidateQueries({
        queryKey: [...getBookingsQueryOptions(page).queryKey],
      });
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [...getBookingsQueryOptions(page).queryKey],
      });

      queryClient.setQueryData(
        [...getBookingsQueryOptions(page).queryKey],
        (prev: PaginatedResponse<AdminBookingResponse>) => {
          const updatedData = prev.data.map((booking) => {
            if (booking.id === data.id) {
              return {
                ...booking,
                status: data.status,
              };
            }
            return booking;
          });

          return {
            ...prev,
            data: updatedData,
          };
        },
      );
    },
  });

  const previewImageDisclosure = useDisclosure();

  const onPreviewImage = (proofImage: string) => {
    setSelectedProof(proofImage);
    previewImageDisclosure.open();
  };

  const onUpdateBookingStatus = (status: BookingStatus, id: number) => {
    updateBookingStatus({ id, status });
  };

  return (
    <AdminPageContainer title='Booking' description='Lihat dan manage booking'>
      <SectionContainer padded className='relative w-full overflow-hidden'>
        <ScrollArea className='w-full whitespace-nowrap'>
          <BookingsTable
            page={page}
            onPreviewImage={onPreviewImage}
            onUpdateBookingStatus={onUpdateBookingStatus}
          />
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        <Pagination page={page} totalPages={bookings?.meta.totalPage ?? 1} onPageChange={setPage} />
      </SectionContainer>

      {/* Dialogs */}
      <Dialog open={previewImageDisclosure.isOpen} onOpenChange={previewImageDisclosure.close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bukti Pembayaran</DialogTitle>
          </DialogHeader>
          <div className='flex items-center justify-center'>
            <ImageWithLoader
              alt='proof'
              src={selectedProof || ''}
              containerClassName='w-[200px] h-[200px] md:w-[300px] md:h-[300px]'
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='secondary'>Kembali</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageContainer>
  );
};
