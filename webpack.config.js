const path = require("path");

[].some;

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.
  const cssRule = defaultConfig.module.rules
    .find(
      v =>
        v.use instanceof Array &&
        v.use.some(
          item =>
            typeof item === "string" &&
            item.endsWith("node_modules/style-loader/index.js")
        )
    )
    .use.find(
      v =>
        typeof v.loader === "string" &&
        v.loader.endsWith("node_modules/css-loader/index.js")
    );
  cssRule.options.modeules = true;
  console.log("Patched CSS Loader to use import modules");

  return defaultConfig;
};
