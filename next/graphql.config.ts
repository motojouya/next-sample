import type { CodegenConfig } from "@graphql-codegen/cli";
import type { IGraphQLConfig } from "graphql-config";

const codegenConfig: CodegenConfig = {
  schema: "./graphql/schema/*.graphql",
  documents: ["app/**/*.tsx"],
  generates: {
    "./generated/graphql/server/resolver.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        {
          add: {
            content: [
              "/* eslint-disable */",
              "import { DeepPartial } from 'utility-types';",
            ]
          },
        },
        // {
        //   add: {
        //     content: `export type DateString = string & { readonly __brand: unique symbol }`,
        //   },
        // },
      ],
      config: {
        defaultMapper: 'DeepPartial<{T}>',
        // resolverTypeWrapperSignature: 'Promise<DeepPartial<T>> | DeepPartial<T>',
        // strictScalars: true,
        // useTypeImports: true,
        // skipTypename: true,
        // arrayInputCoercion: true,
        // avoidOptionals: {
        //   field: true,
        //   inputValue: false,
        //   object: true,
        //   defaultValue: false,
        // },
        // scalars: {
        //   Date: "DateString",
        // },
        // enumsAsTypes: true,
      },
    },
    "./generated/graphql/client/": {
      preset: "client",
      plugins: [
        // {
        //   add: {
        //     content: `export type DateString = string & { readonly __brand: unique symbol }`,
        //   },
        // },
      ],
      config: {
        strictScalars: true,
        useTypeImports: true,
        skipTypename: true,
        arrayInputCoercion: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        scalars: {
          Date: "DateString",
        },
        enumsAsTypes: true,
      },
    },
  },
};

const config: IGraphQLConfig = {
  schema: "graphql/schema/*.graphql",
  documents: ["app/**/*.tsx"],
  extensions: {
    codegen: codegenConfig,
  },
};

// module.exports = config;
export default codegenConfig;
