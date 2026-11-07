// 安装ejs
const ejs = require('ejs')

let data = {
    title: 'ejs模板引擎',
    items: ['item1', 'item2', 'item3']
}

// 渲染ejs模板
ejs.renderFile('./views/index.ejs', data, (err, str) => {
    if (err) {
        console.error(err)
    } else {
        console.log(str)
    }
})
