import { Request, Response } from 'express';
import prisma from '../config/db.js';

export async function getFees(_req: Request, res: Response): Promise<void> {
  const fees = await prisma.feeTier.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  res.json({ data: fees });
}

export async function getAllFees(_req: Request, res: Response): Promise<void> {
  const fees = await prisma.feeTier.findMany({ orderBy: { displayOrder: 'asc' } });
  res.json({ data: fees });
}

export async function createFee(req: Request, res: Response): Promise<void> {
  const fee = await prisma.feeTier.create({ data: req.body });
  res.status(201).json({ data: fee });
}

export async function updateFee(req: Request, res: Response): Promise<void> {
  const fee = await prisma.feeTier.update({ where: { id: req.params.id }, data: req.body });
  res.json({ data: fee });
}

export async function deleteFee(req: Request, res: Response): Promise<void> {
  await prisma.feeTier.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.json({ success: true });
}
