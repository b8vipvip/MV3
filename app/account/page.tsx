'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useLocale } from '@/components/LocaleProvider';

type User = { id: string; email: string; displayName: string; locale: string };

export default function AccountPage() {
  const { locale } = useLocale();
  const cn = locale === 'zh-CN';
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [status, setStatus] = useState('');
  const [databaseReady, setDatabaseReady] = useState(true);

  const refresh = async () => { const res = await fetch('/api/auth/me', { cache: 'no-store' }); const data = await res.json(); setUser(data.user || null); if (data.error === 'DATABASE_NOT_CONFIGURED') setDatabaseReady(false); };
  useEffect(() => { void refresh(); }, []);
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setStatus(''); const form = new FormData(event.currentTarget); const payload = { email: form.get('email'), password: form.get('password'), displayName: form.get('displayName'), locale }; const res = await fetch(`/api/auth/${mode}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }); const data = await res.json(); if (!res.ok) { setStatus(data.error || 'FAILED'); return; } setUser(data.user); event.currentTarget.reset(); };
  const logout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); setUser(null); };

  return <section className="shell page-section"><div className="page-hero narrow"><span className="eyebrow">CN2 IDENTITY</span><h1>{cn ? '一个账户，连接整个 CN2。' : locale === 'ja' ? '1つのアカウントで、CN2 全体へ。' : 'One account across CN2.'}</h1><p>{cn ? '当前 CN2 社区账户已经作为统一身份基础启用；后续会通过显式绑定和 OIDC 分阶段连接 GPTWork、chat2api、QNBot、FDEX 与 Aipany。' : locale === 'ja' ? 'CN2 Community アカウントを共通ID基盤として開始し、今後は明示的なリンクと OIDC で各製品へ段階的に接続します。' : 'The CN2 Community account is now the identity foundation. Products will connect in stages through explicit account linking and OIDC.'}</p></div>{!databaseReady && <div className="notice warning">{cn ? '当前部署尚未配置 CN2_DATABASE_URL。完成 PostgreSQL 配置并运行 npm run db:init 后即可启用注册、登录和论坛。' : 'This deployment has not configured CN2_DATABASE_URL yet. Configure PostgreSQL and run npm run db:init to enable accounts and the forum.'}</div>}{user ? <div className="identity-card"><div><span className="status-pill">SIGNED IN</span><h2>{user.displayName}</h2><p>{user.email}</p><button className="button secondary" onClick={logout}>{cn ? '退出登录' : 'Sign out'}</button></div><div className="identity-flow"><span>CN2 Identity</span><i>→</i><span>Community ✓</span><span>GPTWork · next</span><span>chat2api · next</span><span>QNBot · next</span><span>FDEX · next</span><span>Aipany · next</span></div></div> : <div className="auth-layout"><div className="auth-card"><div className="auth-tabs"><button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>{cn ? '登录' : 'Sign in'}</button><button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>{cn ? '注册' : 'Register'}</button></div><form onSubmit={submit}>{mode === 'register' && <label>{cn ? '显示名称' : 'Display name'}<input name="displayName" minLength={2} maxLength={64} required /></label>}<label>{cn ? '邮箱' : 'Email'}<input name="email" type="email" required autoComplete="email" /></label><label>{cn ? '密码（至少 10 位）' : 'Password (10+ characters)'}<input name="password" type="password" minLength={10} maxLength={200} required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>{status && <span className="form-error">{status}</span>}<button className="button primary" type="submit">{mode === 'login' ? (cn ? '登录 CN2' : 'Sign in to CN2') : (cn ? '创建 CN2 账户' : 'Create CN2 account')}</button></form></div><div className="auth-copy"><span className="eyebrow">ACCOUNT FOUNDATION</span><h2>{cn ? '先统一身份，再逐步统一登录。' : 'Unify identity first, then sign-in.'}</h2><p>{cn ? '不会因为邮箱相同就自动合并旧产品账号。每个已有账号都需要用户显式绑定与重新验证，避免错误合并和权限串联。' : 'Existing product accounts are never merged merely because emails match. Linking requires explicit confirmation and re-verification.'}</p></div></div>}</section>;
}
