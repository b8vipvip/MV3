'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useLocale } from '@/components/LocaleProvider';

type Thread = { id: string; category_slug: string; title: string; body: string; author_name: string; created_at: string; locked: boolean };
type Reply = { id: string; body: string; author_name: string; created_at: string };

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const { locale } = useLocale();
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const load = async () => { const res = await fetch(`/api/forum/threads/${id}`, { cache: 'no-store' }); const data = await res.json(); if (res.ok) { setThread(data.thread); setReplies(data.replies); } else setError(data.error || 'LOAD_FAILED'); };
  useEffect(() => { void load(); }, [id]);
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); const res = await fetch(`/api/forum/threads/${id}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ body: reply }) }); const data = await res.json(); if (!res.ok) { setError(data.error || 'REPLY_FAILED'); return; } setReply(''); await load(); };
  if (!thread) return <section className="shell page-section"><Link href="/forum">← CN2 Forum</Link><p className="muted-block">{error || (locale === 'zh-CN' ? '正在加载…' : 'Loading…')}</p></section>;
  return <section className="shell page-section"><Link className="back-link" href="/forum">← CN2 Forum</Link><article className="thread-detail"><span className="eyebrow">{thread.category_slug}</span><h1>{thread.title}</h1><div className="thread-meta">{thread.author_name} · {new Date(thread.created_at).toLocaleString()}</div><div className="thread-body">{thread.body}</div></article><div className="reply-list">{replies.map((item) => <article key={item.id}><div><b>{item.author_name}</b><span>{new Date(item.created_at).toLocaleString()}</span></div><p>{item.body}</p></article>)}</div>{!thread.locked && <form className="reply-form" onSubmit={submit}><h2>{locale === 'zh-CN' ? '参与讨论' : locale === 'ja' ? 'ディスカッションに参加' : 'Join the discussion'}</h2><textarea value={reply} onChange={(event) => setReply(event.target.value)} minLength={2} maxLength={20000} required placeholder={locale === 'zh-CN' ? '写下你的回复…' : 'Write a reply…'} /><div>{error && <span className="form-error">{error}</span>}<button className="button primary" type="submit">{locale === 'zh-CN' ? '回复' : 'Reply'}</button></div></form>}</section>;
}
