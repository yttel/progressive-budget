const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
require("dotenv").config();

//const folderPath = process.env.NODE_ENV === "production" ? "build" : "dist";

const config = {
  entry: {
    index: "./public/src/js/index.js",
    db: "./public/src/js/db.js",
  },
  output: {
    path: __dirname + "/public/assets/dist",
    filename: "[name].bundle.js"
  },
//  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest({
      filename:"manifest.json",
      inject: false,
      fingerprints: false,
      name: "Budget Tracker App",
      short_name: "Budget Tracker",
      description: "An application that allows you to track your income and expenses. If you lose connectivity it will save your transactions until you can reconnect.",
      background_color: "#01579b",
      theme_color: "#ffffff",
      "theme-color": "#ffffff",
      start_url: "/",
      icons: [{
        src: path.resolve("public/assets/icons/icon-128x128.png"),
        sizes: [128, 512],
        destination: "icons"
      }]
    })
  ]
};

module.exports = config;
