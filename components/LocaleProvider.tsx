'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'zh-CN' | 'en' | 'ja';

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-CN');

  useEffect(() => {
    const saved = window.localStorage.getItem('cn2.locale') as Locale | null;
    if (saved === 'zh-CN' || saved === 'en' || saved === 'ja') setLocaleState(saved);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem('cn2.locale', next);
    document.documentElement.lang = next;
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used within LocaleProvider');
  return value;
}
