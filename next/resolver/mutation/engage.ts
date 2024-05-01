import engage from '@/case/engage';
import { MutationResolvers, ResolversParentTypes } from '@/generated/graphql/server/resolver';
import { ApolloContext } from '@/lib/apollo';
import { UserSpecification } from '@/entity/user';

export class AuthenticationError extends Error {
  constructor(
    readonly userKey: string | null,
    readonly message: string,
  ) {
    super();
  }
}

const sendEmail: MutationResolvers<ApolloContext, ResolversParentTypes['Mutation']>['sendEmail'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const rdbSource = contextValue.rdbSource;
  const mailer = contextValue.mailer;
  const {
    input: { email },
  } = args;
  const loginUserId = contextValue.session.getLoginUserId() || null;

  return await engage.sendEmail(rdbSource, mailer, loginUserId, email);
};

const verifyEmail: MutationResolvers<ApolloContext, ResolversParentTypes['Mutation']>['verifyEmail'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const rdbSource = contextValue.rdbSource;
  const {
    input: { register_session_id, email, email_pin },
  } = args;
  const loginUserId = contextValue.session.getLoginUserId() || null;

  let userSpecification: UserSpecification | null = null;
  if (loginUserId) {
    userSpecification = {
      type: 'logined',
      loginUserId,
    };
  } else if (register_session_id) {
    userSpecification = {
      type: 'anonymous',
      registerSessionId: register_session_id,
    };
  } else {
    return new AuthenticationError(null, 'not authenticated');
  }

  return await engage.verifyEmail(rdbSource, userSpecification, email, email_pin);
};

const register: MutationResolvers<ApolloContext, ResolversParentTypes['Mutation']>['register'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const rdbSource = contextValue.rdbSource;
  const {
    input: { register_session_id, name, email, password },
  } = args;

  return await engage.register(rdbSource, register_session_id, name, email, password);
};

const login: MutationResolvers<ApolloContext, ResolversParentTypes['Mutation']>['login'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const rdbSource = contextValue.rdbSource;
  const {
    input: { id, password },
  } = args;
  const user = await engage.login(rdbSource, id, password);

  if (!user) {
    return new AuthenticationError(id, 'who are you!?');
  }

  await contextValue.session.regenerate(user.user_id);

  return user;
};

const changeUserInformation: MutationResolvers<
  ApolloContext,
  ResolversParentTypes['Mutation']
>['changeUserInformation'] = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const {
    input: { name },
  } = args;
  const loginUserId = contextValue.session.getLoginUserId();
  if (!loginUserId) {
    return new AuthenticationError(null, 'who are you!?');
  }
  return await engage.changeUserInformation(rdbSource, loginUserId, name);
};

const changePassword: MutationResolvers<ApolloContext, ResolversParentTypes['Mutation']>['changePassword'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const rdbSource = contextValue.rdbSource;
  const {
    input: { password },
  } = args;
  const loginUserId = contextValue.session.getLoginUserId();
  if (!loginUserId) {
    return new AuthenticationError(null, 'who are you!?');
  }
  return await engage.changePassword(rdbSource, loginUserId, password);
};

const changeEmail: MutationResolvers<ApolloContext, ResolversParentTypes['Mutation']>['changeEmail'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const rdbSource = contextValue.rdbSource;
  const {
    input: { email },
  } = args;
  const loginUserId = contextValue.session.getLoginUserId();
  if (!loginUserId) {
    return new AuthenticationError(null, 'who are you!?');
  }
  return await engage.changeEmail(rdbSource, loginUserId, email);
};

export default {
  sendEmail,
  verifyEmail,
  register,
  login,
  changeUserInformation,
  changePassword,
  changeEmail,
};
