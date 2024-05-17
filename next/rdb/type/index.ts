import { UserTable } from '@/rdb/type/user';
import { UserEmailTable } from '@/rdb/type/userEmail';
import { UserPasswordTable } from '@/rdb/type/userPassword';
import { UserSessionExpireTable } from '@/rdb/type/userSessionExpire';
import { RoleTable } from '@/rdb/type/role';
import { PlanTable } from '@/rdb/type/plan';
import { PlanUserTable } from '@/rdb/type/planUser';
import { StoreTable } from '@/rdb/type/store';
import { StoreUserTable } from '@/rdb/type/storeUser';

export interface Database {
  user: UserTable,
  userEmail: UserEmailTable,
  userPassword: UserPasswordTable,
  userSessionExpire: UserSessionExpireTable,
  role: RoleTable,
  plan: PlanTable,
  planUser: PlanUserTable,
  store: StoreTable,
  storeUser: StoreUserTable,
}
