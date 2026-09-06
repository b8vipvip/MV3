import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth-server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try { return NextResponse.json({ user: await getUserFromRequest(request) }); }
  catch (error) {
    if (error instanceof Error && error.message.includes('CN2_DATABASE_URL')) return NextResponse.json({ user: null, error: 'DATABASE_NOT_CONFIGURED' }, { status: 503 });
    console.error('me failed', error);
    return NextResponse.json({ user: null, error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
