const path = require("path");

module.exports = {
    module: {
        rules: [
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
};
