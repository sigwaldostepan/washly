import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z
    .string({ required_error: 'Nama tidak boleh kosong.' })
    .max(32, 'Nama maksimal 32 karakter')
    .min(3, 'Nama minimal 3 karakter'),
  price: z
    .number({ required_error: 'Harga tidak boleh kosong.' })
    .nonnegative('Harga tidak boleh negatif')
    .max(999999999, 'Harganya kemahalan cuy'),
  description: z
    .string({ required_error: 'Deskripsi tidak boleh kosong.' })
    .nonempty('Deskripsi tidak boleh kosong')
    .max(500, 'Deskripsi maksimal 500 karakter'),
  icon: z.string({ required_error: 'Icon tidak boleh kosong.' }),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
