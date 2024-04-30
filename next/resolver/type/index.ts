import { User } from '@/resolver/type/user';
import { Email } from '@/resolver/type/userEmail';
import { EngageTypeResolvers } from '@/resolver/type/engage';

export const types = {
  User,
  Email,
  ...EngageTypeResolvers,
};
