'use client';

import { useForm } from 'react-hook-form';
import { registerSchema, RegisterSchema } from '../forms';
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
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { PasswordInput } from '@/components/ui/password-input';
import { useRegister } from '../hooks';
import { Spinner } from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const RegisterForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const { mutateAsync, isPending } = useRegister({
    onSuccess: () => {
      toast.success('Register berhasil');

      setTimeout(() => {
        router.push('/login');
      }, 500);
    },
  });

  const onSubmit = (payload: RegisterSchema) => {
    mutateAsync(payload);
  };

  const disableButton = isPending || !form.formState.isDirty;

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder='Masukkan nama kamu' {...field} />
              </FormControl>
              {!!fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription>Minimal 3 karakter</FormDescription>
              )}
            </FormItem>
          )}
        />
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
          Register <Spinner show={isPending} size='small' />
        </Button>
        <span className='text-muted-foreground mt-2'>
          Sudah punya akun?{' '}
          <Link
            href='/login'
            className='text-primary hover:text-primary/80 font-semibold transition-colors duration-300'
          >
            Login
          </Link>
        </span>
      </form>
    </Form>
  );
};
