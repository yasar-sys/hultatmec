import { useSession, setResponseHeader } from '@tanstack/react-start/server';
import { createHash, timingSafeEqual } from 'node:crypto';

export function passwordMatches(input: string, expected: string) {
  return timingSafeEqual(createHash('sha256').update(input).digest(), createHash('sha256').update(expected).digest());
}
export async function adminSession() {
  const password = process.env['ADMIN_SESSION_SECRET'];
  if (!password) throw new Error('Admin session is not configured');
  setResponseHeader('Cache-Control', 'no-store');
  return useSession<{ email?: string; verifiedAt?: number }>({
    password, name: 'mec-admin', maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
  });
}
export async function requireAdmin() {
  const session = await adminSession();
  const email = process.env['ADMIN_EMAIL'];
  if (!email || session.data.email !== email || !session.data.verifiedAt || Date.now() - session.data.verifiedAt > 8 * 60 * 60 * 1000) throw new Error('Admin access required');
  return session;
}
