import { Context } from 'hono';
import prisma from '../config/db.js';

export async function getGallery(c: Context) {
  const { category } = req.query;
  const where: any = { isActive: true };
  if (category && category !== 'All') {
    where.category = category as string;
  }
  const items = await prisma.galleryItem.findMany({
    where,
    orderBy: { displayOrder: 'asc' },
  });
  return c.json({ data: items });
}

export async function getAllGallery(c: Context) {
  const items = await prisma.galleryItem.findMany({ orderBy: { displayOrder: 'asc' } });
  return c.json({ data: items });
}

export async function createGalleryItem(c: Context) {
  const item = await prisma.galleryItem.create({ data: (await c.req.json()) });
  return c.json({ data: item }, 201);
}

export async function updateGalleryItem(c: Context) {
  const item = await prisma.galleryItem.update({ where: { id: c.req.param().id }, data: (await c.req.json()) });
  return c.json({ data: item });
}

export async function deleteGalleryItem(c: Context) {
  await prisma.galleryItem.delete({ where: { id: c.req.param().id } });
  return c.json({ success: true });
}
