import { NextRequest, NextResponse } from 'next/server';

import { DataSource } from 'typeorm';

import { SessionData } from '@/lib/session';
import { getDataSource } from '@/lib/rdb';
import { Mailer, getMailer } from '@/lib/mail';

export type NextContext = {
  rdbSource: DataSource;
  mailer: Mailer;
  session: SessionData;
};

export interface RequestWithContext extends NextRequest {
  context?: NextContext;
}

export type BindContext = (
  func: (req: NextRequest) => Promise<NextResponse>,
) => (req: RequestWithContext) => Promise<NextResponse>;
export const bindContext: BindContext = func => async req => {
  const session = await getSession();
  const rdbSource = await getDataSource();
  const mailer = getMailer();

  request.context = {
    rdbSource,
    mailer,
    session,
  };

  const res = await func(request);

  await session.commit();

  return res;
};
