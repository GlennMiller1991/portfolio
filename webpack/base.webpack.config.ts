import {Configuration, ProvidePlugin} from "webpack";
import {getPaths} from "./utils";
import {tsPathsConfiguration} from "./plugins/ts-paths.plugin";

const {appIndex} = getPaths(__dirname);

export const baseWebpackConfig: Configuration = {
    entry: appIndex,
    cache: false,
    output: {
        filename: "main.js",
    },
    resolve: {
        plugins: [tsPathsConfiguration,],
        extensions: [".js", ".ts", ".tsx"],
    }
}