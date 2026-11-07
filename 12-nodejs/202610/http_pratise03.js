// HTTP 服务：利用fs模块展示 4 行 3 列的表格，支持隔行换色和点击高亮。
const http = require('http');
const fs = require('fs');
const PORT = 3011;

fs.readFile('./dir/table.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });

    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
