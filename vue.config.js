module.exports = {
  publicPath: "",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  runtimeCompiler: true,
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

  transpileDependencies: ["vuetify"],
};
