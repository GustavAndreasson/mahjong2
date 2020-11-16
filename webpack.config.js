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
            Hooks: path.resolve(__dirname, 'src/hooks')
        },
        extensions: ['.js', '.jsx', '.scss', '.css']
    }
}
