import HtmlWebpackPlugin from "html-webpack-plugin";
import {getPaths} from "../utils";

const {index} = getPaths();
export const HtmlPlugin = new HtmlWebpackPlugin({
    template: index,
});