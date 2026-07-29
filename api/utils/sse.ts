import { Context } from 'hono';
import { streamSSE } from 'hono/streaming';

let clients: Set<any> = new Set();

export function addSSEClient(c: Context) {
  return streamSSE(c, async (stream) => {
    clients.add(stream);

    stream.onAbort(() => {
      clients.delete(stream);
    });

    // Keep connection alive
    while (true) {
      await stream.sleep(30000);
      try {
        await stream.writeSSE({ event: 'ping', data: 'ping' });
      } catch {
        break;
      }
    }
  });
}

export function broadcastSSE(event: string, data: any) {
  for (const stream of clients) {
    stream.writeSSE({ event, data: JSON.stringify(data) }).catch(() => {
      clients.delete(stream);
    });
  }
}
