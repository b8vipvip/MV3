'use client';

import Link from 'next/link';
import { useLocale } from '@/components/LocaleProvider';

const categories = [
  ['AI & Agents', '模型、Agent、RAG、推理、工具调用与 AI 工程', '128'],
  ['Programming', '前端、后端、移动端、桌面、API 与代码实践', '94'],
  ['Servers & Cloud', 'Linux、Docker、云服务器、部署与可观测性', '77'],
  ['Network', '网络、代理、DNS、CDN、链路与性能', '61'],
  ['Automation', '浏览器、桌面、RPA、Worker 与自动化系统', '83'],
  ['Security', '账号安全、应用安全、权限边界与隐私', '42'],
  ['CN2 Products', 'GPTWork / chat2api / QNBot / FDEX / Aipany', '56'],
  ['Off-topic', '硬件、效率工具、产品设计与技术之外的轻松讨论', '31'],
];

const threads = [
  ['置顶', 'CN2 社区公约：讨论事实、复现过程与可验证结论', 'Community', '12m'],
  ['AI', 'Agent 长任务应该怎样处理中断、恢复与权限回收？', 'cyberleaf', '28m'],
  ['Infra', '低配 Ubuntu 主机上如何安排 Postgres / Redis / Worker 的资源？', 'northnode', '1h'],
  ['Product', 'GPTWork 使用体验与模型验证讨论帖', 'bytefield', '2h'],
  ['Dev', '浏览器自动化遇到 DOM 重构时，怎样设计更稳的适配层？', 'stackwalker', '4h'],
];

export default function ForumPage() {
  const { locale } = useLocale();
  const cn = locale === 'zh-CN';
  return <section className="shell page-section"><div className="forum-hero"><div><span className="eyebrow">CN2 FORUM</span><h1>{cn ? '技术问题，值得被认真讨论。' : locale === 'ja' ? '技術課題を、きちんと議論する。' : 'Technical problems deserve serious discussion.'}</h1><p>{cn ? '分享复现过程、架构取舍、踩坑经验和真正解决问题的方法。论坛将在 CN2 Identity 上线后开放正式发帖。' : locale === 'ja' ? '再現手順、設計上のトレードオフ、失敗から得た知見、実際に問題を解く方法を共有します。正式投稿は CN2 Identity と共に有効化されます。' : 'Share reproductions, architecture trade-offs, lessons from failures and methods that actually solve problems. Publishing will open with CN2 Identity.'}</p></div><Link className="button primary" href="/account">{cn ? '登录 / 注册' : 'Sign in / Register'}</Link></div><div className="forum-layout"><div className="category-panel"><h2>{cn ? '版块' : 'Categories'}</h2>{categories.map(([name, description, count]) => <article key={name}><div><b>{name}</b><span>{description}</span></div><em>{count}</em></article>)}</div><div className="thread-panel"><div className="thread-header"><h2>{cn ? '最新讨论' : 'Latest discussions'}</h2><span>{cn ? '预览数据' : 'Preview data'}</span></div>{threads.map(([tag, title, author, time]) => <article className="thread" key={title}><span className="thread-tag">{tag}</span><div><h3>{title}</h3><p>{author} · {time}</p></div><span className="thread-arrow">→</span></article>)}</div></div></section>;
}
