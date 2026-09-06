'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocale } from '@/components/LocaleProvider';

type Category = { slug: string; name_zh: string; name_en: string; name_ja: string; description_zh: string; description_en: string; description_ja: string; thread_count: number };
type Thread = { id: string; category_slug: string; title: string; body: string; author_name: string; reply_count: number; created_at: string; pinned: boolean };

export default function ForumPage() {
  const { locale } = useLocale();
  const cn = locale === 'zh-CN';
  const [categories, setCategories] = useState<Category[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState('');
  const [compose, setCompose] = useState(false);
  const [error, setError] = useState('');
  const [backendReady, setBackendReady] = useState(true);
  const nameKey = useMemo(() => locale === 'zh-CN' ? 'name_zh' : locale === 'ja' ? 'name_ja' : 'name_en', [locale]);
  const descKey = useMemo(() => locale === 'zh-CN' ? 'description_zh' : locale === 'ja' ? 'description_ja' : 'description_en', [locale]);

  const load = async () => {
    const [categoryRes, threadRes] = await Promise.all([fetch('/api/forum/categories', { cache: 'no-store' }), fetch(`/api/forum/threads${selected ? `?category=${encodeURIComponent(selected)}` : ''}`, { cache: 'no-store' })]);
    const categoryData = await categoryRes.json(); const threadData = await threadRes.json();
    if (categoryData.error === 'DATABASE_NOT_CONFIGURED' || threadData.error === 'DATABASE_NOT_CONFIGURED') setBackendReady(false);
    setCategories(categoryData.categories || []); setThreads(threadData.threads || []);
  };
  useEffect(() => { void load(); }, [selected]);
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setError(''); const form = new FormData(event.currentTarget); const res = await fetch('/api/forum/threads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ category: form.get('category'), title: form.get('title'), body: form.get('body') }) }); const data = await res.json(); if (!res.ok) { setError(data.error || 'CREATE_FAILED'); if (res.status === 401) setError(cn ? '请先登录 CN2 账户。' : 'Sign in to your CN2 account first.'); return; } setCompose(false); event.currentTarget.reset(); await load(); };

  return <section className="shell page-section"><div className="forum-hero"><div><span className="eyebrow">CN2 FORUM</span><h1>{cn ? '技术问题，值得被认真讨论。' : locale === 'ja' ? '技術課題を、きちんと議論する。' : 'Technical problems deserve serious discussion.'}</h1><p>{cn ? '分享复现过程、架构取舍、踩坑经验和真正解决问题的方法。' : locale === 'ja' ? '再現手順、設計のトレードオフ、失敗からの知見、実際に問題を解く方法を共有します。' : 'Share reproductions, architecture trade-offs, lessons from failures and methods that actually solve problems.'}</p></div><div className="hero-actions"><button className="button primary" onClick={() => setCompose(!compose)}>{cn ? '发布主题' : locale === 'ja' ? 'トピックを投稿' : 'New topic'}</button><Link className="button secondary" href="/account">{cn ? '账户' : 'Account'}</Link></div></div>{!backendReady && <div className="notice warning">{cn ? '论坛代码已完成，但当前部署尚未连接 PostgreSQL。配置 CN2_DATABASE_URL 并执行 npm run db:init 后即可持久化发帖与回复。' : 'Forum code is ready, but this deployment has not connected PostgreSQL yet. Configure CN2_DATABASE_URL and run npm run db:init.'}</div>}{compose && <form className="compose-card" onSubmit={submit}><div className="compose-head"><h2>{cn ? '发布新主题' : 'Create topic'}</h2><button type="button" onClick={() => setCompose(false)}>×</button></div><label>{cn ? '版块' : 'Category'}<select name="category" required defaultValue={selected || categories[0]?.slug || ''}>{categories.map((category) => <option value={category.slug} key={category.slug}>{String(category[nameKey])}</option>)}</select></label><label>{cn ? '标题' : 'Title'}<input name="title" minLength={4} maxLength={180} required /></label><label>{cn ? '正文' : 'Body'}<textarea name="body" minLength={10} maxLength={20000} required /></label>{error && <span className="form-error">{error}</span>}<button className="button primary" type="submit">{cn ? '发布' : 'Publish'}</button></form>}<div className="forum-layout"><div className="category-panel"><h2>{cn ? '版块' : locale === 'ja' ? 'カテゴリ' : 'Categories'}</h2><button className={!selected ? 'category-button active' : 'category-button'} onClick={() => setSelected('')}><div><b>{cn ? '全部讨论' : locale === 'ja' ? 'すべて' : 'All discussions'}</b><span>{cn ? '查看所有最新主题' : 'All latest topics'}</span></div></button>{categories.map((category) => <button className={selected === category.slug ? 'category-button active' : 'category-button'} onClick={() => setSelected(category.slug)} key={category.slug}><div><b>{String(category[nameKey])}</b><span>{String(category[descKey])}</span></div><em>{category.thread_count}</em></button>)}</div><div className="thread-panel"><div className="thread-header"><h2>{cn ? '最新讨论' : locale === 'ja' ? '最新の議論' : 'Latest discussions'}</h2><span>{threads.length}</span></div>{threads.length ? threads.map((thread) => <Link className="thread" href={`/forum/${thread.id}`} key={thread.id}><span className="thread-tag">{thread.pinned ? (cn ? '置顶' : 'PIN') : thread.category_slug}</span><div><h3>{thread.title}</h3><p>{thread.author_name} · {thread.reply_count} {cn ? '回复' : 'replies'} · {new Date(thread.created_at).toLocaleString()}</p></div><span className="thread-arrow">→</span></Link>) : <div className="empty-state"><b>{cn ? '这里还没有主题。' : 'No topics yet.'}</b><span>{cn ? '登录后发布第一条讨论。' : 'Sign in and start the first discussion.'}</span></div>}</div></div></section>;
}
