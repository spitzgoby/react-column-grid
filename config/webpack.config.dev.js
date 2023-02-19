const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
    devServer: {
        static: {
            directory: path.resolve("dist"),
        },
    },
    devtool: "source-map",
    entry: {
        index: path.resolve("src/index.ts"),
        example: path.resolve("example/index.js"),
    },
    mode: process.env.NODE_ENV || "development",
    module: {
        rules: [
            {
                test: /\.png$/i,
                type: "asset/resource",
            },
        ],
    },
    output: {
        clean: true,
        filename: "[name].js",
        path: path.resolve("dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve("example/index.html"),
        }),
    ],
});
