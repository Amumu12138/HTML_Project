const http = require('http');

// 根据请求方法和路径匹配响应内容
const routes = new Map([
    ['GET /login', 'This is a GET request for login'],
    ['GET /register', 'This is a GET request for register'],
]);

const server = http.createServer((req, res) => {
    console.log(`Received ${req.method} request for ${req.url}`);

    const { pathname } = new URL(req.url, 'http://127.0.0.1');
    const message = routes.get(`${req.method} ${pathname}`);

    res.writeHead(message === undefined ? 404 : 200, {
        'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end(message ?? 'Not Found');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
