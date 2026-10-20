// fs模块的文件重命名和移动
const fs = require('fs');
// 重命名文件
fs.rename('hello.txt', 'hello-renamed.txt', (err) => {
    if (err) throw err;
    console.log('File renamed!');
});

// 移动文件
fs.rename('hello-renamed.txt', 'subdir/hello-moved.txt', (err) => {
    if (err) throw err;
    console.log('File moved!');
});