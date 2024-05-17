import {
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface StoreUserTable {
  store_id: number;
  user_id: number;
  role_id: number;
  created_date: Date;
  updated_date: Date;
}

export type StoreUser = Selectable<StoreUserTable>
export type NewStoreUser = Insertable<StoreUserTable>
export type StoreUserUpdate = Updateable<StoreUserTable>
