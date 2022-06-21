const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}










const port = 5502; // 端口配置
const { name } = require("./package");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "development" ? "/" : "/child/power-control/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: true,
  devServer: {
    host: "0.0.0.0",
    port,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },

  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/index.scss";`,
      },
    },
  },

};
