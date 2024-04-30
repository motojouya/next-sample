import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from "node:assert";

import { NextRequest, NextResponse } from "next/server";

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';

import { ApolloServer, ContextFunction } from '@apollo/server';
import { DataSource } from 'typeorm';

import { resolvers } from '@/resolver';
import type { SessionData } from '@/lib/session';
import type { RequestWithContext } from '@/lib/server';
import type { Mailer } from '@/mail';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ApolloContext {
  rdbSource: DataSource;
  mailer: Mailer;
  session: Partial<SessionData>;
}

export type GetApolloServer = () => ApolloServer<ApolloContext>;
export const getApolloServer: GetApolloServer = () => {
  const schema = loadSchemaSync(path.join(__dirname, '../../../api/schema/*.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

  return new ApolloServer<ApolloContext>({
    schema: schemaWithResolvers,
    context: async ({ req }) => req.context,
  });
};

// // eslint-disable-next-line @typescript-eslint/require-await
// const getContext: ContextFunction<[{ req: RequestWithContext }], ApolloContext> = async ({ req }) => {
//   return {
//     // @ts-expect-error: contextはundefinedの可能性があるように定義されているが、この段階においては必ず存在する
//     rdbSource: req.context.rdbSource,
//     // @ts-expect-error: contextはundefinedの可能性があるように定義されているが、この段階においては必ず存在する
//     mailer: req.context.mailer,
//     session: req.session,
//   };
// };

// singleton
let apollo: ApolloServer<ApolloContext> | null = null;

export type Handler = (req: RequestWithContext) => Promise<NextResponse>;
export type GetHandler = () => Handler;
export const getHandler: GetHandler = () => {
  if (!apollo) {
    apollo = getApolloServer();
  }

  return async request => {
    const json = await request.json();
    const res = await apollo.executeOperation({ query: json.query }, { req: request });
    assert(res.body.kind === "single");
    return NextResponse.json(res.body.singleResult);
  });
};

// const result = await server.executeOperation(
//   {
//     query: 'query helloContext { hello }',
//     variables: { name: 'world' },
//   },
//   {
//     req: { headers: { name: 'world' } },
//   },
//   {
//     contextValue: { userId: 'test' },
//   }
// );

