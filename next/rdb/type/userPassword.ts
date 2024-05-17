import {
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface UserPasswordTable {
  user_id: number;
  password: string;
  created_date: Date;
  updated_date: Date;
}

export type UserPassword = Selectable<UserPasswordTable>
export type NewUserPassword = Insertable<UserPasswordTable>
export type UserPasswordUpdate = Updateable<UserPasswordTable>
