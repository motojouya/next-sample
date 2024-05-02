import { User } from '@/entity/user';
import { UserEmail } from '@/entity/userEmail';
import { UserPassword } from '@/entity/userPassword';
import { UserSessionExpire } from '@/entity/userSessionExpire';

export default {
  User,
  UserEmail,
  UserPassword,
  UserSessionExpire,
};

export const list = [User, UserEmail, UserPassword, UserSessionExpire];
