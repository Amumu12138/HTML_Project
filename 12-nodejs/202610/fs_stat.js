// 利用fs模块查看资源状态
const fs = require('fs');
// 查看文件状态
fs.stat('hello.txt', (err, stats) => {
    if (err) throw err;
    console.log(stats);
    // 判断资源是否是文件状态
    console.log('Is file:', stats.isFile());
    // 判断资源是否是目录状态
    console.log('Is directory:', stats.isDirectory());
});