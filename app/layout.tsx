import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/components/LocaleProvider';
import { SiteShell } from '@/components/SiteShell';

export const metadata: Metadata = {
  title: { default: 'CN2 社区', template: '%s · CN2' },
  description: 'CN2 技术社区与 CN2 软件服务统一入口。',
  icons: { icon: '/brand/cn2-mark.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <LocaleProvider>
          <SiteShell>{children}</SiteShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
