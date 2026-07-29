import { Context } from 'hono';
import prisma from '../config/db.js';

export async function getFees(c: Context) {
  const fees = await c.get('prisma').feeTier.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  return c.json({ data: fees });
}

export async function getAllFees(c: Context) {
  const fees = await c.get('prisma').feeTier.findMany({ orderBy: { displayOrder: 'asc' } });
  return c.json({ data: fees });
}

export async function createFee(c: Context) {
  const fee = await c.get('prisma').feeTier.create({ data: (await c.req.json()) });
  return c.json({ data: fee }, 201);
}

export async function updateFee(c: Context) {
  const fee = await c.get('prisma').feeTier.update({ where: { id: c.req.param().id }, data: (await c.req.json()) });
  return c.json({ data: fee });
}

export async function deleteFee(c: Context) {
  await c.get('prisma').feeTier.update({ where: { id: c.req.param().id }, data: { isActive: false } });
  return c.json({ success: true });
}
