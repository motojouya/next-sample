import { UserTable } from '@/rdb/type/user';
import { UserEmailTable } from '@/rdb/type/userEmail';
import { UserPasswordTable } from '@/rdb/type/userPassword';
import { UserSessionExpireTable } from '@/rdb/type/userSessionExpire';

export interface Database {
  user: UserTable,
  userEmail: UserEmailTable,
  userPassword: UserPasswordTable,
  userSessionExpire: UserSessionExpireTable,
}
