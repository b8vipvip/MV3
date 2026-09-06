import { NextRequest, NextResponse } from 'next/server';
import { assertSameOrigin, clearSessionCookie, revokeCurrentSession } from '@/lib/auth-server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try { assertSameOrigin(request); await revokeCurrentSession(request); } catch (error) { console.error('logout revoke failed', error); }
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
