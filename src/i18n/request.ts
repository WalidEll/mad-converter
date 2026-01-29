import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ar';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = (await requestLocale) as Locale | undefined;
  if (!locale || !locales.includes(locale)) locale = defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
