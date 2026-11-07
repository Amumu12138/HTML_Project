// 利用express中间件的特性，实现静态资源的访问
const express = require('express')
const path = require('path')

const app = express()

// 防盗链
app.use((req, res, next) => {
    const referer = req.get('Referer')
    if (referer && !referer.startsWith('http://localhost:3000')) {
        res.status(403).send('禁止访问')
    } else {
        next()
    }
})

// 使用express.static中间件来指定静态资源的目录
app.use(express.static(path.join(__dirname, 'public')))

// 监听端口
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})  