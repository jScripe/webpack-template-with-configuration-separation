const resolve = require("path").resolve;
module.exports = {
  outputPath: resolve(__dirname, "../", "build"),
  contentBasePath: resolve(__dirname, "../", "public"),
  srcPath: resolve(__dirname, "../src"),
  ////////////////////////////////////////////////////////////////// dependence
  nodeModulesPath: resolve(__dirname, "../", "node_modules"),
};