import {
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface UserSessionExpireTable {
  user_id: number;
  password: string;
  created_date: Date;
  expired_date: Date | null;
}

export type UserSessionExpire = Selectable<UserSessionExpireTable>
export type NewUserSessionExpire = Insertable<UserSessionExpireTable>
export type UserSessionExpireUpdate = Updateable<UserSessionExpireTable>
