const { Menu } = require('electron')

var template = [
    {
        label:'凤来怡洗浴会所',
        submenu:[
            {label:'精品SPA'},
            {label:'泰式按摩'}
        ]

    },
    {
        label:'大浪淘沙洗浴中心',
        submenu:[
            {label:'牛奶玫瑰浴'},
            {label:'爱情拍拍手'}
        ]
    }
]

var m = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(m)