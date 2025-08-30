import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {getPaths} from "../utils";

const {index} = getPaths(__dirname);
export const HtmlPlugin = new HtmlWebpackPlugin({
    template: index,
});