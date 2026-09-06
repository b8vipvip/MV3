'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, type Locale } from './LocaleProvider';
import { t, ui } from '@/lib/i18n';

const locales: Array<{ value: Locale; label: string }> = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const links = [
    ['/', t(ui.home, locale)],
    ['/products', t(ui.products, locale)],
    ['/forum', t(ui.forum, locale)],
    ['/docs', t(ui.docs, locale)],
    ['/labs', t(ui.labs, locale)],
    ['/status', t(ui.status, locale)],
  ];

  return (
    <div className="site-frame">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="CN2 Community">
          <img src="/brand/cn2-mark.svg" alt="" width="34" height="34" />
          <span>CN2</span><em>community</em>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? 'active' : ''}>{label}</Link>)}
        </nav>
        <div className="top-actions">
          <select className="language-select" value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label="Language">
            {locales.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <Link className="button small secondary" href="/account">{t(ui.account, locale)}</Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div><strong>CN2</strong><span>Build useful things. Share what works.</span></div>
        <div className="footer-links"><Link href="/products">Products</Link><Link href="/forum">Forum</Link><Link href="/trust">Trust</Link><Link href="/status">Status</Link></div>
        <small>© 2026 CN2 Community. Product source repository addresses are not displayed on the public site.</small>
      </footer>
    </div>
  );
}
