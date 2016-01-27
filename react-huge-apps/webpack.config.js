module.exports = function(cfg, webpack) {
  var plugin = new webpack.optimize.CommonsChunkPlugin('common', 'common.js');
  cfg.plugins.push(plugin);
  return cfg;
};