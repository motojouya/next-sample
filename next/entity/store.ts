import type { Relation } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { StoreUser } from '@/entity/storeUser';

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

  @OneToMany(type => StoreUser, storeUser => storeUser.store)
  @JoinColumn({
    name: 'store_id',
    referencedColumnName: 'store_id',
  })
  storeUsers?: Relation<StoreUser[]>;
}
