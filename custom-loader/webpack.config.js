module.exports = function(cfg) {
  cfg.module.loaders.push({
    test: /\.(js|css)$/,
    loader: './loader'
  });
  return cfg;
}