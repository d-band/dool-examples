module.exports = function(cfg, webpack) {
  var plugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common.js'
  });
  cfg.plugins.push(plugin);
  return cfg;
};