import { Context } from 'hono';
import prisma from '../config/db.js';

export async function getTestimonials(c: Context) {
  const testimonials = await c.get('prisma').testimonial.findMany({
    where: { isApproved: true },
    orderBy: { displayOrder: 'asc' },
  });
  return c.json({ data: testimonials });
}

export async function getAllTestimonials(c: Context) {
  const testimonials = await c.get('prisma').testimonial.findMany({ orderBy: { displayOrder: 'asc' } });
  return c.json({ data: testimonials });
}

export async function createTestimonial(c: Context) {
  const testimonial = await c.get('prisma').testimonial.create({ data: (await c.req.json()) });
  return c.json({ data: testimonial }, 201);
}

export async function updateTestimonial(c: Context) {
  const testimonial = await c.get('prisma').testimonial.update({ where: { id: c.req.param().id }, data: (await c.req.json()) });
  return c.json({ data: testimonial });
}

export async function deleteTestimonial(c: Context) {
  await c.get('prisma').testimonial.delete({ where: { id: c.req.param().id } });
  return c.json({ success: true });
}
