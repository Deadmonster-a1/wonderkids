import { z } from 'zod';

export const createFeeSchema = z.object({
  tierName: z.string().min(1).max(100),
  grades: z.string().min(1).max(100),
  monthlyFee: z.number().int().positive(),
  annualFee: z.number().int().positive(),
  isPopular: z.boolean().default(false),
  borderColor: z.string().default('border-brand-indigo'),
  bgColor: z.string().default('bg-brand-indigo'),
  features: z.string().default('[]'),
  displayOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateFeeSchema = createFeeSchema.partial();
