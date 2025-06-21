'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetServices } from '@/features/service/hooks';
import { Button } from '@/components/ui/button';
import { Service } from '@/generated/prisma';
import { toRupiah } from '@/utils/to-rupiah';
import { Edit, LucideIcon, MoreHorizontal, Trash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeviceScreen } from '@/hooks';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { icons } from 'lucide-react';

interface ServicesTableProps {
  search?: string;
  initialState?: Service[];
  onEdit: (service: Service) => void;
  onDelete: (serviceId: number) => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  search,
  initialState,
  onEdit,
  onDelete,
}) => {
  const { data: services = initialState, isPending } = useGetServices(search);

  const { isMobile } = useDeviceScreen();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Harga</TableHead>
          <TableHead>Icon</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Action</TableHead>
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
              </TableRow>
            ))}
          </>
        ) : (
          services?.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];

            return (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{toRupiah(+service.price)}</TableCell>
                <TableCell>
                  <Badge variant='outline'>
                    <Icon className='!size-5' />
                  </Badge>
                </TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell className='items-between flex gap-2'>
                  {isMobile ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size='icon' variant='outline'>
                          <MoreHorizontal className='!size-4 md:!mr-2' />
                          <p className='hidden md:block'>More</p>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='flex w-[100px] flex-col items-center gap-2 p-1 text-left'>
                        <Button
                          className='flex w-full items-center justify-start'
                          onClick={() => onEdit(service)}
                          variant='ghost'
                        >
                          <Edit className='mr-2 !size-4' />
                          Edit
                        </Button>
                        <Button
                          className='text-destructive hover:text-destructive/80 flex w-full items-center justify-start'
                          onClick={() => onDelete(service.id)}
                          variant='ghost'
                        >
                          <Trash className='mr-2 !size-4' />
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <>
                      <Button onClick={() => onEdit(service)} className='flex-1' variant='outline'>
                        <Edit className='!size-4 md:!mr-2' />
                        <p className='hidden md:block'>Edit</p>
                      </Button>
                      <Button
                        onClick={() => onDelete(service.id)}
                        className='destructive-outline flex-1'
                        variant='outline'
                      >
                        <Trash className='!size-4 md:!mr-2' />
                        <p className='hidden md:block'>Hapus</p>
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
