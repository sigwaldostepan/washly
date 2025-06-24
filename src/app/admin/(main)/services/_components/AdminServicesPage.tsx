'use client';

import { AdminPageContainer, SectionContainer } from '@/components/layouts';
import { SearchInput } from '@/components/shared';
import { useDisclosure } from '@/hooks';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateServiceSchema,
  createServiceSchema,
  editServiceSchema,
  EditServiceSchema,
} from '@/features/service/forms';
import { Form } from '@/components/ui/form';
import { ServiceForm } from '@/features/service/components';
import {
  useCreateService,
  useGetServices,
  useEditService,
  useDeleteService,
} from '@/features/service/hooks';
import { toast } from 'sonner';
import { useDebounce } from '@/hooks';
import { ServicesTable } from '@/features/service/components';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { Service } from '@/generated/prisma';
import { z } from 'zod';

export const AdminServices: React.FC = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [serviceIdToDelete, setServiceIdToDelete] = React.useState<number>(0);
  const [serviceIdToEdit, setServiceIdToEdit] = React.useState<number>(0);

  const serviceForm = z.union([createServiceSchema, editServiceSchema]);

  const form = useForm<CreateServiceSchema | EditServiceSchema>({
    resolver: zodResolver(serviceForm),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      icon: '',
    },
  });

  const { data: services } = useGetServices(debouncedSearch);

  const queryClient = useQueryClient();
  const { mutateAsync: createService } = useCreateService({
    onSuccess: () => {
      toast.success('Item berhasil dibuat');

      form.reset();

      queryClient.invalidateQueries({
        queryKey: ['services', debouncedSearch],
      });

      createServiceDisclosure.isOpen && createServiceDisclosure.close();
    },
  });
  const { mutateAsync: editService } = useEditService({
    id: serviceIdToEdit,
    onSuccess: () => {
      toast.success('Item berhasil diubah');

      editServiceDisclosure.isOpen && editServiceDisclosure.close();

      queryClient.invalidateQueries({
        queryKey: ['services', debouncedSearch],
      });
    },
  });
  const { mutateAsync: deleteService } = useDeleteService({
    id: serviceIdToDelete,
    onSuccess: () => {
      toast.success('Item berhasil dihapus');

      deleteServiceDisclosure.isOpen && deleteServiceDisclosure.close();

      queryClient.invalidateQueries({
        queryKey: ['services', debouncedSearch],
      });
    },
  });

  const createServiceDisclosure = useDisclosure();
  const editServiceDisclosure = useDisclosure();
  const deleteServiceDisclosure = useDisclosure();

  const onCreateSubmit = async (data: CreateServiceSchema) => {
    await createService(data);
  };

  const onDelete = (serviceId: number) => {
    setServiceIdToDelete(serviceId);
    deleteServiceDisclosure.open();
  };
  const onDeleteConfirm = async () => {
    await deleteService(serviceIdToDelete);
  };

  const onEdit = (service: Service) => {
    setServiceIdToEdit(service.id);

    form.reset({
      name: service.name,
      price: +service.price,
      description: service.description,
      icon: service.icon,
    });

    editServiceDisclosure.open();
  };
  const onEditSubmit = async (data: EditServiceSchema) => {
    await editService({ id: serviceIdToEdit, ...data });
  };

  return (
    <AdminPageContainer title='Layanan' description='Kelola layanan Washly'>
      <SectionContainer padded>
        <div className='mb-3 flex items-center justify-between gap-2'>
          <SearchInput
            className='w-full'
            placeholder='Cari layanan'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={createServiceDisclosure.open}>
            <Plus className='mr-2 !size-4' /> Buat layanan
          </Button>
        </div>

        <ServicesTable
          search={debouncedSearch}
          initialState={services}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </SectionContainer>

      {/* Dialogs and alerts */}
      <Dialog
        open={createServiceDisclosure.isOpen}
        onOpenChange={createServiceDisclosure.setIsOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah layanan</DialogTitle>
            <DialogDescription>Isi form ini untuk menambahkan layanan baru</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <ServiceForm onSubmit={onCreateSubmit} />
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog open={editServiceDisclosure.isOpen} onOpenChange={editServiceDisclosure.setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah layanan</DialogTitle>
            <DialogDescription>Isi form ini untuk mengubah layanan</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <ServiceForm onSubmit={onEditSubmit} />
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={deleteServiceDisclosure.isOpen}
        onOpenChange={deleteServiceDisclosure.setIsOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kamu yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu yakin ingin menghapus layanan ini?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDeleteConfirm}
              className='bg-destructive hover:bg-destructive/80 text-white'
            >
              Ya
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* End of dialogs and alerts */}
    </AdminPageContainer>
  );
};
