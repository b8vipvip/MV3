'use client';

import { useLocale } from '@/components/LocaleProvider';

export default function AccountPage() {
  const { locale } = useLocale();
  const cn = locale === 'zh-CN';
  return <section className="shell page-section"><div className="page-hero narrow"><span className="eyebrow">CN2 IDENTITY</span><h1>{cn ? '一个账户，连接整个 CN2。' : locale === 'ja' ? '1つのアカウントで、CN2 全体へ。' : 'One account across CN2.'}</h1><p>{cn ? 'CN2 Identity 将成为社区与产品的统一身份层。当前页面是接入壳层，正式账号迁移会分阶段完成，不直接破坏 GPTWork、FDEX 等已有账户。' : locale === 'ja' ? 'CN2 Identity はコミュニティと製品の共通ID基盤になります。既存の GPTWork / FDEX アカウントを壊さず、段階的に移行します。' : 'CN2 Identity will become the shared identity layer for the community and products. Existing GPTWork and FDEX accounts will be migrated in stages rather than broken in place.'}</p></div><div className="identity-card"><div><span className="status-pill">ROADMAP · FOUNDATION</span><h2>CN2 Account</h2><p>{cn ? '计划统一注册、登录、邮箱验证、密码重置、设备与会话、安全审计、产品授权、单点登录与数据生命周期。' : 'Planned scope includes registration, sign-in, email verification, password reset, devices, sessions, security audit, product authorization, SSO and data lifecycle.'}</p></div><div className="identity-flow"><span>CN2 Identity</span><i>→</i><span>Community</span><span>GPTWork</span><span>chat2api</span><span>QNBot</span><span>FDEX</span><span>Aipany</span></div></div></section>;
}
