import { GraphQLClient, Variables } from 'graphql-request';
// import type { ExecutionResult, DocumentNode } from 'graphql'
// import { type DocumentNode, execute, graphql, type GraphQLSchema } from 'graphql'

// TODO export type Fetcher = (query: string | DocumentNode, variables: Variables) => Promise<ExecutionResult>;
export type Fetcher = (query: string, variables: Variables) => Promise<any>;
export type GetFetcher = () => Fetcher;
export const getFetcher: GetFetcher = () => {
  const client: GraphQLClient = new GraphQLClient(`/api/graphql`);
  return (query, variables) => client.request(query, variables);
};

// // how to use
// import { gql } from 'graphql-request'
// import useSWR from 'swr'
// import { getFetcher } from "@/lib/fetch"
//
// const fetcher = getFetcher();
// const query = gql`
//   query someQuery($input: SomeInputType!) {
//     someField(input: $input) {
//       ...fields
//     }
//   }
// `
// const { data } = useSWR([query, { input: someInput }], fetcher)
