import { DataSource } from 'typeorm';
import { User } from '@/entity/user';
import { UserPassword } from '@/entity/userPassword';
import { transact } from '@/lib/rdb';

export type ChangePassword = (rdbSource: DataSource, loginUserId: number, password: string) => Promise<User | null>;
export const changePassword: ChangePassword = async (rdbSource, loginUserId, password) => {
  return transact(rdbSource, async manager => {
    await manager.update(
      UserPassword,
      {
        user_id: loginUserId,
      },
      {
        password: password, // TODO 暗号化
      },
    );

    return await manager.findOne(User, {
      where: {
        user_id: loginUserId,
      },
    });
  });
};
