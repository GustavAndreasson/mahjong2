const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
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
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components'),
            Actions: path.resolve(__dirname, 'src/actions'),
            Reducers: path.resolve(__dirname, 'src/reducers'),
            Selectors: path.resolve(__dirname, 'src/selectors'),
            Api: path.resolve(__dirname, 'src/api'),
            Utils: path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.js', '.jsx', '.scss', '.css']
    }
}
