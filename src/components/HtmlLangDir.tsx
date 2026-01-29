'use client';

import {useEffect} from 'react';
import {useLocale} from 'next-intl';

export default function HtmlLangDir() {
  const locale = useLocale();

  useEffect(() => {
    const dir = locale === 'ar-ma' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  return null;
}
