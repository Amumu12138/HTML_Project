// 利用express中间件的特性，封装一个中间件函数，记录请求的url和请求方法
const express = require('express')
const fs = require('fs')

const app = express()

// 中间件函数
function recordMiddleware(req, res, next) {
    console.log(`请求的url: ${req.url}, 请求的方法: ${req.method}`)
    // 将请求的url和请求方法记录到日志文件中
    const log = `请求的url: ${req.url}, 请求的方法: ${req.method}\n`
    fs.appendFile('request.log', log, (err) => {
        if (err) {
            console.error('写入日志文件失败:', err)
        }
    })

    next() // 调用next()将控制权交给下一个中间件或路由处理函数
}

// 使用中间件
app.use(recordMiddleware)

app.get('/test', (req, res) => {
    res.send('This is a test route.')
})

app.get('/hello', (req, res) => {
    res.send('Hello, world!')
})

app.post('/submit', (req, res) => {
    res.send('Form submitted.')
})

// 监听端口
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/test')
}) 