module.exports = function(cfg, webpack) {
  var plugin = new webpack.optimize.CommonsChunkPlugin('common', 'common.js');
  cfg.plugins = [plugin, ...cfg.plugins];
  return cfg;
};