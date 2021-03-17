var { shell } = require('electron')

var aHref = document.querySelector('#aHref') 

aHref.onclick = function(e){
    //阻止默认属性，不在自带浏览器打开
    e.preventDefault()
    var href = this.getAttribute('href')
    //打开浏览器
    shell.openExternal(href)
}