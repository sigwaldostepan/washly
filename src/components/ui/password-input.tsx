import * as React from 'react';
import { Input } from './input';
import { Button } from './button';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <span className='relative'>
      <Input {...props} type={showPassword ? 'text' : 'password'} ref={ref} />
      <Button
        type='button'
        size='icon'
        variant='ghost'
        className='absolute top-1/2 right-2 h-fit w-fit -translate-y-1/2 rounded-full p-2'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className='!size-3' />
        ) : (
          <Eye className='!size-3' />
        )}
      </Button>
    </span>
  );
});

PasswordInput.displayName = 'PassswordInput';
