import { DataSource } from 'typeorm';
import { User } from '@/entity/user';
import { UserEmail } from '@/entity/userEmail';

export type GetUserById = (rdbSource: DataSource) => (userId: number) => Promise<User | null>;
export const getUserById: GetUserById = rdbSource => userId =>
  rdbSource.manager.findOne(User, {
    where: {
      user_id: userId,
      active: true,
    },
  });

export type GetEmail = (rdbSource: DataSource) => (userId: number, email: string) => Promise<UserEmail | null>;
export const getEmail: GetEmail = rdbSource => (userId, email) =>
  rdbSource.manager.findOne(UserEmail, {
    where: {
      user_id: userId,
      email: email,
    },
  });
