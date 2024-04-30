import { DataSource, Not, IsNull } from 'typeorm';
import { User } from '@/entity/user';
import { UserEmail } from '@/entity/userEmail';
import { UserPassword } from '@/entity/userPassword';
import { transact, RecordNotFoundError } from '@/infra/rdb';

export type Register = (
  rdbSource: DataSource,
  register_session_id: number,
  name: string,
  email: string,
  password: string,
) => Promise<User | null | RecordNotFoundError>;
export const register: Register = async (rdbSource, register_session_id, name, email, password) => {
  return await transact(rdbSource, async manager => {
    // TODO register_session_idをexpiredさせるタイミングがあったほうがいいかも
    const user = await manager.findOne(User, {
      where: {
        register_session_id: register_session_id,
      },
    });
    if (!user) {
      return new RecordNotFoundError('user', { register_session_id }, 'user is not found!');
    }

    const userEmail = await manager.findOne(UserEmail, {
      where: {
        user_id: user.user_id,
        email,
        verified_date: Not(IsNull()),
      },
    });
    if (!userEmail) {
      return new RecordNotFoundError('user_email', { user_id: user.user_id, email: email }, 'user_email is not found!');
    }

    await manager.update(
      User,
      {
        user_id: user.user_id,
      },
      {
        identifier: email,
        name: name,
        email: email,
        active: true,
      },
    );

    const userPassword = manager.create(UserPassword, {
      user_id: user.user_id,
      password: password,
    });
    await manager.save(userPassword);

    return await manager.findOne(User, {
      where: {
        user_id: user.user_id,
      },
    });
  });
};
