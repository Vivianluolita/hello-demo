### 初始化

> 配置

```
//淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install -g electron
//容易报错
npm install electron --save-dev

新建Index.html,主进程加载那个页面index.html

新建main.js, electron 主进程文件

创建package.json npm init --yes
npm install
这时候main的值为main.js就正确了。这时候就可以打开终端

在终端里输入electron .就可以打开窗口了。

```

> 验证electron

```

//查看版本
npx electron -v

//启动命令
./node_modules/.bin/electron
```

> electron运行机制

1. 读取package.json的中的入口文件,这里我们是main.js
2. main.js 主进程中创建渲染进程
3. 读取应用页面的布局和样式
4. 使用IPC在主进程执行任务并获取信息
5. 主进程只有一个，渲染进程可以有多个

>主进程和渲染进程

1. 我们可以理解package.json中定义的入口文件就是主进程,那一般一个程序只有一个主进程,而我们可以利用一个主进程,打开多个子窗口.

2. 由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中,也就是我们说的渲染进程.也就是说主进程控制渲染进程,一个主进程可以控制多个渲染进程.