import { DataSource } from 'typeorm';
import { User } from '@/entity/user';
import { UserPassword } from '@/entity/userPassword';
import { transact } from '@/infra/rdb';

export type ChangePassword = (rdbSource: DataSource, loginUser: User, password: string) => Promise<User | null>;
export const changePassword: ChangePassword = async (rdbSource, loginUser, password) => {
  return transact(rdbSource, async manager => {
    await manager.update(
      UserPassword,
      {
        user_id: loginUser.user_id,
      },
      {
        password: password, // TODO 暗号化
      },
    );

    return await manager.findOne(User, {
      where: {
        user_id: loginUser.user_id,
      },
    });
  });
};
