// 方式一: 利用readFile和writeFile实现文件复制
const fs = require('fs');
const process = require('process');
fs.readFile('hello.txt', (err, data) => {
    if (err) throw err;
    fs.writeFile('hello_copy.txt', data, (err) => {
        if (err) throw err;
        console.log('文件复制成功');
    });
    console.log('readFile', process.memoryUsage());
});

// 方式二: 利用流实现文件复制
const rs = fs.createReadStream('hello.txt');
const ws = fs.createWriteStream('hello_copy_stream.txt');
rs.pipe(ws);
ws.on('finish', () => {
    console.log('文件复制成功');
    console.log('stream', process.memoryUsage());
});
ws.on('error', (err) => {
    console.error(err);
}); 