module.exports = function(cfg) {
  cfg.module.loaders.push({
    test: /\.coffee$/,
    loader: 'coffee-loader'
  });
  return cfg;
};