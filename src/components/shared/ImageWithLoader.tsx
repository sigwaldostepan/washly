'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Skeleton } from '../ui/skeleton';

interface ImageWithLoaderProps {
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  src: string;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  containerClassName,
  imageClassName,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={cn('relative', containerClassName)}>
      <Image
        alt={alt}
        src={src}
        className={cn(
          isLoaded ? 'opacity-100' : 'opacity-0',
          'transition-all duration-300',
          imageClassName,
        )}
        onLoadingComplete={() => setIsLoaded(true)}
        fill
      />
      {!isLoaded && <Skeleton className='h-full w-full' />}
    </div>
  );
};
