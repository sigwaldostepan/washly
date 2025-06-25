'use client';

import { AdminPageContainer, SectionContainer } from '@/components/layouts';
import { Pagination, SearchInput } from '@/components/shared';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetCustomers } from '@/features/customer/hooks';
import { useDebounce } from '@/hooks';
import { toRupiah } from '@/utils/to-rupiah';
import { keepPreviousData } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';

const AdminCustomerPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [page, setPage] = useState(1);

  const { data: customers, isPending } = useGetCustomers({
    page,
    search: debouncedSearch,
    placeholderData: keepPreviousData,
  });

  return (
    <AdminPageContainer title='Customers' description='List customer Washly'>
      <SectionContainer padded>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Cari customer'
          className='my-3'
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Kunjungan Terakhir</TableHead>
              <TableHead>Total Pengeluaran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
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
              customers?.data.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.user.email}</TableCell>
                  <TableCell>
                    {!!customer.lastBooked ? format(customer.lastBooked, 'dd-MM-yyyy') : '-'}
                  </TableCell>
                  <TableCell>{toRupiah(customer.totalSpent)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Pagination
          page={page}
          totalPages={customers?.meta.totalPage ?? 1}
          onPageChange={setPage}
        />
      </SectionContainer>
    </AdminPageContainer>
  );
};

export default AdminCustomerPage;
