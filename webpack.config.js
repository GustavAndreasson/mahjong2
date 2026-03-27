const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
    },

    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components'),
            Hooks: path.resolve(__dirname, 'src/hooks'),
            Types: path.resolve(__dirname, 'src/types')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css']
    }
}
