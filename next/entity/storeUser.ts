import type { Relation } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { UserEmail } from '@/entity/userEmail';
import { UserPassword } from '@/entity/userPassword';

@Entity()
export class StoreUser {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  store_id!: number;

  @Column()
  role_id!: number;

  @Column({ default: () => 'now()' })
  created_date!: Date;

  @Column({ default: () => 'now()' })
  updated_date!: Date;
}
