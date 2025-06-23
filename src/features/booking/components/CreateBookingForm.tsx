'use client';

import {
  DateTimePicker,
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/shared';
import { FormControl, FormDescription, FormField } from '@/components/ui/form';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateBookingSchema, MAX_FILE_SIZE } from '../forms';
import { PaymentMethod, Service } from '@/generated/prisma';
import { CloudUpload, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useDisclosure } from '@/hooks';
import { toRupiah } from '@/utils/to-rupiah';
import { Spinner } from '@/components/ui/spinner';

interface CreateBookingFormProps {
  onSubmit: (data: CreateBookingSchema) => void;
  isPending?: boolean;
  services: Service[];
}

export const CreateBookingForm: React.FC<CreateBookingFormProps> = ({
  onSubmit,
  isPending,
  services,
}) => {
  const form = useFormContext<CreateBookingSchema>();

  const { isOpen, setIsOpen, open, close } = useDisclosure();

  const paymentMethod = form.watch('paymentMethod');

  const isRequiredPaymentProof = paymentMethod !== PaymentMethod.CASH && paymentMethod !== '';

  const disableButton = !form.formState.isValid || isPending;

  React.useEffect(() => {
    if (!isRequiredPaymentProof) {
      form.setValue('proofImage', []);
      form.clearErrors('proofImage');
    }
  }, [isRequiredPaymentProof]);

  return (
    <form
      className='space-y-6'
      onSubmit={form.handleSubmit(onSubmit)}
      encType='multipart/form-data'
    >
      <FormField
        control={form.control}
        name='customerName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Masukkan nama' disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='customerEmail'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Masukkan email' disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='bookingTime'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hari & waktu</FormLabel>
            <FormControl>
              <DateTimePicker
                onChange={(date) => field.onChange(date)}
                placeholder='Pilih hari & waktu'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='vehicle'
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Kendaraan kamu</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Masukkan data kendaraan kamu' />
            </FormControl>
            {!fieldState.error ? (
              <FormDescription>Jenis kendaraan atau nomor plat kamu</FormDescription>
            ) : (
              <FormMessage />
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='serviceId'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Layanan</FormLabel>
            <FormControl>
              <Select value={field.value.toString()} onValueChange={field.onChange}>
                <SelectTrigger className='w-full capitalize'>
                  <SelectValue placeholder='Pilih layanan' />
                </SelectTrigger>
                <SelectContent>
                  {services?.map((service) => (
                    <SelectItem
                      key={service.id}
                      className='capitalize'
                      value={service.id.toString()}
                    >
                      {service.name} - {toRupiah(+service.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='flex items-end justify-between gap-4'>
        <FormField
          control={form.control}
          name='paymentMethod'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Metode pembayaran</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full flex-1 capitalize'>
                    <SelectValue placeholder='Pilih metode pembayaran' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PaymentMethod).map((method) => (
                      <SelectItem key={method} className='capitalize' value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant='outline'
          onClick={open}
          className={cn(
            'text-xs',
            form.formState.errors.proofImage &&
              'border-destructive text-destructive ring-destructive',
          )}
          type='button'
          disabled={!isRequiredPaymentProof}
        >
          <UploadCloud />
          <p className='hidden md:block'>Upload bukti</p>
        </Button>
      </div>
      {/* Dialogs */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='max-h-[80dvh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Upload bukti pembayaran</DialogTitle>
          </DialogHeader>
          <div className='flex w-full items-center justify-center'>
            <Card className='flex h-fit w-fit items-center justify-center'>
              <CardHeader>
                <CardTitle className='text-lg'>
                  {paymentMethod === PaymentMethod.QRIS ? 'QRIS' : 'Bank'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {paymentMethod === PaymentMethod.QRIS ? (
                  <Image src='/QR.svg' alt='QR' width={200} height={200} />
                ) : (
                  <p>Transfer ke rekening: 1234 5678 9012</p>
                )}
              </CardContent>
            </Card>
          </div>
          <FormField
            control={form.control}
            name='proofImage'
            render={({ field }) => (
              <FormItem
                className={cn(
                  isRequiredPaymentProof
                    ? 'h-full scale-y-100 opacity-100'
                    : 'h-0 scale-y-0 opacity-0',
                  'relative transition-all duration-500',
                )}
              >
                <FormLabel>Bukti transfer</FormLabel>
                <FormControl>
                  <FileUpload
                    accept='image/*'
                    value={field.value}
                    onValueChange={field.onChange}
                    maxSize={MAX_FILE_SIZE}
                    onFileReject={(_, message) => {
                      form.setError('proofImage', { message });
                    }}
                    multiple={false}
                  >
                    <FileUploadDropzone className='flex-row flex-wrap border-dotted text-center'>
                      <CloudUpload className='size-4' />
                      Drag and drop or
                      <FileUploadTrigger asChild>
                        <Button variant='link' size='sm' className='p-0'>
                          choose files
                        </Button>
                      </FileUploadTrigger>
                      to upload
                    </FileUploadDropzone>
                    <FileUploadList>
                      {field.value?.map((file, index) => (
                        <FileUploadItem key={index} value={file}>
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata />
                          <FileUploadItemDelete asChild>
                            <Button variant='ghost' size='icon' className='size-7'>
                              <X />
                              <span className='sr-only'>Delete</span>
                            </Button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      ))}
                    </FileUploadList>
                  </FileUpload>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='button' onClick={close}>
            Simpan
          </Button>
        </DialogContent>
      </Dialog>
      <Button className='w-full' type='submit' disabled={disableButton}>
        Buat booking
        <Spinner size='small' show={isPending} />
      </Button>
    </form>
  );
};
