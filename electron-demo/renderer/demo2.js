//渲染进程公共
const btn = this.document.querySelector("#btn")
const BrowserWindow = require('electron').remote.BrowserWindow

window.onload = function (){
  btn.onclick = () =>{
    newWin = new BrowserWindow({
      width:500,height:500
    })
  }
  newWin.loadFile('yellow.html')
  //监听关闭事件，把主窗口设置为null。否则会内存溢出
  newWin.on('closed',()=>{newWin = null})
}