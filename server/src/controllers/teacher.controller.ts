import { Request, Response } from 'express';
import prisma from '../config/db.js';

// PUBLIC: Get active teachers
export async function getTeachers(_req: Request, res: Response): Promise<void> {
  const teachers = await prisma.teacher.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  res.json({ data: teachers });
}

// ADMIN: Get all teachers (including inactive)
export async function getAllTeachers(_req: Request, res: Response): Promise<void> {
  const teachers = await prisma.teacher.findMany({
    orderBy: { displayOrder: 'asc' },
  });
  res.json({ data: teachers });
}

// ADMIN: Create teacher
export async function createTeacher(req: Request, res: Response): Promise<void> {
  const teacher = await prisma.teacher.create({ data: req.body });
  res.status(201).json({ data: teacher });
}

// ADMIN: Update teacher
export async function updateTeacher(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const teacher = await prisma.teacher.update({
    where: { id },
    data: req.body,
  });
  res.json({ data: teacher });
}

// ADMIN: Delete (soft-delete) teacher
export async function deleteTeacher(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  await prisma.teacher.update({
    where: { id },
    data: { isActive: false },
  });
  res.json({ success: true });
}
