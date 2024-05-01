import type { Relation } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { UserEmail } from '@/entity/userEmail';
import { UserPassword } from '@/entity/userPassword';

export type UserSpecification =
  | {
      type: 'logined';
      loginUserId: number;
    }
  | {
      type: 'anonymous';
      registerSessionId: number;
    };

export type AnonymousUser = {
  register_session_id: number;
  email: string;
};

export function isAnonymousUser(anonymousUser: object): anonymousUser is AnonymousUser {
  return 'register_session_id' in anonymousUser && 'email' in anonymousUser;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({
    length: 128,
    unique: true,
  })
  identifier!: string;

  @Column({
    length: 128,
    nullable: true,
  })
  name?: string;

  @Column()
  register_session_id!: number;

  @Column({
    length: 128,
    nullable: true,
  })
  email?: string;

  @Column()
  active!: boolean;

  @Column({ default: () => 'now()' })
  created_date!: Date;

  @Column({ default: () => 'now()' })
  updated_date!: Date;

  @OneToMany(type => UserEmail, userEmail => userEmail.user)
  userEmails?: Relation<UserEmail[]>;

  @OneToOne(type => UserPassword, userPassword => userPassword.user)
  password?: Relation<UserPassword>;
}
