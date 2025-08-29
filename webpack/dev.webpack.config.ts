import {Configuration, ProvidePlugin} from "webpack";
import {getPaths} from "./utils";
import {htmlConfiguration} from "./plugins/html.plugin";
import {devServer} from "./plugins/dev-server.plugin";
import {baseWebpackConfig} from "./base.webpack.config";
import {getCssLoader} from "./loaders/css.loader";

const {modules} = getPaths(__dirname);

export const DevelopmentConfig: Configuration = {
    ...baseWebpackConfig,
    mode: 'development',
    stats: 'minimal',
    devtool: "eval-source-map",
    output: {
        filename: "main.js",
    },
    plugins: [
        htmlConfiguration,
        new ProvidePlugin({
            process: 'process/browser.js',
        }),
    ],
    devServer,
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
                    'style-loader',
                    getCssLoader(false),
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|webp)/,
                type: 'asset/resource'
            }
        ]
    }
};