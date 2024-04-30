import nextSession from 'next-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
import { User } from 'src/entity/user.js';

// declare module 'next-session' {
//   export interface SessionData {
//     loginUser: User;
//   }
// }

export type SessionData {
  loginUser: User;
}

export type GetSession = () => ReturnType<typeof nextSession>;
export const getSession: GetSession = () => {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string), // TODO 本当はnull checkしたほうがいい
    password: '',
  });

  return nextSession({
    secret: process.env.SESSION_SECRET as string, // TODO 本当はnull checkしたほうがいい
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // TODO 一旦1h
    },
    autoCommit: false,
  });
};
