//渲染进程公共
const btn = this.document.querySelector("#btn")
// var electron = require('electron')
// const BrowserWindow = electron.remote.BrowserWindow
const BrowserWindow = require('electron').remote.BrowserWindow

// var rigthTemplate = [
//   {label:'粘贴'},
//   {label:'复制'}
// ]

// var m = remote.Menu.buildFromTemplate(rigthTemplate)



window.onload = function (){
  btn.onclick = () =>{
    // newWin = new BrowserWindow({
    //   width:500,
    //   height:500,
    //   webPreferences: {
    //       nodeIntegration: true
    //   }
    // })
    newWin = new BrowserWindow({
      width:500,
      height:500,
      webPreferences:{ nodeIntegration:true}
  })
  }
  newWin.loadFile('yellow.html')
  //监听关闭事件，把主窗口设置为null。否则会内存溢出
  // newWin.on('closed',()=>{newWin = null})
  win.on('closed',()=>{
    newWin = null
  })
}
const { remote } = require('electron')

var rigthTemplate = [
    {label:'粘贴'},
    {label:'复制'}
]

var m = remote.Menu.buildFromTemplate(rigthTemplate)

window.addEventListener('contextmenu',function(e){

    //阻止当前窗口默认事件
    e.preventDefault();
    //把菜单模板添加到右键菜单
    m.popup({window:remote.getCurrentWindow()})

})