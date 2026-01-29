import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './src/i18n/request';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals
  // - Static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
