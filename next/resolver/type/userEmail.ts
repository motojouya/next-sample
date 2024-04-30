import { EmailResolvers, ResolversParentTypes } from '@/generated/graphql/server/resolver';
import { ApolloContext } from '@/lib/apollo';
import { UserEmail } from '@/entity/userEmail';

type VerifiedResolver = EmailResolvers<ApolloContext, ResolversParentTypes['Email'] & Partial<UserEmail>>['verified'];
const verified: VerifiedResolver = (parent, args, contextValue, info) => {
  const { verified, verified_date } = parent;
  if (verified === true || verified === false) {
    return verified;
  } else {
    return !!verified_date;
  }
};

export const Email: EmailResolvers = {
  verified,
};
