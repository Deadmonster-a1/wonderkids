import { Request, Response } from 'express';
import { BaseController } from './BaseController.js';
import { ProgramService } from '../services/program.service.js';
import { ProgramRepository } from '../repositories/program.repository.js';

class ProgramController extends BaseController {
  constructor(private readonly programService: ProgramService) {
    super();
  }

  async getPrograms(_req: Request, res: Response): Promise<void> {
    const programs = await this.programService.getActivePrograms();
    this.handleSuccess(res, programs);
  }

  async getAllPrograms(_req: Request, res: Response): Promise<void> {
    const programs = await this.programService.getAllPrograms();
    this.handleSuccess(res, programs);
  }

  async createProgram(req: Request, res: Response): Promise<void> {
    const program = await this.programService.createProgram(req.body);
    this.handleSuccess(res, program, 201);
  }

  async updateProgram(req: Request, res: Response): Promise<void> {
    const program = await this.programService.updateProgram(req.params.id, req.body);
    this.handleSuccess(res, program);
  }

  async deleteProgram(req: Request, res: Response): Promise<void> {
    await this.programService.deleteProgram(req.params.id);
    this.handleSuccess(res, { success: true });
  }
}

// Dependency Injection
const programRepository = new ProgramRepository();
const programService = new ProgramService(programRepository);
const programController = new ProgramController(programService);

// Export standard functions mapped to controller instance
export const getPrograms = (req: Request, res: Response) => programController.getPrograms(req, res);
export const getAllPrograms = (req: Request, res: Response) => programController.getAllPrograms(req, res);
export const createProgram = (req: Request, res: Response) => programController.createProgram(req, res);
export const updateProgram = (req: Request, res: Response) => programController.updateProgram(req, res);
export const deleteProgram = (req: Request, res: Response) => programController.deleteProgram(req, res);
