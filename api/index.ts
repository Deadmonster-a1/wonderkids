import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from '@hono/node-server/vercel';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import { PrismaClient } from '@prisma/client';

export type Env = {
  Bindings: {
    CORS_ORIGIN: string;
    ADMIN_EMAIL: string;
    DATABASE_URL: string;
  };
  Variables: {
    prisma: PrismaClient;
    admin: any;
  };
};

const app = new Hono<Env>();

// Initialize Prisma directly (No Cloudflare workers Edge adapters needed!)
const prisma = new PrismaClient();

// Middleware
app.use('*', async (c, next) => {
  const corsMiddleware = cors({
    origin: (origin) => origin || '*',
    credentials: true,
  });
  
  if (!c.get('prisma')) {
    c.set('prisma', prisma);
  }
  
  return corsMiddleware(c, next);
});

// Routes
app.route('/api', publicRoutes);
app.route('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error', message: err.message }, 500);
});

export default handle(app);
