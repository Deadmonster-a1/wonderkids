import { Context, Next } from 'hono';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema) {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      schema.parse(body);
      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return c.json({ error: 'Validation failed', details: formattedErrors }, 400);
      }
      throw error;
    }
  };
}
