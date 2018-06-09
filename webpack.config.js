const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  const cssRule = defaultConfig.module.rules
    .find(
      v =>
        v.use instanceof Array &&
        v.use.includes(
          "/home/natsukagami/Projects/hsgs-hackathon-18/node_modules/style-loader/index.js"
        )
    )
    .use.find(
      v =>
        v.loader ===
        "/home/natsukagami/Projects/hsgs-hackathon-18/node_modules/css-loader/index.js"
    );
  cssRule.options.modeules = true;
  console.log("Patched CSS Loader to use import modules");

  return defaultConfig;
};
