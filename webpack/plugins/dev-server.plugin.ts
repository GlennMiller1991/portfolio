import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {getPaths} from "../utils";

const {pub} = getPaths(__dirname);
export const devServer: DevServerConfiguration = {
    static: {
        directory: pub,
    },
    port: 5001,
};