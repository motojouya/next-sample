import {
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface RoleTable {
  role_id: Generated<number>;
  name: string;
}

export type Role = Selectable<RoleTable>
export type NewRole = Insertable<RoleTable>
export type RoleUpdate = Updateable<RoleTable>
