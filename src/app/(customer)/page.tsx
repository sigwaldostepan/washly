import { SectionContainer } from '@/components/layouts';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { customerReviews, ourServices } from '@/constants';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function Home() {
  return (
    <>
      <SectionContainer hScreen centered className='text-primary-foreground flex flex-col'>
        <div className='absolute z-0 h-full w-full'>
          <Image src='/assets/hero-img.webp' alt='hero-image' fill className='object-cover' />
        </div>
        <div className='relative z-10 flex h-full w-full flex-1 items-center justify-center bg-black/40 backdrop-blur-[4px]'>
          <div className='flex w-1/2 flex-col items-center justify-center space-y-6 text-center md:w-full'>
            <h3 className='text-shadow-foreground text-4xl font-bold text-shadow-md md:text-5xl'>
              Mobil Bersih, Mobil Ganteng
            </h3>
            <p className='text-lg md:text-xl'>
              Cuci mobil cepat, detailing maksimal, mobil jadi ganteng dalam satu klik
            </p>
            <div className='flex gap-4'>
              <Link href='/bookings/new' className={buttonVariants({ size: 'lg' })}>
                Booking Sekarang
              </Link>
              <Link
                href='/services'
                className={buttonVariants({
                  variant: 'outline',
                  className: 'bg-transparent',
                  size: 'lg',
                })}
              >
                Lihat Layanan
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
      <SectionContainer className='mt-6' paddedXl>
        <div className='flex flex-col gap-3'>
          <h3 className='text-2xl font-semibold md:text-3xl'>Layanan Kami</h3>
          <p className=''>Layanan Kami hadir untuk menjaga mobil kami tetap prima dan kinclong</p>
        </div>
        <div className='mt-6 flex flex-col gap-4 md:flex-row md:gap-6'>
          {ourServices.map((service) => (
            <Card key={service.title} className='flex-1'>
              <CardContent>
                <service.icon />
                <div className='mt-4 flex flex-col gap-2'>
                  <CardTitle className='text-xl capitalize'>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>
      <SectionContainer className='mt-6' paddedXl>
        <div className='flex flex-col gap-3'>
          <h3 className='text-2xl font-semibold md:text-3xl'>Review Customer</h3>
          <p className=''>Pendapat beliau-beliau yg sudah pernah menggunakan layanan kami</p>
        </div>
        <div className='mt-6 flex flex-col gap-4 md:flex-row md:gap-6'>
          {customerReviews.map((review) => (
            <Card key={review.name} className='flex-1'>
              <CardContent>
                <div className='flex flex-col gap-2'>
                  <CardTitle className='text-xl capitalize'>{review.name}</CardTitle>
                  <div className='flex gap-1'>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={cn('h-5 w-5', index < review.rating && 'fill-primary')}
                      />
                    ))}
                  </div>
                  <CardDescription>{review.review}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
