import { QueryResolvers } from '@/generated/graphql/server/resolver';
import engage from '@/resolver/query/engage';

export const queries: QueryResolvers = {
  ...engage,
};
