import Converter from '@/components/Converter';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function Home({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="relative flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="absolute right-4 top-4 z-20 pointer-events-auto">
        <LanguageSwitcher />
      </div>

      <div className="relative">
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-amber-300/20 blur" />
        <div className="relative">
          <Converter />
        </div>
      </div>
    </main>
  );
}
