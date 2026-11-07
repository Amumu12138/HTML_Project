// 在express中使用ejs模板引擎
const express = require('express')
const path = require('path')

const app = express()

// 设置ejs模板引擎
app.set('view engine', 'ejs')
// 设置模板文件的目录
app.set('views', path.join(__dirname, 'views'))

// 定义路由
app.get('/', (req, res) => {
    res.render('index', { title: 'EJS模板引擎', items: ['item1', 'item2', 'item3'] })
})

// 监听端口
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})  