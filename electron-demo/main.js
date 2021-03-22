var electron = require('electron') 

var app = electron.app   
var  globalShortcut = electron.globalShortcut

var BrowserWindow = electron.BrowserWindow;  

var mainWindow = null ;  
app.on('ready',()=>{
    mainWindow = new BrowserWindow({width:800,height:600,webPreferences:{ nodeIntegration:true}})  

    globalShortcut.register('ctrl+e',()=>{

        mainWindow.loadURL('https://jspang.com')  
    })

    let isRegister= globalShortcut.isRegistered('ctrl+e')?'Register Success':'Register fail'

    console.log('------->'+isRegister)



    mainWindow.loadFile('demo7.html')  

    //监听关闭事件，把主窗口设置为null
    mainWindow.on('closed',()=>{
        mainWindow = null
    })

})

app.on('will-quit',function(){
    //注销全局快捷键的监听
    globalShortcut.unregister('ctrl+e')
    globalShortcut.unregisterAll()

})