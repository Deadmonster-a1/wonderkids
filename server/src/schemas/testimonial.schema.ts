import { z } from 'zod';

export const createTestimonialSchema = z.object({
  parentName: z.string().min(1).max(100),
  roleDesc: z.string().min(1).max(200),
  content: z.string().min(1).max(2000),
  imageUrl: z.string().url().optional().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  isApproved: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();
