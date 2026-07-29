import { z } from 'zod';

export const createTeacherSchema = z.object({
  name: z.string().min(1).max(100),
  title: z.string().min(1).max(100),
  specialization: z.string().min(1).max(200),
  experience: z.string().min(1).max(50),
  bio: z.string().min(1).max(1000),
  avatarUrl: z.string().url().optional().nullable(),
  iconName: z.string().default('Heart'),
  colorTheme: z.string().default('primary'),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateTeacherSchema = createTeacherSchema.partial();

export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;
