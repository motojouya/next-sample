import {
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface StoreTable {
  store_id: Generated<number>;
  store_url: string;
  name: string | null;
  created_date: Date;
  updated_date: Date;
}

export type Store = Selectable<StoreTable>
export type NewStore = Insertable<StoreTable>
export type StoreUpdate = Updateable<StoreTable>
