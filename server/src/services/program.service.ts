import { ProgramRepository } from '../repositories/program.repository.js';
import { Program } from '@prisma/client';

export class ProgramService {
  constructor(private readonly programRepository: ProgramRepository) {}

  async getActivePrograms(): Promise<Program[]> {
    return this.programRepository.findActivePrograms();
  }

  async getAllPrograms(): Promise<Program[]> {
    return this.programRepository.findAllPrograms();
  }

  async createProgram(data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<Program> {
    return this.programRepository.createProgram(data);
  }

  async updateProgram(id: string, data: Partial<Program>): Promise<Program> {
    return this.programRepository.updateProgram(id, data);
  }

  async deleteProgram(id: string): Promise<void> {
    await this.programRepository.deactivateProgram(id);
  }
}
