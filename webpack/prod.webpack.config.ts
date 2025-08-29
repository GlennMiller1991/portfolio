import type {Configuration} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {getPaths} from "./utils";
import {htmlConfiguration} from "./plugins/html.plugin";
import {baseWebpackConfig} from "./base.webpack.config";
import {getCssLoader} from "./loaders/css.loader";

const {modules} = getPaths(__dirname);

export const ProductionConfig: Configuration = {
    ...baseWebpackConfig,
    mode: 'production',
    stats: 'detailed',
    devtool: undefined,
    plugins: [
        new MiniCssExtractPlugin(),
        htmlConfiguration,
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: modules,
            },
            {
                test: /\.(s)?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    getCssLoader(true),
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|webp)/,
                type: 'asset/resource'
            }
        ]
    },
};