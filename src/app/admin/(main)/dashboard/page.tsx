'use client';

import { AdminPageContainer, SectionContainer } from '@/components/layouts/Containers';
import { useGetStatsSummary } from '@/features/stats/hooks';
import { SummaryCard } from '@/features/stats/components';
import { BookingsTable } from '@/features/booking/components';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImageWithLoader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks';
import { useState } from 'react';
import { getBookingsQueryOptions, useUpdateBookingStatus } from '@/features/booking/hooks';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { PaginatedResponse } from '@/interfaces';
import { AdminBookingResponse } from '@/features/booking/interfaces';
import { BookingStatus } from '@/generated/prisma';

const DashboardPage = () => {
  const [selectedProof, setSelectedProof] = useState<string>();

  const queryClient = useQueryClient();
  const { data: summary } = useGetStatsSummary();
  const { mutateAsync: updateBookingStatus } = useUpdateBookingStatus({
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [...getBookingsQueryOptions(1).queryKey],
      });

      queryClient.setQueryData(
        [...getBookingsQueryOptions(1).queryKey],
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
    onSuccess: () => {
      toast.success('Booking status updated');
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
    <AdminPageContainer title='Dashboard'>
      <SectionContainer padded>
        <div className='w-full'>
          <div className='flex items-center gap-4'>
            <SummaryCard
              title='Pendapatan hari ini'
              amount={summary?.dailySummary.dailyRevenue ?? 0}
              difference={Number(summary?.dailySummary.dailyDifference ?? 0)}
              format='currency'
            />
            <SummaryCard
              title='Pendapatan bulan ini'
              amount={summary?.monthlySummary.monthlyRevenue ?? 0}
              difference={Number(summary?.monthlySummary.monthlyDifference ?? 0)}
              format='currency'
            />
          </div>
          <SummaryCard
            className='mt-4'
            title='Jumlah kendaraan yg sudah dicuci'
            amount={summary?.totalVehicleWashed ?? 0}
            format='number'
          />
        </div>
      </SectionContainer>
      <SectionContainer padded>
        <h1 className='my-3 text-xl font-semibold'>Booking Terbaru</h1>
        <BookingsTable
          page={1}
          onPreviewImage={onPreviewImage}
          onUpdateBookingStatus={onUpdateBookingStatus}
        />
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
      <Dialog></Dialog>
    </AdminPageContainer>
  );
};

export default DashboardPage;
