'use client';

import { SectionContainer } from '@/components/layouts';
import { useGetServices } from '@/features/service/hooks';
import { ServiceCard } from '@/features/service/components';

export const Services = () => {
  const { data: services } = useGetServices();

  return (
    <>
      <SectionContainer
        className='text-primary-foreground min-h-screen bg-gradient-to-b from-blue-800 via-blue-800/60 via-80%'
        centered
        navbarOffset
        paddedXl
      >
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <h1 className='text-4xl font-bold md:text-5xl'>Layanan Kami</h1>
          <p className='text-xl md:text-2xl'>
            Kami menyediakan berbagai jasa cuci kendaraan dengan kualitas terbaik, dengan harga
            terbalik.
          </p>
        </div>
      </SectionContainer>
      <SectionContainer paddedXl className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {services?.map((service) => {
          return <ServiceCard key={service.id} service={service} />;
        })}
      </SectionContainer>
    </>
  );
};
