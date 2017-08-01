module.exports = function(config) {
  config.module.rules.push({
    test: /\.(js|css)$/,
    loader: './loader'
  });
  return config;
}