import { Context } from 'hono';
import { Env } from '../index.js';
import { put } from '@vercel/blob';

export async function uploadImage(c: Context<Env>) {
  const body = await c.req.parseBody();
  const file = body['image'];
  
  if (!file || !(file instanceof File)) {
    return c.json({ error: 'No file uploaded' }, 400);
  }

  const filename = `${Date.now()}-${file.name}`;
  
  try {
    const blob = await put(filename, await file.arrayBuffer(), {
      access: 'public',
      contentType: file.type,
    });

    return c.json({ url: blob.url, filename });
  } catch (error: any) {
    console.error('Blob upload error:', error);
    return c.json({ error: 'Failed to upload to Vercel Blob. Is BLOB_READ_WRITE_TOKEN set?' }, 500);
  }
}
