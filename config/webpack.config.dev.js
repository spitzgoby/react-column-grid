const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
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
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.png$/i,
                type: "asset/resource",
            },
            {
                test: /\.(ts|tsx)$/i,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
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
};
