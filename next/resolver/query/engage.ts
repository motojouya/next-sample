import { getUserById } from '@/case/engage/user';
import { QueryResolvers, ResolversParentTypes } from '@/generated/graphql/server/resolver';
import { ApolloContext } from '@/lib/apollo';

const loginUser: QueryResolvers<ApolloContext, ResolversParentTypes['Query']>['loginUser'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const loginUserId = contextValue.session.getLoginUserId();
  if (!loginUserId) {
    return null;
  }
  return await getUserById(contextValue.rdbSource)(loginUserId);
};

export default {
  loginUser,
};
