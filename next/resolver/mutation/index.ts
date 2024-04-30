import engage from '@/resolver/mutation/engage';
import { MutationResolvers } from '@/generated/graphql/server/resolver';

export const mutations: MutationResolvers = {
  ...engage,
};
