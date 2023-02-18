const path = require("path");
const DeclarationBundlerPlugin = require("types-webpack-bundler");

module.exports = {
    entry: { index: path.resolve("src/index.ts") },
    externals: {
        react: "react",
        "react-dom": "react-dom",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
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
        library: {
            name: "reactColumnGrid",
            type: "umd",
        },
        path: path.resolve("dist"),
    },
    plugins: [
        new DeclarationBundlerPlugin({
            moduleName: "react-column-grid",
            out: "./index.d.ts",
        }),
    ],
};
