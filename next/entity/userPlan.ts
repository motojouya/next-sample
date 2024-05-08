import type { Relation } from 'typeorm';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '@/entity/user';
import { Plan } from '@/entity/plan';

@Entity()
export class UserPlan {
  @PrimaryColumn()
  user_id!: number;

  @Column()
  plan!: string;

  @Column({ default: () => 'now()' })
  updated_date!: Date;

  @OneToOne(type => User, user => user.userPlan)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
  })
  user?: Relation<User>;

  @ManyToOne(type => Plan, plan => plan.userPlans)
  @JoinColumn({
    name: 'plan',
    referencedColumnName: 'plan',
  })
  plan?: Relation<Plan>;
}
