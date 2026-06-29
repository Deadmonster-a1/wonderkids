import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';
import { signToken } from '../utils/jwt.js';

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = signToken({ id: admin.id, role: admin.role });

  res.json({
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
}

export async function getMe(req: Request, res: Response): Promise<void> {
  res.json({ admin: req.admin });
}
