import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps an async Express route handler to automatically catch errors and pass them to next().
 * This prevents unhandled promise rejections from crashing the process.
 */
export const asyncWrapper = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
