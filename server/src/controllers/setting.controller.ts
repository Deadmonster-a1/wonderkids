import { Request, Response } from 'express';
import prisma from '../config/db.js';

// PUBLIC: Get all settings as { key: value } map
export async function getSettings(_req: Request, res: Response): Promise<void> {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => {
    map[s.key] = s.value;
  });
  res.json({ data: map });
}

// ADMIN: Get all settings with full details
export async function getAllSettings(_req: Request, res: Response): Promise<void> {
  const settings = await prisma.siteSetting.findMany({
    orderBy: { group: 'asc' },
  });
  res.json({ data: settings });
}

// ADMIN: Bulk update settings
export async function updateSettings(req: Request, res: Response): Promise<void> {
  const updates = req.body as Array<{ key: string; value: string }>;

  await Promise.all(
    updates.map((u) =>
      prisma.siteSetting.upsert({
        where: { key: u.key },
        update: { value: u.value },
        create: { key: u.key, value: u.value, group: 'general' },
      })
    )
  );

  res.json({ success: true });
}
