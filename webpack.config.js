const path = require("path");

const config = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/build/"
    },
    module: {
        rules: [
            {
                use: "babel-loader",
                test: "/\.js$/"
            }
        ]
    }
}

module.exports = config;
