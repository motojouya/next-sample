/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
// .eslintrc.json -> jsonでコメントかけないのでメモ。必要なら追記する
//  "rules": {
//    "@typescript-eslint/no-unused-vars": [
//      "error",
//      {
//        "vars": "all",
//        "args": "none"
//      }
//    ]
//  }
// 
// graphql-codegen入れたらでてきた。なんか必要かも
// npm WARN deprecated @babel/plugin-proposal-class-properties@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-properties instead.
// npm WARN deprecated @babel/plugin-proposal-object-rest-spread@7.20.7: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-object-rest-spread instead.
//
// tsconfig.jsonはcreate-next-appした状態から変えてないので、たぶんなんか必要そう。
// tcs-aliasもいれてないが、cjsでコンパイルする気がするので、不要な気がする。
