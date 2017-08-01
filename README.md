# Examples

> Project examples for `dool` .

## Prepare

```bash
$ npm install dool -g
```

## Usage

```bash
# !-- 1. enter directory
$ cd react

# !-- 2. debug
$ dool server
$ open http://127.0.0.1:8000

# !-- 3. build
$ dool build
```

## List

**语言类**
- [应用 Coffee](./coffee)
- [应用 Less-默认支持](./less)
- [应用 ES6-默认支持](./es6)

**性能**
- [公用依赖-Common](./common)
- [公用依赖-Vendor](./common-vendor)
- [按需加载](./lazy-load)
- [按需加载-自定义模块名](./named-chunks)
- [并行（parallel）编译-利用多核优势](./multi-page)

**框架**
- [应用 React](./react)
- [应用 React Router](https://github.com/d-band/yax-hackernews)
- [应用 Vue ElementUI](https://github.com/d-band/vue-boilerplate)

**Redux**
- [Redux TodoMVC](./redux-todomvc)
- [Redux Cart](./redux-shopping-cart)

**其他**
- [多页应用](./multi-page)
- [自定义 loader](./custom-loader)
- [通过环境变量区分开发和线上模式](./define)
- [对小于 10K 的图片和字体文件做 base64 转换](./base64)

