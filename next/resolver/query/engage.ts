import { getUserById } from '@/case/engage/user';
import { QueryResolvers, ResolversParentTypes } from '@/generated/graphql/server/resolver';
import { ApolloContext } from '@/infra/apollo';

const loginUser: QueryResolvers<ApolloContext, ResolversParentTypes['Query']>['loginUser'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return null;
  }
  return await getUserById(contextValue.rdbSource)(loginUser.user_id);
};

export default {
  loginUser,
};
