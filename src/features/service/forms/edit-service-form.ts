import { z } from 'zod';
import { createServiceSchema } from './create-service-form';

export const editServiceSchema = createServiceSchema.partial();

export type EditServiceSchema = z.infer<typeof editServiceSchema>;
