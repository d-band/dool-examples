module.exports = function(config) {
  config.module.rules.push({
    test: /\.coffee$/,
    loader: 'coffee-loader'
  });
  return config;
};
