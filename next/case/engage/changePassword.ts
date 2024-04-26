import { DataSource } from 'typeorm';
import { User } from 'src/entity/user.js';
import { UserPassword } from 'src/entity/userPassword.js';
import { transact } from 'src/infra/rdb.js';

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
