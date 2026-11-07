// 引入 Express 框架并创建应用实例
const express = require('express');

const app = express();

// 优先使用环境变量配置服务地址和端口，未配置时使用本地默认值
const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 3000;

// 隐藏 Express 技术栈信息，减少不必要的服务信息暴露
app.disable('x-powered-by');

// 首页路由
app.get('/', (_req, res) => {
    res.send('Hello, Express!');
});

// home 页面路由
app.get('/home', (_req, res) => {
    res.send('Hello, Home!');
});

// 未匹配到其他路由时返回 404
app.use((_req, res) => {
    res.status(404).send('Page Not Found');
});

// 启动 HTTP 服务
const server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

// 监听服务启动错误，例如端口已被占用
server.on('error', (error) => {
    console.error('Failed to start server:', error.message);
    process.exitCode = 1;
});