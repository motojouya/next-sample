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

export interface RequestWithContext extends NextRequest {
  context?: NextContext;
}

export type BindContext = (
  func: (req: RequestWithContext) => Promise<NextResponse>,
) => (req: NextRequest) => Promise<NextResponse>;
export const bindContext: BindContext = func => async req => {
  const session = await getSession();
  const rdbSource = await getDataSource();
  const mailer = getMailer();

  req.context = {
    rdbSource,
    mailer,
    session,
  };

  const res = await func(req);

  await session.save();

  return res;
};
