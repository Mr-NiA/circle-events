import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import type { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
  return {
    modules: ["node_modules"],
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  };
}
