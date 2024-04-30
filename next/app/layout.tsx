import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LoginUserProvider } from '@/app/LoginUserProvider';
import { Header } from '@/app/Header';
import { getSession } from 'src/infra/redisSession.js';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  // variable: '--font-sans',
  // <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
});

export const metadata: Metadata = {
  title: 'Next Sample',
  description: 'Next Sample for Business Application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getSession();
  const user = session.loginUser;
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginUserProvider user={user}>
          <Header />
          {children}
          <Toaster />
        </LoginUserProvider>
      </body>
    </html>
  );
}
