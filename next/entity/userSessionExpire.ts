import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class UserSessionExpire {
  @PrimaryColumn()
  user_id!: number;

  @Column({ default: () => 'now()' })
  created_date!: Date;

  @Column()
  expired_date?: Date;
}
