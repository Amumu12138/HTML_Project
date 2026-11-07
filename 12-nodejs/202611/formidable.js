// 利用express框架和formidable中间件实现文件上传功能
const express = require('express')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

const app = express()

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')))

// 处理文件上传请求
app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, 'uploads') // 设置上传文件的保存目录
    form.keepExtensions = true // 保留文件扩展名

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).send('文件上传失败')
            return
        }
        // 获取上传的文件信息
        const uploadedFile = files.file // 假设前端表单中input的name为file
        const oldPath = uploadedFile.path
        const newPath = path.join(form.uploadDir, uploadedFile.name)

        // 将文件移动到指定目录
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                res.status(500).send('文件保存失败')
                return
            }
            res.send('文件上传成功')
        })
    })
})

// 监听端口
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})  