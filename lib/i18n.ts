import type { Locale } from '@/components/LocaleProvider';

export type Localized = Record<Locale, string>;
export const t = (value: Localized, locale: Locale) => value[locale] ?? value['zh-CN'];

export const ui = {
  home: { 'zh-CN': '首页', en: 'Home', ja: 'ホーム' },
  products: { 'zh-CN': '产品', en: 'Products', ja: 'プロダクト' },
  forum: { 'zh-CN': '论坛', en: 'Forum', ja: 'フォーラム' },
  docs: { 'zh-CN': '文档', en: 'Docs', ja: 'ドキュメント' },
  labs: { 'zh-CN': '实验室', en: 'Labs', ja: 'ラボ' },
  status: { 'zh-CN': '状态', en: 'Status', ja: 'ステータス' },
  account: { 'zh-CN': '账户', en: 'Account', ja: 'アカウント' },
  explore: { 'zh-CN': '探索产品', en: 'Explore products', ja: '製品を見る' },
  enterForum: { 'zh-CN': '进入 CN2 论坛', en: 'Enter CN2 Forum', ja: 'CN2 フォーラムへ' },
};
