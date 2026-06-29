import { z } from 'zod';

export const createProgramSchema = z.object({
  title: z.string().min(1).max(100),
  gradeRange: z.string().min(1).max(50),
  iconName: z.string().default('BookOpen'),
  description: z.string().min(1).max(2000),
  themeConfig: z.string().default('{}'),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateProgramSchema = createProgramSchema.partial();
