module.exports = function(cfg) {
  cfg.module.rules.push({
    test: /\.coffee$/,
    loader: 'coffee-loader'
  });
  return cfg;
};