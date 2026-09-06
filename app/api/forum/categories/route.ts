import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const result = await query(`SELECT c.*,(SELECT COUNT(*)::int FROM forum_threads t WHERE t.category_slug=c.slug) AS thread_count FROM forum_categories c ORDER BY c.sort_order,c.slug`);
    return NextResponse.json({ categories: result.rows });
  } catch (error) {
    if (error instanceof Error && error.message.includes('CN2_DATABASE_URL')) return NextResponse.json({ categories: [], error: 'DATABASE_NOT_CONFIGURED' }, { status: 503 });
    console.error('categories failed', error);
    return NextResponse.json({ categories: [], error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
