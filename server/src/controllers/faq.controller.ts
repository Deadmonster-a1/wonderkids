import { Context } from 'hono';
import prisma from '../config/db.js';

export async function getFaqs(c: Context) {
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  return c.json({ data: faqs });
}

export async function getAllFaqs(c: Context) {
  const faqs = await prisma.faq.findMany({ orderBy: { displayOrder: 'asc' } });
  return c.json({ data: faqs });
}

export async function createFaq(c: Context) {
  const faq = await prisma.faq.create({ data: (await c.req.json()) });
  return c.json({ data: faq }, 201);
}

export async function updateFaq(c: Context) {
  const faq = await prisma.faq.update({ where: { id: c.req.param().id }, data: (await c.req.json()) });
  return c.json({ data: faq });
}

export async function deleteFaq(c: Context) {
  await prisma.faq.update({ where: { id: c.req.param().id }, data: { isActive: false } });
  return c.json({ success: true });
}
