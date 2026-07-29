import { Context } from 'hono';
import { Env } from '../index.js';

export async function uploadImage(c: Context<Env>) {
  const body = await c.req.parseBody();
  const file = body['image'];
  
  if (!file || !(file instanceof File)) {
    return c.json({ error: 'No file uploaded' }, 400);
  }

  const bucket = c.env.UPLOAD_BUCKET;
  if (!bucket) {
    return c.json({ error: 'R2 bucket not configured' }, 500);
  }

  const filename = `${Date.now()}-${file.name}`;
  
  await bucket.put(filename, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type }
  });

  const url = `/api/public/uploads/${filename}`;
  return c.json({ url, filename });
}
