import { NextRequest, NextResponse } from 'next/server';

import { DataSource } from 'typeorm';

import { getSession, SessionContaier } from '@/lib/session';
import { getDataSource } from '@/lib/rdb';
import { Mailer, getMailer } from '@/lib/mail';

export type NextContext = {
  rdbSource: DataSource;
  mailer: Mailer;
  session: SessionContaier;
};

export type BindContext = (
  func: (context: NextContext) => (req: NextRequest) => Promise<NextResponse>,
) => (req: NextRequest) => Promise<NextResponse>;
export const bindContext: BindContext = func => async req => {
  const session = await getSession();
  const rdbSource = await getDataSource();
  const mailer = getMailer();

  const context: NextContext = {
    rdbSource,
    mailer,
    session,
  };
  const res = await func(context)(req);

  await session.save();

  return res;
};
