import type { Relation } from 'typeorm';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserPlan } from '@/entity/userPlan';

@Entity()
export class Plan {
  @PrimaryColumn()
  plan!: string;

  @Column({ default: () => 'now()' })
  avaiable_date!: Date;

  @Column({ nullable: true })
  expire_date?: Date;

  @OneToMany(type => UserPlan, userPlan => userPlan.plan)
  @JoinColumn({
    name: 'plan',
    referencedColumnName: 'plan',
  })
  userPlans?: Relation<UserPlan[]>;
}
