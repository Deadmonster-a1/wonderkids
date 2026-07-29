import { z } from 'zod';

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required').max(1000),
  imageUrl: z.string().optional(),
  type: z.enum(['INFO', 'EVENT', 'ALERT', 'SUCCESS']).default('INFO'),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const updateAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200).optional(),
  content: z.string().min(1, 'Content is required').max(1000).optional(),
  imageUrl: z.string().optional(),
  type: z.enum(['INFO', 'EVENT', 'ALERT', 'SUCCESS']).optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});
