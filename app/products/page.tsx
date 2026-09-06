'use client';

import Link from 'next/link';
import { useLocale } from '@/components/LocaleProvider';
import { t } from '@/lib/i18n';
import { products } from '@/lib/products';

export default function ProductsPage() {
  const { locale } = useLocale();
  return <section className="shell page-section"><div className="page-hero"><span className="eyebrow">CN2 PRODUCTS</span><h1>{locale === 'zh-CN' ? '产品中心' : locale === 'ja' ? 'プロダクト' : 'Products'}</h1><p>{locale === 'zh-CN' ? '每个产品拥有自己的独立站点、定位与用户体验，同时逐步共享 CN2 账户、安全与社区基础设施。' : locale === 'ja' ? '各製品は独立したサイトと体験を持ちつつ、CN2 のアカウント・セキュリティ・コミュニティ基盤を段階的に共有します。' : 'Each product keeps its own site and experience while gradually sharing CN2 identity, security and community infrastructure.'}</p></div><div className="catalog-grid">{products.map((product) => <Link className="catalog-card" href={`/products/${product.slug}`} key={product.slug}><div className="catalog-icon"><img src={product.icon} alt="" /></div><div><span className="eyebrow">{t(product.eyebrow, locale)}</span><h2>{product.name}</h2><p>{t(product.summary, locale)}</p><div className="tag-row">{product.capabilities.map((capability, index) => <span key={index}>{t(capability, locale)}</span>)}</div><b>进入 {product.name} →</b></div></Link>)}</div></section>;
}
