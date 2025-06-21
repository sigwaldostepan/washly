import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <div className='relative flex-1'>
      <Search className='absolute top-1/2 left-2 !size-3 -translate-y-1/2 md:!size-4' />
      <Input ref={ref} {...props} className={cn(props.className, 'pl-8')} />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
