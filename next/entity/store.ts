import type { Relation } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { UserEmail } from '@/entity/userEmail';
import { UserPassword } from '@/entity/userPassword';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  store_id!: number;

  @Column({
    length: 128,
    unique: true,
  })
  store_url!: string;

  @Column({
    length: 128,
  })
  name?: string;

  @Column({ default: () => 'now()' })
  created_date!: Date;

  @Column({ default: () => 'now()' })
  updated_date!: Date;
}
