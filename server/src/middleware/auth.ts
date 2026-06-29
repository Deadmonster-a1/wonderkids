import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import prisma from '../config/db.js';

// Extend Express Request to include admin
declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    const admin = await prisma.admin.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!admin) {
      res.status(401).json({ error: 'Admin not found' });
      return;
    }

    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
