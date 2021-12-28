module.exports = {
    env: {
        browser: true,
        es2021: true,
        "jest/globals": true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: ["react"],
};
