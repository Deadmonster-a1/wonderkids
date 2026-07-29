import { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt.js';
import prisma from '../config/db.js';

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'No token provided' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    const admin = await prisma.admin.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!admin) {
      return c.json({ error: 'Admin not found' }, 401);
    }

    c.set('admin', admin);
    await next();
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
}
