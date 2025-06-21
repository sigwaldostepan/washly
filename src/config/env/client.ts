'use client';

import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_DOMAIN_URL: z.string({ required_error: 'Missing NEXT_PUBLIC_DOMAIN_URL in env' }),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL,
});
