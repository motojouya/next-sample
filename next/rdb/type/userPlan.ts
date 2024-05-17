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

export interface UserPlanTable {
  user_id: number;
  plan: string;
  updated_date: Date;
}

export type UserPlan = Selectable<UserPlanTable>
export type NewUserPlan = Insertable<UserPlanTable>
export type UserPlanUpdate = Updateable<UserPlanTable>
