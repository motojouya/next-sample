import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { gql } from 'graphql-request';

import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LoginUserProvider } from '@/app/LoginUserProvider';
import { Header } from '@/app/Header';
import { getFetcher } from '@/lib/fetch';

export const dynamic = 'force-dynamic';

const fetcher = getFetcher();
const inter = Inter({
  subsets: ['latin'],
  // variable: '--font-sans',
  // <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
});

export const metadata: Metadata = {
  title: 'Next Sample',
  description: 'Next Sample for Business Application',
};

const loginUserQuery = gql`
  query getLoginUser {
    loginUser {
      id
      name
      email_information {
        email
      }
    }
  }
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const res = await fetcher(loginUserQuery, {});
  // const user = res.loginUser;
  const user = null;
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
