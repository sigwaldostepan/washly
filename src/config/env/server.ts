import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url().nonempty('Missing DATABASE_URL in env'),
  JWT_SECRET: z
    .string()
    .nonempty('Missing JWT_SECRET in env')
    .min(32, 'JWT secret should be at least 32 character'),
  JWT_MAX_AGE: z
    .string()
    .transform((val) => +val)
    .refine((val) => val > 0, 'JWT_MAX_AGE should be positive'),
  JWT_COOKIE_NAME: z.string().nonempty('Missing DATABASE_URL in env'),
});

export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_MAX_AGE: process.env.JWT_MAX_AGE,
  JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME,
});
