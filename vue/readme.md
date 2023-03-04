# 准备工作

## 依赖安装

rollup 主要用于打包js文件，比webpack要轻量很多，rollup.config.js是其配置文件

.babelrc下面的presets表示预解析

rollup-plugin-serve会启动一个服务器监听一个端口（类似于live-server）

dist目录是执行npm run dev命令后生成的目标文件

```javascript

cnpm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve

```

## 打包命令

```javascript
// 执行 npm run dev
rollup -c -w
-c//执行配置文件（rollup.config.js）
-w//在index.js目录里面写的代码会实时检测更新(index.js代码一旦跟新保存后，会自动重新打包输入到dist目录)

```
