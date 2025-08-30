import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {getPaths} from "../utils";

const {pub} = getPaths();
export const devServer: DevServerConfiguration = {
    static: {
        directory: pub,
    },
    port: 5001,
};