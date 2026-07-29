import { Context } from 'hono';
import prisma from '../config/db.js';

// PUBLIC: Get active programs
export async function getPrograms(c: Context) {
  const programs = await c.get('prisma').program.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  return c.json({ data: programs });
}

// ADMIN: Get all programs (including inactive)
export async function getAllPrograms(c: Context) {
  const programs = await c.get('prisma').program.findMany({
    orderBy: { displayOrder: 'asc' },
  });
  return c.json({ data: programs });
}

// ADMIN: Create program
export async function createProgram(c: Context) {
  const program = await c.get('prisma').program.create({ data: (await c.req.json()) });
  return c.json({ data: program }, 201);
}

// ADMIN: Update program
export async function updateProgram(c: Context) {
  const { id } = c.req.param();
  const program = await c.get('prisma').program.update({
    where: { id },
    data: (await c.req.json()),
  });
  return c.json({ data: program });
}

// ADMIN: Delete (soft-delete) program
export async function deleteProgram(c: Context) {
  const { id } = c.req.param();
  await c.get('prisma').program.update({
    where: { id },
    data: { isActive: false },
  });
  return c.json({ success: true });
}
