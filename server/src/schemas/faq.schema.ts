import { z } from 'zod';

export const createFaqSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateFaqSchema = createFaqSchema.partial();
