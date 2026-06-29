import { Request, Response } from 'express';

export async function uploadImage(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const url = `/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
}
