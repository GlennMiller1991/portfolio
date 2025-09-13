import {Configuration} from "webpack";
import {getPaths} from "./utils";
import {tsPathsConfiguration} from "./plugins/ts-paths.plugin";

const {appIndex} = getPaths();

export const baseWebpackConfig: Configuration = {
    entry: appIndex,
    cache: false,
    output: {
        filename: "main.js",
        clean: true,
    },
    resolve: {
        plugins: [tsPathsConfiguration,],
        extensions: [".js", ".ts", ".tsx"],
    },
}