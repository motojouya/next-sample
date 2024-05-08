import type { Relation } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { User } from '@/entity/user';
import { Store } from '@/entity/store';
import { Role } from '@/entity/role';

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

  @OneToOne(type => User, user => user.storeUsers)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
  })
  user?: Relation<User>;

  @OneToOne(type => Store, store => store.storeUsers)
  @JoinColumn({
    name: 'store_id',
    referencedColumnName: 'store_id',
  })
  store?: Relation<Store>;

  @ManyToOne(type => Role, role => role.storeUsers)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'role_id',
  })
  role?: Relation<Role>;
}
