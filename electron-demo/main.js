// electron 主进程文件
var electron = require('electron')  //引入electron模块


var app = electron.app   // 创建electron引用

var BrowserWindow = electron.BrowserWindow;  //创建窗口引用

var mainWindow = null ;  //声明要打开的主窗口



app.on('ready',()=>{
  //webPreferences 启用所有node方法可以在渲染进程使用
  mainWindow = new BrowserWindow({width:400,height:400,webPreferences: {nodeIntegration: true}})   
  //设置打开的窗口大小
  // 打开调试模式
  mainWindow.webContents.openDevTools()
  require('./main/menu.js')
  // electron读取本地文件
  mainWindow.loadFile('demo6.html')  //加载那个页面

  //监听关闭事件，把主窗口设置为null
  mainWindow.on('closed',()=>{
      mainWindow = null
  })
  // 用BrowserView嵌入网页，只能放在app ready里面
  var BrowserView = electron.BrowserView //引入BrowserView
  var view = new BrowserView()   //new出对象
  mainWindow.setBrowserView(view)   // 在主窗口中设置view可用
  view.setBounds({x:0,y:100,width:1200, height:800})  //定义view的具体样式和位置
  view.webContents.loadURL('https://jspang.com')  //wiew载入

})

