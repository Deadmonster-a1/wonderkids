import { Hono } from 'hono';
import { cors } from 'hono/cors';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

export type Env = {
  Bindings: {
    CORS_ORIGIN: string;
    ADMIN_EMAIL: string;
    UPLOADS: KVNamespace;
  };
};

const app = new Hono<Env>();

// Middleware
app.use('*', async (c, next) => {
  const origin = c.env.CORS_ORIGIN || '*';
  const corsMiddleware = cors({ origin, credentials: true });
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

export default app;
