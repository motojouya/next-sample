import { DataSource } from 'typeorm';
import { User } from '@/entity/user';
import { transact } from '@/lib/rdb';

export type ChangeUserInformation = (rdbSource: DataSource, loginUserId: number, name: string) => Promise<User | null>;
export const changeUserInformation: ChangeUserInformation = async (rdbSource, loginUserId, name) => {
  return transact(rdbSource, async manager => {
    await manager.update(
      User,
      {
        user_id: loginUserId,
      },
      {
        name: name,
      },
    );

    return await manager.findOne(User, {
      where: {
        user_id: loginUserId,
      },
    });
  });
};
