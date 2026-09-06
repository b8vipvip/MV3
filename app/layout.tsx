import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/components/LocaleProvider';
import { SiteShell } from '@/components/SiteShell';

export const metadata: Metadata = {
  title: { default: '码位3', template: '%s · 码位3' },
  description: '码位3 技术社区与软件服务统一入口，域名 MV3.CN。',
  icons: { icon: '/brand/mv3-mark.svg' },
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
