import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from './config/env.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

export type Env = {
  Bindings: {
    CORS_ORIGIN: string;
    ADMIN_EMAIL: string;
    UPLOAD_BUCKET: R2Bucket;
  };
};

const app = new Hono<Env>();

// Middleware
app.use('*', cors({ origin: env.CORS_ORIGIN, credentials: true }));

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

export default app;
