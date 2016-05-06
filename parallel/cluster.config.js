'use strict';

module.exports = function(cfg) {
  var cfgs = [];
  for (let key in cfg.entry) {
    let entry = {};
    entry[key] = cfg.entry[key];

    cfgs.push(Object.assign({}, cfg, {
      entry: entry
    }));
  }
  return cfgs;
};