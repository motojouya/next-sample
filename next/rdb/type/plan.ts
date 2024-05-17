import {
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface PlanTable {
  plan: string;
  avaiable_date: Date;
  expire_date: Date | null;
}

export type Plan = Selectable<PlanTable>
export type NewPlan = Insertable<PlanTable>
export type PlanUpdate = Updateable<PlanTable>
