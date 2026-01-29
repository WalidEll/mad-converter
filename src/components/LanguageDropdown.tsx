'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname as useNextPathname} from 'next/navigation';
import {useRouter} from '@/i18n/navigation';

const labels: Record<string, string> = {
  ar: 'Darija',
  fr: 'Français',
  en: 'English'
};

function stripLocale(pathname: string) {
  const cleaned = pathname.replace(/^\/(ar|fr|en)(?=\/|$)/, '');
  return cleaned === '' ? '/' : cleaned;
}

export default function LanguageDropdown() {
  const t = useTranslations('app');
  const locale = useLocale();
  const router = useRouter();
  const pathname = stripLocale(useNextPathname() || '/');

  return (
    <label className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-600">{t('lang')}</span>
      <select
        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800 shadow-sm outline-none focus:border-emerald-400"
        value={locale}
        onChange={(e) => router.replace(pathname, {locale: e.target.value as any})}
      >
        {(['ar', 'fr', 'en'] as const).map((l) => (
          <option key={l} value={l}>
            {labels[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
