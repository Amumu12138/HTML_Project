// 利用http模块搭建静态资源服务
const http = require('http');
const fs = require('fs');
const path = require('path');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // 根据文件扩展名设置Content-Type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    // 读取文件并返回响应
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // 如果文件不存在，返回404页面
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            }
            else if (err.code === 'EACCES') {
                res.writeHead(403, { 'Content-Type': 'text/html' });
                res.end('<h1>403 Forbidden</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
// 启动服务器
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});