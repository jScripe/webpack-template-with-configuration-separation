const commonConfig = require('./webpack.common');
const errorConstants = require('./error-constants');
const { merge } = require('webpack-merge');

module.exports = env => {
  console.log(env);
  console.log('process.env');
  console.log(process.env);
  if (!env) {
    throw new Error(errorConstants.ERR_NO_ENV_FLAG);
  }
  const envConfig = require(`./webpack.${env.env}.js`);
  const mergedConfig = merge(commonConfig, envConfig);
  return mergedConfig;
}