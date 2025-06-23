'use client';

import { SectionContainer } from '@/components/layouts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { unslugify } from '@/components/utils/slugify';
import { useParams, useRouter } from 'next/navigation';
import { useGetServices } from '@/features/service/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBookingSchema, createBookingSchema } from '@/features/booking/forms';
import { Form } from '@/components/ui/form';
import { JWTPayload } from '@/lib/jwt';
import React from 'react';
import { z } from 'zod';
import { CreateBookingForm } from '@/features/booking/components';
import { useCreateBooking } from '@/features/booking/hooks';
import { toast } from 'sonner';

interface CreateBookingProps {
  user?: JWTPayload;
}

export const CreateBooking: React.FC<CreateBookingProps> = ({ user }) => {
  const { slug } = useParams();
  const { id: serviceId } = unslugify((slug as string) || '');

  const router = useRouter();

  const { data: services } = useGetServices();
  const { mutateAsync: createBooking, isPending } = useCreateBooking({
    onSuccess: () => {
      toast.success('Booking berhasil dibuat');
      router.push('/services');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<CreateBookingSchema>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      customerName: user?.name ?? '',
      customerEmail: user?.email ?? '',
      bookingTime: new Date(),
      vehicle: '',
      serviceId: serviceId ?? null,
      paymentMethod: '',
      proofImage: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof createBookingSchema>) => {
    return await createBooking({ ...data, customerId: user?.id ?? '' });
  };

  return (
    <>
      <SectionContainer hScreen paddedXl centered navbarOffset>
        <Card className='w-[250px] md:w-[350px] lg:w-[400px]'>
          <CardHeader>
            <CardTitle className='text-xl md:text-2xl'>Booking layanan</CardTitle>
            <CardDescription>Lengkapin form ini untuk melakukan booking layanan</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <CreateBookingForm
                onSubmit={onSubmit}
                services={services ?? []}
                isPending={isPending}
              />
            </Form>
          </CardContent>
        </Card>
      </SectionContainer>
    </>
  );
};
