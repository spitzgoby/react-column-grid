const path = require("path");
const DeclarationBundlerPlugin = require("types-webpack-bundler");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
    entry: { index: path.resolve("src/index.ts") },
    externals: {
        react: "react",
        "react-dom": "react-dom",
    },
    mode: "production",
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
});
