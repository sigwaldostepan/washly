import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CurrencyInput, IconPicker } from '@/components/shared';
import { useFormContext } from 'react-hook-form';
import { CreateServiceSchema } from '../forms';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useDisclosure } from '@/hooks';

export const ServiceForm: React.FC<{ onSubmit: (data: CreateServiceSchema) => void }> = ({
  onSubmit,
}) => {
  const form = useFormContext<CreateServiceSchema>();
  const iconPickerDisclosure = useDisclosure();

  return (
    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama</FormLabel>
            <FormControl>
              <Input placeholder='Masukkan nama layanan' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='price'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Harga</FormLabel>
            <FormControl>
              <CurrencyInput
                placeholder='Masukkan harga layanan'
                {...field}
                onChangeEvent={(_, __, value) => field.onChange(+value)}
                value={field.value.toString()}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='description'
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Deskripsi</FormLabel>
            <FormControl>
              <Textarea
                className='resize-none'
                placeholder='Masukkan deskripsi layanan'
                {...field}
              />
            </FormControl>
            {fieldState.error ? (
              <FormMessage />
            ) : (
              <FormDescription>Maksimal 500 karakter</FormDescription>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='icon'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <FormControl>
              <IconPicker
                buttonClassName='w-full flex items-center justify-start'
                onChange={field.onChange}
                defaultValue={field.value}
                isOpen={iconPickerDisclosure.isOpen}
                setIsOpen={iconPickerDisclosure.setIsOpen}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className='mt-2 w-full' type='submit'>
        Simpan
      </Button>
    </form>
  );
};
