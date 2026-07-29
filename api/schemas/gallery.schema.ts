import { z } from 'zod';

export const createGallerySchema = z.object({
  imageUrl: z.string().min(1),
  altText: z.string().min(1).max(200),
  category: z.enum(['Campus', 'Activities', 'Events', 'Sports']),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateGallerySchema = createGallerySchema.partial();
