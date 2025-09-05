import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  description: 'Entrepreneurs Behaviour Assessment',
  robots: 'noindex, nofollow',
  title: 'Nexea Assessment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
