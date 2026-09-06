import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { assertSameOrigin, createSession, hashPassword, normalizeEmail, setSessionCookie, validateDisplayName, validateEmail, validatePassword } from '@/lib/auth-server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const body = await request.json();
    const email = normalizeEmail(String(body.email || ''));
    const password = String(body.password || '');
    const displayName = String(body.displayName || '').trim();
    const locale = ['zh-CN','en','ja'].includes(body.locale) ? body.locale : 'zh-CN';
    if (!validateEmail(email) || !validatePassword(password) || !validateDisplayName(displayName)) return NextResponse.json({ error: 'INVALID_INPUT' }, { status: 400 });
    const id = randomUUID();
    await query('INSERT INTO cn2_users(id,email,password_hash,display_name,locale) VALUES($1,$2,$3,$4,$5)', [id, email, hashPassword(password), displayName, locale]);
    const session = await createSession(id, request.headers.get('user-agent'));
    const response = NextResponse.json({ user: { id, email, displayName, locale } }, { status: 201 });
    setSessionCookie(response, session.token, session.expiresAt);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message === 'INVALID_ORIGIN') return NextResponse.json({ error: 'INVALID_ORIGIN' }, { status: 403 });
    if ((error as { code?: string })?.code === '23505') return NextResponse.json({ error: 'EMAIL_EXISTS' }, { status: 409 });
    if (message.includes('CN2_DATABASE_URL')) return NextResponse.json({ error: 'DATABASE_NOT_CONFIGURED' }, { status: 503 });
    console.error('register failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
