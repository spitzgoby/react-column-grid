const path = require('path');

module.exports = {
    entry: { index: path.resolve('src/index.js') },
    externals: {
        react: 'react',
        'react-dom': 'react-dom'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: { modules: [path.resolve(__dirname, 'src'), 'node_modules'] },
    output: {
        clean: true,
        filename: '[name].js',
        library: {
            name: 'reactColumnGrid',
            type: 'umd'
        },
        path: path.resolve('dist')
    }
};