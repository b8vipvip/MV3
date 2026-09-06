import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import type { NextRequest, NextResponse } from 'next/server';
import { query } from './db';

const COOKIE = 'cn2_session';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PublicUser = { id: string; email: string; displayName: string; locale: string };

export function normalizeEmail(value: string) { return value.trim().toLowerCase(); }
export function validateEmail(value: string) { return EMAIL_RE.test(value) && value.length <= 254; }
export function validatePassword(value: string) { return value.length >= 10 && value.length <= 200; }
export function validateDisplayName(value: string) { const v = value.trim(); return v.length >= 2 && v.length <= 64; }

export function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('base64url')}$${hash.toString('base64url')}`;
}

export function verifyPassword(password: string, encoded: string) {
  const [scheme, saltText, hashText] = encoded.split('$');
  if (scheme !== 'scrypt' || !saltText || !hashText) return false;
  try {
    const expected = Buffer.from(hashText, 'base64url');
    const actual = scryptSync(password, Buffer.from(saltText, 'base64url'), expected.length);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch { return false; }
}

const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return;
  let originHost = '';
  try { originHost = new URL(origin).host; } catch { throw new Error('INVALID_ORIGIN'); }
  if (originHost !== request.nextUrl.host) throw new Error('INVALID_ORIGIN');
}

export async function createSession(userId: string, userAgent?: string | null) {
  const token = randomBytes(32).toString('base64url');
  const days = Math.max(1, Math.min(90, Number(process.env.CN2_SESSION_DAYS || 30)));
  const expiresAt = new Date(Date.now() + days * 86_400_000);
  await query('INSERT INTO cn2_sessions(id,user_id,token_hash,expires_at,user_agent) VALUES($1,$2,$3,$4,$5)', [randomUUID(), userId, tokenHash(token), expiresAt, userAgent?.slice(0, 300) || null]);
  return { token, expiresAt };
}

export function setSessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set(COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', expires: expiresAt });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', expires: new Date(0) });
}

export async function getUserFromRequest(request: NextRequest): Promise<PublicUser | null> {
  const token = request.cookies.get(COOKIE)?.value;
  if (!token) return null;
  const result = await query<{ id: string; email: string; display_name: string; locale: string }>(`SELECT u.id,u.email,u.display_name,u.locale
    FROM cn2_sessions s JOIN cn2_users u ON u.id=s.user_id
    WHERE s.token_hash=$1 AND s.expires_at>NOW()`, [tokenHash(token)]);
  if (!result.rowCount) return null;
  void query('UPDATE cn2_sessions SET last_seen_at=NOW() WHERE token_hash=$1', [tokenHash(token)]).catch(() => undefined);
  const row = result.rows[0];
  return { id: row.id, email: row.email, displayName: row.display_name, locale: row.locale };
}

export async function revokeCurrentSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value;
  if (token) await query('DELETE FROM cn2_sessions WHERE token_hash=$1', [tokenHash(token)]);
}
