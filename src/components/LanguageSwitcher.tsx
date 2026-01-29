'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname as useNextPathname} from 'next/navigation';
import {Link} from '@/i18n/navigation';

const labels: Record<string, string> = {
  ar: 'Darija',
  fr: 'FR',
  en: 'EN'
};

function stripLocale(pathname: string) {
  // Convert '/ar/xyz' -> '/xyz', '/fr' -> '/', etc.
  const cleaned = pathname.replace(/^\/(ar|fr|en)(?=\/|$)/, '');
  return cleaned === '' ? '/' : cleaned;
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('app');
  const pathname = stripLocale(useNextPathname() || '/');

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/90 px-3 py-1.5 text-xs shadow-sm backdrop-blur">
      <span className="text-slate-600">{t('lang')}:</span>
      {(['ar', 'fr', 'en'] as const).map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`rounded-full px-2 py-0.5 font-semibold ${
            locale === l ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          {labels[l]}
        </Link>
      ))}
    </div>
  );
}
