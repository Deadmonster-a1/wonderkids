import { sign, verify } from 'hono/jwt';

interface TokenPayload {
  id: string;
  role: string;
  exp?: number;
}

export async function signToken(payload: TokenPayload, secret: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24; // 24 hours
  return sign({ ...payload, exp }, secret);
}

export async function verifyToken(token: string, secret: string): Promise<TokenPayload> {
  return verify(token, secret) as Promise<TokenPayload>;
}
