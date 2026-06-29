import { z } from 'zod';

export const admissionSchema = z.object({
  studentName: z.string().min(1, 'Student name is required').max(100),
  parentName: z.string().min(1, 'Parent name is required').max(100),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  gradeApplying: z.string().min(1, 'Grade is required'),
  message: z.string().max(2000).optional(),
});

export type AdmissionInput = z.infer<typeof admissionSchema>;
