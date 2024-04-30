import { User } from '@/entity/user';
import { UserEmail } from '@/entity/userEmail';
import { UserPassword } from '@/entity/userPassword';

export default {
  User,
  UserEmail,
  UserPassword,
};

export const list = [User, UserEmail, UserPassword];
