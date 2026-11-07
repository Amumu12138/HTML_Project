// 利用express框架 body-parser依赖实现获取请求体数据
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const jsonParser = bodyParser.json()
const urlencodeParser = bodyParser.urlencoded({ extended: false })

app.get('/login', (req, res) => {
    res.send('login called')
})

// 使用urlencodeParser中间件处理urlencoded格式的请求体数据
app.post('/login', urlencodeParser, (req, res) => {
    const { username, password } = req.body
    res.send(`username = ${username}, password = ${password}`)
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});
