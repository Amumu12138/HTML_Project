// HTTP 服务：展示 4 行 3 列的表格，支持隔行换色和点击高亮。
const http = require('http');
const PORT = 3010;

const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Table Example</title>
            <style>
                table {
                    width: 50%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: center;
                }
                // 隔行换色
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                // 高亮样式
                .highlight {
                    background-color: yellow;
                }
            </style>
        </head>
        <body>
            <table id="myTable">
                <tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr>
                <tr><td>Row 1, Cell 1</td><td>Row 1, Cell 2</td><td>Row 1, Cell 3</td></tr>
                <tr><td>Row 2, Cell 1</td><td>Row 2, Cell 2</td><td>Row 2, Cell 3</td></tr>
                <tr><td>Row 3, Cell 1</td><td>Row 3, Cell 2</td><td>Row 3, Cell 3</td></tr>
            </table>
            <script>
                // 点击单元格高亮
                const table = document.getElementById('myTable');
                table.addEventListener('click', (event) => {
                    const cell = event.target;
                    if (cell.tagName !== 'TD') return;

                    // 清除上一次高亮，再高亮当前单元格。
                    table.querySelector('.highlight')?.classList.remove('highlight');
                    cell.classList.add('highlight');
                });
            </script>
        </body>
        </html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
