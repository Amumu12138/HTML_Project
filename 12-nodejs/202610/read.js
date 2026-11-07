// 读取文件
const fs = require('fs');
// 异步读取文件
fs.readFile('hello.txt', (err, data) => {
    if (err) throw err;
    console.log('readFile called', data.toString());
});
// 同步读取
try {
    const data = fs.readFileSync('hello.txt');
    console.log('readFileSync called', data.toString());
} catch (err) {
    console.error(err);
}

// 流式读取文件
const rs = fs.createReadStream('hello.txt');
// 监听流事件
rs.on('data', (chunk) => {
    console.log('流式读取 called', chunk);
});
// 监听流结束事件
rs.on('end', () => {
    console.log('文件读取完毕');
});
// 监听流错误事件
rs.on('error', (err) => {
    console.error(err);
});