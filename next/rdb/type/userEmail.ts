import {
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface UserEmailTable {
  user_id: number;
  email: string;
  email_pin: number;
  created_date: Date;
  verified_date: Date | null;
  assign_expired_date: Date;
}

export type UserEmail = Selectable<UserEmailTable>
export type NewUserEmail = Insertable<UserEmailTable>
export type UserEmailUpdate = Updateable<UserEmailTable>
