import { cn } from '@/lib/utils';
import * as React from 'react';

interface SectionContainerProps {
  centered?: boolean;
  centeredX?: boolean;
  centeredY?: boolean;
  hScreen?: boolean;
  padded?: boolean;
}

export const SectionContainer = React.forwardRef<
  HTMLElement,
  SectionContainerProps & React.HTMLAttributes<HTMLElement>
>(({ centered, centeredX, centeredY, className, children, hScreen, padded, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full',
        hScreen && 'min-h-screen',
        centered
          ? 'flex items-center justify-center'
          : centeredX
            ? 'flex items-center'
            : centeredY
              ? 'flex justify-center'
              : '',
        padded && 'padded',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
});
