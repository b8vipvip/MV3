'use client';

import Link from 'next/link';
import { products } from '@/lib/products';
import { t, ui } from '@/lib/i18n';
import { useLocale } from '@/components/LocaleProvider';

const copy = {
  kicker: { 'zh-CN': '技术社区 · 软件产品 · 工程实践', en: 'Community · Products · Engineering', ja: 'コミュニティ · 製品 · エンジニアリング' },
  title: { 'zh-CN': '让好用的技术，成为可以一起讨论、改进和长期使用的产品。', en: 'Turn useful technology into products people can discuss, improve and rely on.', ja: '役立つ技術を、共に議論し、改善し、長く使える製品へ。' },
  lead: { 'zh-CN': 'CN2 是开发者、AI 工程师、运维人员与技术爱好者的社区，也是 GPTWork、chat2api、QNBot、FDEX、Aipany 等软件与服务的统一入口。', en: 'CN2 is a community for developers, AI engineers, operators and technology enthusiasts — and the shared home of GPTWork, chat2api, QNBot, FDEX and Aipany.', ja: 'CN2 は開発者、AI エンジニア、運用担当者、技術愛好家のためのコミュニティであり、GPTWork、chat2api、QNBot、FDEX、Aipany の共通ホームです。' },
};

export default function HomePage() {
  const { locale } = useLocale();
  const cn = locale === 'zh-CN'; const ja = locale === 'ja';
  const topics = [
    ['AI & Agents', cn ? '模型、Agent、推理、工具与工作流' : ja ? 'モデル、Agent、推論、ツール、ワークフロー' : 'Models, agents, reasoning, tools and workflows'],
    ['Infra & Network', cn ? 'Linux、云服务器、网络、容器与可观测性' : ja ? 'Linux、クラウド、ネットワーク、コンテナ、可観測性' : 'Linux, cloud, networking, containers and observability'],
    ['Dev & Automation', cn ? '代码、API、自动化、桌面与浏览器工程' : ja ? 'コード、API、自動化、デスクトップ、ブラウザ技術' : 'Code, APIs, automation, desktop and browser engineering'],
    ['Build in Public', cn ? '展示项目、记录踩坑、分享真实工程经验' : ja ? 'プロジェクト公開、失敗記録、実践知の共有' : 'Show projects, document failures and share engineering experience'],
  ];
  const features = [
    ['IDENTITY','One CN2 Account',cn?'统一账户将逐步连接社区与各产品，同时保留产品级授权、设备、权益和数据边界。':ja?'共通アカウントでコミュニティと各製品を段階的につなぎ、権限・端末・権利・データ境界は製品ごとに保持します。':'Shared identity will connect the community and products while preserving product-level authorization, devices, entitlements and data boundaries.','/account',cn?'查看统一账户路线 →':ja?'共通アカウントの計画 →':'Shared identity roadmap →'],
    ['LABS','CN2 Labs',cn?'把还没成为正式产品的协议、Agent、AI 与工程实验放在一个可公开讨论的位置。':ja?'正式製品になる前のプロトコル、Agent、AI、エンジニアリング実験を公開して議論します。':'A public place for protocols, agents, AI and engineering experiments before they become products.','/labs',cn?'进入实验室 →':ja?'ラボへ →':'Enter Labs →'],
    ['TRUST','Security & Trust',cn?'公开账号安全、隐私边界、服务状态、兼容性与重大变更，而不是藏在产品角落。':ja?'アカウント安全、プライバシー境界、サービス状態、互換性、重大変更を明確に公開します。':'Make account security, privacy boundaries, service status, compatibility and major changes visible.','/trust',cn?'信任中心 →':ja?'Trust Center →':'Trust center →'],
  ];
  return <>
    <section className="hero shell"><div className="hero-copy"><span className="eyebrow">{t(copy.kicker, locale)}</span><h1>{t(copy.title, locale)}</h1><p>{t(copy.lead, locale)}</p><div className="hero-actions"><Link className="button primary" href="/products">{t(ui.explore, locale)}</Link><Link className="button secondary" href="/forum">{t(ui.enterForum, locale)}</Link></div><div className="signal-row"><span><i className="dot" /> 5 products</span><span>3 languages</span><span>1 CN2 account</span></div></div><div className="hero-art"><img src="/illustrations/network-grid.svg" alt="CN2 network illustration" /></div></section>
    <section className="shell section"><div className="section-heading"><div><span className="eyebrow">CN2 PRODUCTS</span><h2>{cn ? '一组解决真实问题的产品' : ja ? '実際の課題を解く製品群' : 'Products built around real problems'}</h2></div><Link href="/products">{cn ? '查看全部 →' : ja ? 'すべて見る →' : 'View all →'}</Link></div><div className="product-grid">{products.map((product) => <Link className="product-card" href={`/products/${product.slug}`} key={product.slug}><img src={product.icon} alt="" /><span className="eyebrow">{t(product.eyebrow, locale)}</span><h3>{product.name}</h3><p>{t(product.summary, locale)}</p><span className="card-link">{cn ? '进入' : ja ? '開く' : 'Open'} {product.name} →</span></Link>)}</div></section>
    <section className="section community-band"><div className="shell split"><div><span className="eyebrow">CN2 FORUM</span><h2>{cn ? '不只讨论产品，也讨论整个 IT 世界。' : ja ? '製品だけでなく、IT の世界全体を議論する。' : 'More than product support — discuss the wider IT world.'}</h2><p>{cn ? 'AI、编程、服务器、网络、自动化、数据库、安全、硬件、产品设计，以及那些没有标准答案的工程问题。' : ja ? 'AI、プログラミング、サーバー、ネットワーク、自動化、DB、セキュリティ、ハードウェア、製品設計、正解が一つではない技術課題まで。' : 'AI, programming, servers, networking, automation, databases, security, hardware, product design and the engineering questions without one right answer.'}</p><Link className="button light" href="/forum">{t(ui.enterForum, locale)}</Link></div><div className="topic-stack">{topics.map(([name, description]) => <article key={name}><b>{name}</b><span>{description}</span></article>)}</div></div></section>
    <section className="shell section feature-grid">{features.map(([eyebrow,title,description,href,label]) => <article className="feature-card" key={title}><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{description}</p><Link href={href}>{label}</Link></article>)}</section>
  </>;
}
