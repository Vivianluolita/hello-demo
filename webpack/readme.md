### 01 安装

> 作用

- 打包：可以把多个Javascript文件打包成一个文件，减少服务器压力和下载带宽。
- 转换：把拓展语言转换成为普通的JavaScript，让浏览器顺利运行。
- 优化：前端变的越来越复杂后，性能也会遇到问题，而WebPack也开始肩负起了优化和提升性能的责任。

```
//全局安装
npm install -g webpack
//生成package.json文件
npm n init
//dev是在开发时使用这个包，而生产环境中不使用
npm install --save-dev webpack
```

> 开发环境and生产环境：

- 开发环境：在开发时需要的环境，这里指在开发时需要依赖的包。
- 生产环境：程序开发完成，开始运行后的环境，这里指要使项目运行，所需要的依赖包。

```

webpack {entry file} {destination for bundled file}


```
