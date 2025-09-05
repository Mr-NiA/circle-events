import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type webpack from "webpack";

import type { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [!isDev ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
  };

  const scssLoaders = {
    test: /\.scss$/i,
    exclude: /\.module\.scss$/i,
    use: [
      !isDev ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          sassOptions: {
            silenceDeprecations: ["legacy-js-api"],
          },
        },
      },
    ],
  };

  const scssModulesLoader = {
    test: /\.module\.scss$/i,
    use: [
      !isDev ? MiniCssExtractPlugin.loader : "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            mode: "local",
            auto: true,
            localIdentName: "[name]__[local]--[hash:base64:5]",
          },
          sourceMap: true,
        },
      },
      {
        loader: "sass-loader",
        options: {
          sassOptions: {
            silenceDeprecations: ["legacy-js-api"],
          },
        },
      },
    ],
  };

  return [
    svgLoader,
    typescriptLoader,
    cssLoader,
    scssLoaders,
    scssModulesLoader,
  ];
}
