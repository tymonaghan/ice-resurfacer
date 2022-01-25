const path = require("path");

module.exports = {
  mode: "development",
  entry: "./public/game.js",
  output: {
    filename: "./public/bundle.js",
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
