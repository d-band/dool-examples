Multiple page
===================

```
npm i dool -g

npm i
dool server
open http://localhost:8000
open http://localhost:8000/detail.html

// 编译、压缩、打包，默认路径 dist
dool build

// 如果页面很多可以开启 Cluster 加快打包速度
dool build --cluster
```