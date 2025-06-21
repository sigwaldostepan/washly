import { z } from 'zod';
import { registerSchema } from './register-form';

export const loginSchema = registerSchema.pick({ email: true, password: true });

export type LoginSchema = z.infer<typeof loginSchema>;
