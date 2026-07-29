import { Context } from 'hono';
import prisma from '../config/db.js';

// PUBLIC: Get all settings as { key: value } map
export async function getSettings(c: Context) {
  const settings = await c.get('prisma').siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => {
    map[s.key] = s.value;
  });
  return c.json({ data: map });
}

// ADMIN: Get all settings with full details
export async function getAllSettings(c: Context) {
  const settings = await c.get('prisma').siteSetting.findMany({
    orderBy: { group: 'asc' },
  });
  return c.json({ data: settings });
}

// ADMIN: Bulk update settings
export async function updateSettings(c: Context) {
  const updates = (await c.req.json()) as Array<{ key: string; value: string }>;

  await Promise.all(
    updates.map((u) =>
      c.get('prisma').siteSetting.upsert({
        where: { key: u.key },
        update: { value: u.value },
        create: { key: u.key, value: u.value, group: 'general' },
      })
    )
  );

  return c.json({ success: true });
}
