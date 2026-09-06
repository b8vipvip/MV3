'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, type Locale } from './LocaleProvider';
import { t, ui } from '@/lib/i18n';
import { productBySlug } from '@/lib/products';

const locales: Array<{ value: Locale; label: string }> = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const productSlug = pathname.match(/^\/products\/([^/]+)/)?.[1];
  const product = productSlug ? productBySlug[productSlug] : undefined;
  const links = [['/', t(ui.home, locale)], ['/products', t(ui.products, locale)], ['/forum', t(ui.forum, locale)], ['/docs', t(ui.docs, locale)], ['/labs', t(ui.labs, locale)], ['/status', t(ui.status, locale)]];
  const language = <select className="language-select" value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label="Language">{locales.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>;
  const communityLabel = locale === 'zh-CN' ? '社区' : locale === 'ja' ? 'コミュニティ' : 'Community';
  const footerLine = locale === 'zh-CN' ? '公共站点暂不展示产品源码仓库地址。' : locale === 'ja' ? '公開サイトでは製品ソースリポジトリのURLを表示していません。' : 'Product source repository addresses are not displayed on the public site.';

  return <div className="site-frame">
    {product ? <header className="topbar product-topbar"><Link className="product-brand" href={`/products/${product.slug}`}><img src={product.icon} alt="" /><strong>{product.name}</strong></Link><nav className="main-nav"><a href="#capabilities">{locale === 'zh-CN' ? '功能' : locale === 'ja' ? '機能' : 'Features'}</a><Link href="/docs">{t(ui.docs, locale)}</Link><Link href="/forum">{communityLabel}</Link></nav><div className="top-actions">{language}<Link className="cn2-badge" href="/">码位3 ↗</Link></div></header> : <header className="topbar"><Link className="brand" href="/" aria-label="码位3 · MV3 Community"><img src="/brand/mv3-mark.svg" alt="" width="34" height="34" /><span>码位3</span><em>MV3.CN</em></Link><nav className="main-nav" aria-label="Main navigation">{links.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? 'active' : ''}>{label}</Link>)}</nav><div className="top-actions">{language}<Link className="button small secondary" href="/account">{t(ui.account, locale)}</Link></div></header>}
    <main>{children}</main>
    <footer className="footer"><div><strong>{product ? product.name : '码位3'}</strong><span>{product ? (locale === 'zh-CN' ? '码位3 产品' : locale === 'ja' ? 'MV3 製品' : 'An MV3 product') : (locale === 'zh-CN' ? '做有用的东西，分享真正有效的方法。' : locale === 'ja' ? '役立つものを作り、うまくいく方法を共有する。' : 'Build useful things. Share what works.')}</span></div><div className="footer-links"><Link href="/products">{t(ui.products, locale)}</Link><Link href="/forum">{t(ui.forum, locale)}</Link><Link href="/trust">Trust</Link><Link href="/status">{t(ui.status, locale)}</Link></div><small>© 2026 码位3 · MV3.CN. {footerLine}</small></footer>
  </div>;
}
