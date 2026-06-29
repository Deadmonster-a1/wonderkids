import { PrismaClient, Program } from '@prisma/client';
import prisma from '../config/db.js';

export class ProgramRepository {
  async findActivePrograms(): Promise<Program[]> {
    return prisma.program.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findAllPrograms(): Promise<Program[]> {
    return prisma.program.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  async createProgram(data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<Program> {
    return prisma.program.create({
      data: data as any,
    });
  }

  async updateProgram(id: string, data: Partial<Program>): Promise<Program> {
    return prisma.program.update({
      where: { id },
      data: data as any,
    });
  }

  async deactivateProgram(id: string): Promise<Program> {
    return prisma.program.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
