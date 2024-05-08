import { Entity, PrimaryColumn, Column } from 'typeorm';
import { StoreUser } from '@/entity/storeUser';

@Entity()
export class Role {
  @PrimaryColumn()
  role_id!: number;

  @Column()
  name!: string;

  @OneToMany(type => StoreUser, storeUser => storeUser.role)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'role_id',
  })
  storeUsers?: Relation<StoreUser[]>;
}
