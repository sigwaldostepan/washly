import { PaymentMethod } from '@/generated/prisma';
import { z } from 'zod';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const createBookingSchema = z
  .object({
    customerName: z.string().nonempty('Nama gak boleh kosong'),
    customerEmail: z.string().nonempty('Nomor telepon gak boleh kosong'),
    bookingTime: z
      .date({ required_error: 'Hari & waktu gk boleh kosong' })
      .refine((date) => date >= new Date(), 'Waktunya udah lewat')
      .refine((date) => {
        const now = new Date();
        return date >= new Date(now.getTime() + 60 * 60 * 1000);
      }, 'Booking minimal 1 jam sebelumnya'),
    vehicle: z.string().nonempty('Jenis kendaraan gak boleh kosong'),
    serviceId: z.coerce
      .number({ required_error: 'Layanan gak boleh kosong' })
      .nonnegative('Layanan invalid'),
    paymentMethod: z.enum([...Object.values(PaymentMethod)] as [string, ...string[]]),
    proofImage: z
      .array(z.custom<File>())
      .max(1, 'Bukti transfer 1 aja cui')
      .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
        message: 'Bukti transfer harus kurang dari 5MB',
      })
      .refine((files) => files.every((file) => ACCEPTED_FILE_TYPES.includes(file.type)), {
        message: 'Bukti transfer harus berformat gambar',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod && data.paymentMethod !== PaymentMethod.CASH) {
      if (!data.proofImage || data.proofImage.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Bukti transfer harus diisi untuk metode pembayaran ini.',
          path: ['proofImage'],
        });
      }
    }
  });

export type CreateBookingSchema = z.infer<typeof createBookingSchema>;
