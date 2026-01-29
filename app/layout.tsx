import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import {getLocale} from 'next-intl/server';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'MAD Converter',
  description: 'MAD ↔ Ryal ↔ Franc (Morocco local units)',
  applicationName: 'MAD Converter'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = locale === 'ar-ma' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-zellij antialiased`}>
        {children}
      </body>
    </html>
  );
}
