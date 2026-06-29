import { Response } from 'express';

export class BaseController {
  protected handleSuccess(res: Response, data: any, statusCode = 200): void {
    if (data !== undefined && data !== null) {
      // If the data already has a 'data' property (legacy format), unwrap it or just return it.
      // But standard is { data: [...] }
      res.status(statusCode).json({ data });
    } else {
      res.status(statusCode).json({ success: true });
    }
  }

  protected handleError(error: unknown, res: Response, context: string): void {
    console.error(`[BaseController] Error in ${context}:`, error);
    
    // In a real app with Sentry: Sentry.captureException(error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
}
