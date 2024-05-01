import { cookies } from 'next/headers';
import { getIronSession, IronSession } from 'iron-session';
import { getDataSource } from '@/lib/rdb';
import { UserSessionExpire } from '@/entity/user';

export type SessionData = {
  loginUserId?: number;
};

type GetIronSession = () => Promise<IronSession<SessionData>>;

const _getIronSession: GetIronSession = () => getIronSession<SessionData>(cookies(), {
  password: process.env.SESSION_SECRET as string, // TODO 本当はnull checkしたほうがいい
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  cookieOptions: {
    path: '/',
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, // TODO 一旦1h
  }
});

type InnerRegenerate = (loginUserId: number, session: IronSession<SessionData>) => Promise<IronSession<SessionData>>;
const _regenerate: InnerRegenerate = async (loginUserId, session) => {
  await session.destory();

  const newSession = await _getIronSession();
  newSession.loginUserId = loginUserId;

  return newSession;
};

export type Save = () => Promise<void>;
export type Destory = () => void;
export type Regenerate = () => Promise<void>;
export type GetLoginUserId = () => number;
export type SessionContaier = {
  save: Save,
  destory: Destory,
  regenerate: Regenerate,
  getLoginUserId: GetLoginUserId,
};
export type GetSession = () => Promise<SessionContaier>
export const getSession: GetSession = async () => {

  let session = await _getIronSession();
  loginUserId = session.loginUserId;

  if (loginUserId) {
    const dataSource = getDataSource();
    const manager = dataSource.manager;
    const userSessionExpire = manager.findOne(UserSessionExpire, {
      where: {
        user_id: loginUserId,
        expired_date: IsNull(),
      },
    });

    if (userSessionExpire) {
      session.destory();
      manager.update(
        UserSessionExpire,
        {
          user_id: userSessionExpire.user_id,
        },
        {
          expired_date: new Date(),
        },
      );
      session = await _getIronSession();
    }
  }

  const save: Save = () => session.save();
  const destroy: Destroy = () => session.destroy();
  const regenerate: Regenerate = async (loginUserId) => {
    session = await _regenerate(loginUserId, session);
  };
  const getLoginUserId: GetLoginUserId = () => session.loginUserId;

  return {
    save,
    destroy,
    regenerate,
    getLoginUserId,
  };
};

// how to use
// session.save();
// session.destroy();
// session.loginUserId
