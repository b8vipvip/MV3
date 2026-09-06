import { NextRequest, NextResponse } from 'next/server';
import { assertSameOrigin, getUserFromRequest } from '@/lib/auth-server';
import { query } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category');
    const values: unknown[] = [];
    let where = '';
    if (category) { values.push(category); where = `WHERE t.category_slug=$${values.length}`; }
    const result = await query(`SELECT t.id,t.category_slug,t.title,t.body,t.pinned,t.locked,t.created_at,t.updated_at,
      u.display_name AS author_name,
      (SELECT COUNT(*)::int FROM forum_replies r WHERE r.thread_id=t.id) AS reply_count
      FROM forum_threads t JOIN cn2_users u ON u.id=t.author_id ${where}
      ORDER BY t.pinned DESC,t.updated_at DESC LIMIT 60`, values);
    return NextResponse.json({ threads: result.rows });
  } catch (error) {
    if (error instanceof Error && error.message.includes('CN2_DATABASE_URL')) return NextResponse.json({ threads: [], error: 'DATABASE_NOT_CONFIGURED' }, { status: 503 });
    console.error('threads failed', error);
    return NextResponse.json({ threads: [], error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const user = await getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 });
    const body = await request.json();
    const category = String(body.category || '').trim();
    const title = String(body.title || '').trim();
    const content = String(body.body || '').trim();
    if (!category || title.length < 4 || title.length > 180 || content.length < 10 || content.length > 20_000) return NextResponse.json({ error: 'INVALID_INPUT' }, { status: 400 });
    const categoryExists = await query('SELECT 1 FROM forum_categories WHERE slug=$1', [category]);
    if (!categoryExists.rowCount) return NextResponse.json({ error: 'INVALID_CATEGORY' }, { status: 400 });
    const result = await query<{ id: string }>('INSERT INTO forum_threads(category_slug,author_id,title,body) VALUES($1,$2,$3,$4) RETURNING id', [category, user.id, title, content]);
    return NextResponse.json({ id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message === 'INVALID_ORIGIN') return NextResponse.json({ error: 'INVALID_ORIGIN' }, { status: 403 });
    if (message.includes('CN2_DATABASE_URL')) return NextResponse.json({ error: 'DATABASE_NOT_CONFIGURED' }, { status: 503 });
    console.error('thread create failed', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
