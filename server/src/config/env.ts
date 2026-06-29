import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const envSchema = z.object({
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().default('wonderkids-dev-secret-change-in-production'),
  JWT_EXPIRES_IN: z.string().default('24h'),
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.string().default('587'),
  SMTP_USER: z.string().default(''),
  SMTP_PASS: z.string().default(''),
  ADMIN_EMAIL: z.string().default('admin@wonderkids.com'),
  ADMIN_PASSWORD: z.string().default('admin123'),
  PORT: z.string().default('4000'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
