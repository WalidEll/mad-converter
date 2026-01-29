import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {locales, type Locale} from '@/i18n/request';

const seo: Record<Locale, {title: string; description: string; dir: 'ltr' | 'rtl'}> = {
  'ar-ma': {
    title: 'MAD Converter — محول مغربي محلي (MAD • Ryal • Franc)',
    description:
      'محول مغربي محلي باش يسهّل عليك الحياة اليومية. تحويل MAD ↔ Ryal ↔ Franc (وحدات محلية).',
    dir: 'rtl'
  },
  'ar-fr': {
    title: 'MAD Converter — Moroccan Local Converter (MAD • Ryal • Franc)',
    description:
      'Moroccan local converter to make it easy for your everyday life. Convert MAD ↔ Ryal ↔ Franc (local units).',
    dir: 'ltr'
  },
  fr: {
    title: 'MAD Converter — Convertisseur local marocain (MAD • Ryal • Franc)',
    description:
      'Convertisseur local marocain pour faciliter votre vie au quotidien. Conversion MAD ↔ Ryal ↔ Franc (unités locales).',
    dir: 'ltr'
  },
  en: {
    title: 'MAD Converter — Moroccan Local Converter (MAD • Ryal • Franc)',
    description:
      'Moroccan local converter to make it easy for your everyday life. Convert MAD ↔ Ryal ↔ Franc (local units).',
    dir: 'ltr'
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
        'ar-ma': '/ar-ma',
        'ar-fr': '/ar-fr',
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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
