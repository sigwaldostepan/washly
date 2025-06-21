import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Nama tidak boleh kosong.' })
    .max(32, 'Nama maksimal 32 karakter')
    .min(3, 'Nama minimal 3 karakter'),
  email: z
    .string({ required_error: 'Nama tidak boleh kosong.' })
    .email('Format email tidak valid')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Nama tidak boleh kosong.' })
    .min(8, 'Password minimal 8 karakter.')
    .regex(/[A-Z]/, 'Password harus memiliki huruf besar.')
    .regex(/[a-z]/, 'Password harus memiliki huruf kecil.')
    .regex(/\d/, 'Password harus memiliki angka.'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
