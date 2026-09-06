'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale } from '@/components/LocaleProvider';
import { t } from '@/lib/i18n';
import { productBySlug } from '@/lib/products';

export default function ProductSitePage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const product = productBySlug[slug];
  if (!product) return <section className="shell page-section"><h1>404</h1><Link href="/products">Back to products</Link></section>;

  return <div className="product-site"><section className="product-site-hero shell"><div><div className="product-identity"><img src={product.icon} alt="" /><span>{product.name}</span></div><span className="eyebrow">{t(product.eyebrow, locale)}</span><h1>{product.name}</h1><p>{t(product.summary, locale)}</p><div className="hero-actions"><a className="button primary" href="#capabilities">{locale === 'zh-CN' ? '了解功能' : locale === 'ja' ? '機能を見る' : 'Explore features'}</a><Link className="button secondary" href="/forum">Community</Link></div></div><div className="product-orbit"><img src={product.icon} alt="" /><span>{product.name}</span></div></section><section id="capabilities" className="shell section"><div className="section-heading"><div><span className="eyebrow">CAPABILITIES</span><h2>{locale === 'zh-CN' ? `${product.name} 能做什么` : locale === 'ja' ? `${product.name} の機能` : `What ${product.name} does`}</h2></div></div><div className="feature-grid">{product.capabilities.map((capability, index) => <article className="feature-card" key={index}><span className="index">0{index + 1}</span><h3>{t(capability, locale)}</h3><p>{t(product.detail, locale)}</p></article>)}</div></section><section className="shell product-note"><span>CN2 PRODUCT</span><p>{locale === 'zh-CN' ? '本产品由 CN2 社区推出。当前公开站点不展示项目或软件的 GitHub 来源地址。后续将接入统一 CN2 账户。' : locale === 'ja' ? '本製品は CN2 Community が提供します。現時点では公開サイトに GitHub リポジトリの出所URLを表示しません。将来 CN2 共通アカウントに接続します。' : 'This product is released by CN2 Community. The public site does not expose GitHub source repository addresses at this stage. CN2 shared identity will be integrated later.'}</p></section></div>;
}
