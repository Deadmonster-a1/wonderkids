import { Context } from 'hono';
import prisma from '../config/db.js';

// PUBLIC: Get active announcements
export async function getActiveAnnouncements(c: Context) {
  const announcements = await c.get('prisma').announcement.findMany({
    where: { isActive: true },
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });
  return c.json({ data: announcements });
}

// ADMIN: Get all announcements
export async function getAllAnnouncements(c: Context) {
  const announcements = await c.get('prisma').announcement.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });
  return c.json({ data: announcements });
}

// ADMIN: Create announcement
export async function createAnnouncement(c: Context) {
  const announcement = await c.get('prisma').announcement.create({
    data: (await c.req.json()),
  });
  return c.json({ data: announcement }, 201);
}

// ADMIN: Update announcement
export async function updateAnnouncement(c: Context) {
  const { id } = c.req.param();
  const announcement = await c.get('prisma').announcement.update({
    where: { id },
    data: (await c.req.json()),
  });
  return c.json({ data: announcement });
}

// ADMIN: Delete announcement
export async function deleteAnnouncement(c: Context) {
  const { id } = c.req.param();
  await c.get('prisma').announcement.delete({
    where: { id },
  });
  return c.json({ success: true });
}
