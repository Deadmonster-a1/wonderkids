import { Context } from 'hono';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';
import { signToken } from '../utils/jwt.js';

export async function login(c: Context) {
  const { email, password } = (await c.req.json());

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return c.json({ error: 'Invalid credentials' }, 401);
    return;
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return c.json({ error: 'Invalid credentials' }, 401);
    return;
  }

  const token = await signToken({ id: admin.id, role: admin.role }, c.env.JWT_SECRET);

  return c.json({
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
}

export async function getMe(c: Context) {
  return c.json({ admin: c.get('admin') });
}
