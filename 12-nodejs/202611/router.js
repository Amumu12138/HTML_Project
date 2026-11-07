// 利用express框架实现路由模块化 引入routes/index.js文件    
const express = require('express')
const app = express()
const router = require('./routes/index')

// 使用路由模块
app.use(router)

// 处理404错误
app.all('{*splat}', (req, res) => {
    res.status(404).send('404 Not Found')
})

// 监听端口
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})  