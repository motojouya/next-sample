import { DataSource, Not, IsNull } from 'typeorm';
import { User } from '@/entity/user';
import { UserEmail } from '@/entity/userEmail';
import { transact, RecordNotFoundError } from '@/lib/rdb';

export type ChangeEmail = (
  rdbSource: DataSource,
  loginUserId: number,
  email: string,
) => Promise<User | null | RecordNotFoundError>;
export const changeEmail: ChangeEmail = async (rdbSource, loginUserId, email) => {
  return transact(rdbSource, async manager => {
    const userEmail = await manager.findOne(UserEmail, {
      where: {
        user_id: loginUserId,
        email: email,
        verified_date: Not(IsNull()),
      },
    });
    if (!userEmail) {
      return new RecordNotFoundError('user_email', { user_id: loginUserId, email: email }, 'email is not verified!');
    }

    await manager.update(
      User,
      {
        user_id: loginUserId,
      },
      {
        email: email,
      },
    );

    return await manager.findOne(User, {
      where: {
        user_id: loginUserId,
      },
    });
  });
};
