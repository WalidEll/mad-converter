import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {locales, type Locale} from '@/i18n/request';

const seo: Record<Locale, {title: string; description: string}> = {
  ar: {
    title: 'MAD Converter — Moroccan Local Converter (MAD • Ryal • Franc)',
    description:
      'Moroccan local converter to make it easy for your everyday life. Convert MAD ↔ Ryal ↔ Franc (local units).'
  },
  fr: {
    title: 'MAD Converter — Convertisseur local marocain (MAD • Ryal • Franc)',
    description:
      'Convertisseur local marocain pour faciliter votre vie au quotidien. Conversion MAD ↔ Ryal ↔ Franc (unités locales).'
  },
  en: {
    title: 'MAD Converter — Moroccan Local Converter (MAD • Ryal • Franc)',
    description:
      'Moroccan local converter to make it easy for your everyday life. Convert MAD ↔ Ryal ↔ Franc (local units).'
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const l = locale as Locale;
  const {title, description} = seo[l];

  return {
    title,
    description,
    applicationName: 'MAD Converter',
    keywords: [
      'Morocco',
      'Moroccan',
      'MAD',
      'Dirham',
      'Ryal',
      'Rial',
      'Franc',
      'converter',
      'unit converter'
    ],
    alternates: {
      canonical: `/${l}`,
      languages: {
        ar: '/ar',
        fr: '/fr',
        en: '/en'
      }
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: l
    },
    twitter: {
      card: 'summary',
      title,
      description
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
