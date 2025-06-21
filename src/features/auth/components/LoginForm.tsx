'use client';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../forms';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { useLogin } from '../hooks/use-login';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginFormProps {
  forAdmin?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ forAdmin }) => {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isPending } = useLogin({
    endpoint: forAdmin ? '/admin/auth/login' : '/auth/login',
    onSuccess: () => {
      toast.success('Login berhasil');

      setTimeout(() => {
        router.push(forAdmin ? '/admin' : '/');
        router.refresh();
      }, 500);
    },
  });

  const onSubmit = (payload: LoginSchema) => {
    mutateAsync(payload);
  };

  const disableButton = isPending || !form.formState.isDirty;

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Masukkan email kamu' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              {!!fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Harus memiliki setidaknya 1 angka, dan 1 huruf besar
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={disableButton}>
          Login <Spinner show={isPending} size='small' />
        </Button>
        {!forAdmin && (
          <span className='text-muted-foreground mt-1 text-sm'>
            Belum punya akun?{' '}
            <Link
              href='/register'
              className='text-primary hover:text-primary/80 font-semibold transition-colors duration-300'
            >
              Daftar
            </Link>
          </span>
        )}
      </form>
    </Form>
  );
};
