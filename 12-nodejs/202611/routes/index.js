// 利用express框架实现路由模块化
const express = require('express')
const router = express.Router()

// 定义路由处理函数
router.get('/', (req, res) => {
    res.send('Hello, this is the home page.')
})

router.get('/about', (req, res) => {
    res.send('This is the about page.')
})

module.exports = router 