import { Context } from 'hono';
import { Env } from '../index.js';

export async function uploadImage(c: Context<Env>) {
  const body = await c.req.parseBody();
  const file = body['image'];
  
  if (!file || !(file instanceof File)) {
    return c.json({ error: 'No file uploaded' }, 400);
  }

  const kv = c.env.UPLOADS;
  if (!kv) {
    return c.json({ error: 'KV not configured' }, 500);
  }

  const filename = `${Date.now()}-${file.name}`;
  
  await kv.put(filename, await file.arrayBuffer(), {
    metadata: { contentType: file.type }
  });

  const url = `/api/public/uploads/${filename}`;
  return c.json({ url, filename });
}
