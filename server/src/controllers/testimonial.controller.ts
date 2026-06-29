import { Request, Response } from 'express';
import prisma from '../config/db.js';

export async function getTestimonials(_req: Request, res: Response): Promise<void> {
  const testimonials = await prisma.testimonial.findMany({
    where: { isApproved: true },
    orderBy: { displayOrder: 'asc' },
  });
  res.json({ data: testimonials });
}

export async function getAllTestimonials(_req: Request, res: Response): Promise<void> {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { displayOrder: 'asc' } });
  res.json({ data: testimonials });
}

export async function createTestimonial(req: Request, res: Response): Promise<void> {
  const testimonial = await prisma.testimonial.create({ data: req.body });
  res.status(201).json({ data: testimonial });
}

export async function updateTestimonial(req: Request, res: Response): Promise<void> {
  const testimonial = await prisma.testimonial.update({ where: { id: req.params.id }, data: req.body });
  res.json({ data: testimonial });
}

export async function deleteTestimonial(req: Request, res: Response): Promise<void> {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  res.json({ success: true });
}
