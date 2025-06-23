import { cn } from '@/lib/utils';
import * as React from 'react';

interface SectionContainerProps {
  centered?: boolean;
  centeredX?: boolean;
  centeredY?: boolean;
  hScreen?: boolean;
  navbarOffset?: boolean;
  padded?: boolean;
  paddedXl?: boolean;
}

export const SectionContainer = React.forwardRef<
  HTMLElement,
  SectionContainerProps & React.HTMLAttributes<HTMLElement>
>(
  (
    {
      centered,
      centeredX,
      centeredY,
      className,
      children,
      hScreen,
      navbarOffset,
      padded,
      paddedXl,
      ...props
    },
    ref,
  ) => {
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
          paddedXl && 'padded-xl',
          navbarOffset && '!pt-20',
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);

SectionContainer.displayName = 'SectionContainer';
