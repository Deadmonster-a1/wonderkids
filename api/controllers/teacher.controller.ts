import { Context } from 'hono';
import prisma from '../config/db.js';

// PUBLIC: Get active teachers
export async function getTeachers(c: Context) {
  const teachers = await c.get('prisma').teacher.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  return c.json({ data: teachers });
}

// ADMIN: Get all teachers (including inactive)
export async function getAllTeachers(c: Context) {
  const teachers = await c.get('prisma').teacher.findMany({
    orderBy: { displayOrder: 'asc' },
  });
  return c.json({ data: teachers });
}

// ADMIN: Create teacher
export async function createTeacher(c: Context) {
  const teacher = await c.get('prisma').teacher.create({ data: (await c.req.json()) });
  return c.json({ data: teacher }, 201);
}

// ADMIN: Update teacher
export async function updateTeacher(c: Context) {
  const { id } = c.req.param();
  const teacher = await c.get('prisma').teacher.update({
    where: { id },
    data: (await c.req.json()),
  });
  return c.json({ data: teacher });
}

// ADMIN: Delete (soft-delete) teacher
export async function deleteTeacher(c: Context) {
  const { id } = c.req.param();
  await c.get('prisma').teacher.update({
    where: { id },
    data: { isActive: false },
  });
  return c.json({ success: true });
}
