'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname as useNextPathname, useRouter} from 'next/navigation';

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

  const toLocalePath = (l: string) => {
    const suffix = pathname === '/' ? '' : pathname;
    return `/${l}${suffix}`;
  };

  return (
    <label className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-600">{t('lang')}</span>
      <select
        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800 shadow-sm outline-none focus:border-emerald-400"
        value={locale}
        onChange={(e) => {
          const next = e.target.value;
          router.push(toLocalePath(next));
        }}
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
