module.exports = {
  publicPath: "",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  runtimeCompiler: false,
  pluginOptions: {
    i18n: {
      locale: "ja",
      fallbackLocale: "ja",
      localeDir: "locales",
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true,
    },
  },
  devServer: {
    open: true,
    proxy: {
      "/bce": {
        target: "https://aip.baidubce.com/oauth/2.0/token",
        changeOrigin: true,
        pathRewrite: {
          "^/bce": "/",
        },
      },
    },
  },

  transpileDependencies: ["vuetify"],
};
