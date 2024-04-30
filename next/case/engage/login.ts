import { DataSource } from 'typeorm';
import { User } from '@/entity/user';
import { transact } from '@/lib/rdb';

export type Login = (rdbSource: DataSource, email: string, password: string) => Promise<User | null>;
export const login: Login = async (rdbSource, email, password) => {
  return await transact(rdbSource, async manager => {
    return await manager.findOne(User, {
      relations: ['password'],
      where: {
        password: {
          password: password,
        },
      },
    });
  });
};
