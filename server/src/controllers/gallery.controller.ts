import { Request, Response } from 'express';
import prisma from '../config/db.js';

export async function getGallery(req: Request, res: Response): Promise<void> {
  const { category } = req.query;
  const where: any = { isActive: true };
  if (category && category !== 'All') {
    where.category = category as string;
  }
  const items = await prisma.galleryItem.findMany({
    where,
    orderBy: { displayOrder: 'asc' },
  });
  res.json({ data: items });
}

export async function getAllGallery(_req: Request, res: Response): Promise<void> {
  const items = await prisma.galleryItem.findMany({ orderBy: { displayOrder: 'asc' } });
  res.json({ data: items });
}

export async function createGalleryItem(req: Request, res: Response): Promise<void> {
  const item = await prisma.galleryItem.create({ data: req.body });
  res.status(201).json({ data: item });
}

export async function updateGalleryItem(req: Request, res: Response): Promise<void> {
  const item = await prisma.galleryItem.update({ where: { id: req.params.id }, data: req.body });
  res.json({ data: item });
}

export async function deleteGalleryItem(req: Request, res: Response): Promise<void> {
  await prisma.galleryItem.delete({ where: { id: req.params.id } });
  res.json({ success: true });
}
