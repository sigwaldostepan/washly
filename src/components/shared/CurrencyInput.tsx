import { forwardRef } from 'react';
import { CurrencyInput as CurrencyInputComponent } from 'input-currency-react';
import { cn } from '@/lib/utils';

interface CurrencyInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeEvent: (
    inputElement: EventTarget & HTMLInputElement,
    maskedValue: string,
    value: string,
  ) => void;
  placeholder?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>((props, ref) => {
  return (
    <CurrencyInputComponent
      ref={ref}
      placeholder={props.placeholder}
      value={props.value.toString()}
      onChangeEvent={props.onChangeEvent}
      options={{
        allowNegative: false,
        locale: 'id-ID',
        i18nCurrency: 'IDR',
        precision: 0,
      }}
      prefix='Rp'
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 !text-left text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        props.className,
      )}
    />
  );
});

CurrencyInput.displayName = 'CurrencyInput';
