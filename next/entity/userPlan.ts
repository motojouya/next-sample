import type { Relation } from 'typeorm';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '@/entity/user';

@Entity()
export class UserPlan {
  @PrimaryColumn()
  user_id!: number;

  @Column({
    length: 128,
  })
  plan!: string;

  @Column({ default: () => 'now()' })
  updated_date!: Date;

  @OneToOne(type => User, user => user.plan)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
  })
  user?: Relation<User>;
}
