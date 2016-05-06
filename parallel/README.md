Cluster模式执行 (parallel)
======


1. 需要把multi-entry的config改成multi-config配置，如：


```
// file: webpack.config.js
module.exports = function(cfg) {
  var cfgs = [];
  for (let key in cfg.entry) {
    let entry = {};
    entry[key] = cfg.entry[key];

    cfgs.push(Object.assign({}, cfg, {
      entry: entry
    }));
  }
  // 返回config数组
  return cfgs;
};
```


2. 执行


```
# 如果config文件名为webpack.config.js
dool build --cluster
# 自定义config文件名，如：cluster.config.js
dool build --config cluster.config.js --cluster
```