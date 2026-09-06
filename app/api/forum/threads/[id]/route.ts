import { NextRequest, NextResponse } from 'next/server';
import { assertSameOrigin, getUserFromRequest } from '@/lib/auth-server';
import { query } from '@/lib/db';

export const runtime = 'nodejs';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    const threadResult = await query(`SELECT t.id,t.category_slug,t.title,t.body,t.pinned,t.locked,t.created_at,t.updated_at,u.display_name AS author_name
      FROM forum_threads t JOIN cn2_users u ON u.id=t.author_id WHERE t.id=$1`, [id]);
    if (!threadResult.rowCount) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    const replyResult = await query(`SELECT r.id,r.body,r.created_at,r.updated_at,u.display_name AS author_name
      FROM forum_replies r JOIN cn2_users u ON u.id=r.author_id WHERE r.thread_id=$1 ORDER BY r.created_at ASC`, [id]);
    return NextResponse.json({ thread: threadResult.rows[0], replies: replyResult.rows });
  } catch (error) {
    if (error instanceof Error && error.message.includes('CN2_DATABASE_URL')) return NextResponse.json({ error: 'DATABASE_NOT_CONFIGURED' }, { status: 503 });
    console.error('thread detail failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: Context) {
  try {
    assertSameOrigin(request);
    const user = await getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 });
    const { id } = await context.params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    const body = await request.json();
    const content = String(body.body || '').trim();
    if (content.length < 2 || content.length > 20_000) return NextResponse.json({ error: 'INVALID_INPUT' }, { status: 400 });
    const thread = await query<{ locked: boolean }>('SELECT locked FROM forum_threads WHERE id=$1', [id]);
    if (!thread.rowCount) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    if (thread.rows[0].locked) return NextResponse.json({ error: 'THREAD_LOCKED' }, { status: 423 });
    const result = await query<{ id: string }>('INSERT INTO forum_replies(thread_id,author_id,body) VALUES($1,$2,$3) RETURNING id', [id, user.id, content]);
    await query('UPDATE forum_threads SET updated_at=NOW() WHERE id=$1', [id]);
    return NextResponse.json({ id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message === 'INVALID_ORIGIN') return NextResponse.json({ error: 'INVALID_ORIGIN' }, { status: 403 });
    if (message.includes('CN2_DATABASE_URL')) return NextResponse.json({ error: 'DATABASE_NOT_CONFIGURED' }, { status: 503 });
    console.error('reply create failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
