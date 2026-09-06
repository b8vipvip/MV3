import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { assertSameOrigin, createSession, normalizeEmail, setSessionCookie, verifyPassword } from '@/lib/auth-server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const body = await request.json();
    const email = normalizeEmail(String(body.email || ''));
    const password = String(body.password || '');
    const result = await query<{ id: string; email: string; password_hash: string; display_name: string; locale: string }>('SELECT id,email,password_hash,display_name,locale FROM cn2_users WHERE email=$1', [email]);
    const row = result.rows[0];
    if (!row || !verifyPassword(password, row.password_hash)) return NextResponse.json({ error: 'INVALID_CREDENTIALS' }, { status: 401 });
    const session = await createSession(row.id, request.headers.get('user-agent'));
    const response = NextResponse.json({ user: { id: row.id, email: row.email, displayName: row.display_name, locale: row.locale } });
    setSessionCookie(response, session.token, session.expiresAt);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message === 'INVALID_ORIGIN') return NextResponse.json({ error: 'INVALID_ORIGIN' }, { status: 403 });
    if (message.includes('CN2_DATABASE_URL')) return NextResponse.json({ error: 'DATABASE_NOT_CONFIGURED' }, { status: 503 });
    console.error('login failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
