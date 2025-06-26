import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { getBookingStatusColor } from '@/features/booking/utils';
import { format } from 'date-fns';
import { toRupiah } from '@/utils/to-rupiah';
import { id } from 'date-fns/locale';
import { BookingHistoryResponse } from '../interfaces';
import { Badge } from '@/components/ui/badge';

interface BookingHistoryTableProps {
  bookingHistories: BookingHistoryResponse[];
  isPending: boolean;
}

export const BookingHistoryTable: React.FC<BookingHistoryTableProps> = ({
  bookingHistories,
  isPending,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Layanan</TableHead>
          <TableHead>Hari, Tanggal</TableHead>
          <TableHead>Waktu</TableHead>
          <TableHead>Total Bayar</TableHead>
          <TableHead>Metode Pembayaran</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookingHistories.length < 1 ? (
          <TableRow>
            <TableCell colSpan={6} className='text-center'>
              Belum ada booking
            </TableCell>
          </TableRow>
        ) : isPending ? (
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
              </TableRow>
            ))}
          </>
        ) : (
          bookingHistories?.map((history) => (
            <TableRow key={history.id}>
              <TableCell>{history.service.name}</TableCell>
              <TableCell>{format(history.time, 'EEEE, dd-MM-yyyy', { locale: id })}</TableCell>
              <TableCell>{format(history.time, 'HH:mm')}</TableCell>
              <TableCell>{toRupiah(history.totalPay)}</TableCell>
              <TableCell>{history.payment.paymentMethod}</TableCell>
              <TableCell>
                <Badge className={getBookingStatusColor(history.status)}>{history.status}</Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
