import { EntityManager, DataSource, Raw } from 'typeorm';
import { User, AnonymousUser } from '@/entity/user';
import { UserEmail } from '@/entity/userEmail';
import { transact, RecordAlreadyExistError } from '@/lib/rdb';
import { Mailer, MailSendError } from '@/lib/mail';
import { addHours } from 'date-fns';

// TODO randomは実質状態なので、モジュールを引数に渡したい
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export type SendEmail = (
  rdbSource: DataSource,
  mailer: Mailer,
  loginUserId: number | null,
  email: string,
) => Promise<User | AnonymousUser | RecordAlreadyExistError | RecordNotFoundError | MailSendError>;
export const sendEmail: SendEmail = async (rdbSource, mailer, loginUserId, email) => {
  return await transact(rdbSource, async manager => {
    const duplicatedEmail = await getDuplicatedEmail(manager, email);
    if (duplicatedEmail) {
      return new RecordAlreadyExistError('user_email', duplicatedEmail, 'email exists already!');
    }

    let registerSessionId: number | null = null;
    let user: User | null = null;
    if (loginUserId) {
      user = await manager.findOne(User, {
        where: {
          user_id: userId,
        },
      });
      if (!user) {
        return new RecordNotFoundError('user', loginUserId, 'user not found');
      }
    } else {
      registerSessionId = getRandomInt(10000); // TODO UID
      user = manager.create(User, {
        identifier: registerSessionId.toString(),
        // name: null,
        register_session_id: registerSessionId,
        // email: null,
        active: false,
      });
      await manager.save(user);
    }

    const email_pin = getRandomInt(999999);
    const assignExpiredDate = addHours(new Date(), 1);

    const userEmail: UserEmail = manager.create(UserEmail, {
      user_id: user.user_id,
      email: email,
      email_pin: email_pin,
      // verified_date: null,
      assign_expired_date: assignExpiredDate,
    });
    await manager.save(userEmail);

    const error = await mailer.send(email, `PINコードの送付 PIN:${email_pin}`, 'PINコードを送付します');
    if (error) {
      return error;
    }

    if (registerSessionId) {
      return {
        register_session_id: registerSessionId,
        email: email,
      };
    } else {
      return user;
    }
  });
};

// TODO ここでは、assignされておらず、かつassign_expiredされていないemailを探す
// select *
//   from user_email as ue
//  inner join user as u
//          on ue.user_id = u.user_id
//  where (ue.email = ${email} and ue.assign_expired_date > now())
//     or (ue.email = ${email} and u.email = ${email})
//      ;
type GetDuplicatedEmail = (manager: EntityManager, email: string) => Promise<UserEmail | null>;
const getDuplicatedEmail: GetDuplicatedEmail = async (manager, email) => {
  return await manager.findOne(UserEmail, {
    relations: ['user'],
    where: [
      {
        email: email,
        assign_expired_date: Raw(alias => `${alias} > NOW()`),
      },
      {
        email: email,
        user: {
          email: email,
        },
      },
    ],
  });
};
