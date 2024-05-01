import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LoginUserProvider, LoginUser } from '@/app/LoginUserProvider';
import { Header } from '@/app/Header';
import { getSession } from '@/lib/session';
import { getDataSource } from '@/lib/rdb';
import { User } from '@/entity/user';

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

type GetUser = () => Promise<LoginUser | null>;
const getUser: GetUser = async () => {

  const session = await getSession();
  const loginUserId = session.getLoginUserId();
  if (!loginUserId) {
    return null;
  }

  const dataSource = await getDataSource();
  const userEntity = await dataSource.manager.findOne(User, {
    where: {
      user_id: loginUserId,
      active: true,
    },
  });

  if (!userEntity) {
    return null;
  }

  return {
    id: userEntity.identifier,
    name: userEntity.name as string,
    email: userEntity.name as string,
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
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
