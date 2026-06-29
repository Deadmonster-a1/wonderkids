import { Request, Response } from 'express';
import prisma from '../config/db.js';

export async function getFaqs(_req: Request, res: Response): Promise<void> {
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  res.json({ data: faqs });
}

export async function getAllFaqs(_req: Request, res: Response): Promise<void> {
  const faqs = await prisma.faq.findMany({ orderBy: { displayOrder: 'asc' } });
  res.json({ data: faqs });
}

export async function createFaq(req: Request, res: Response): Promise<void> {
  const faq = await prisma.faq.create({ data: req.body });
  res.status(201).json({ data: faq });
}

export async function updateFaq(req: Request, res: Response): Promise<void> {
  const faq = await prisma.faq.update({ where: { id: req.params.id }, data: req.body });
  res.json({ data: faq });
}

export async function deleteFaq(req: Request, res: Response): Promise<void> {
  await prisma.faq.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.json({ success: true });
}
