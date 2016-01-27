var join = require('path').join;

module.exports = function(cfg) {
  cfg.resolve.alias = {
    a: './js/a',
    b: './js/b',
    jquery: join(process.cwd(), './lib/jquery.js')
  };
  return cfg;
}