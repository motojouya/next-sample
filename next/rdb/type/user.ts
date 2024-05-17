import {
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface UserTable {
  user_id: Generated<number>;
  identifier: string;
  name: string | null;
  register_session_id: number;
  email: string | null;
  active: boolean;
  created_date: Date;
  updated_date: Date;
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

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
