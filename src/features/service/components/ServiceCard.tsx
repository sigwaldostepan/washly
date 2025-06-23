import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { icons } from 'lucide-react';
import { toRupiah } from '@/utils/to-rupiah';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { slugify } from '@/components/utils/slugify';
import { Service } from '@/generated/prisma';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = icons[service.icon as keyof typeof icons];

  return (
    <Card key={service.id} className='transition-all duration-300 hover:shadow-lg'>
      <CardHeader>
        <Badge className='h-12 w-12 p-0'>
          <Icon className='!size-8' />
        </Badge>
      </CardHeader>
      <CardContent>
        <CardTitle className='text-xl font-semibold capitalize md:text-2xl'>
          {service.name}
        </CardTitle>
        <p className='text-muted-foreground'>{service.description}</p>
        <p className='text-primary mt-3 text-xl font-bold md:text-2xl'>
          {toRupiah(+service.price)}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/bookings/new/${slugify(service.name, service.id)}`}
          className={cn(buttonVariants({ size: 'lg' }), 'w-full')}
        >
          Booking sekarang
        </Link>
      </CardFooter>
    </Card>
  );
};
