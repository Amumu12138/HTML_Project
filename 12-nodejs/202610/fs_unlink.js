// fs模块删除unlink.txt文件
const fs = require('fs');
// 调用unlink方法删除unlink.txt文件 同步方法unlinkSync
// fs.unlink('unlink.txt', (err) => {
//     if (err) throw err;
//     console.log('File deleted!');
// });

// 调用rm方法删除unlink.txt文件, 同步方法rmSync
fs.rm('unlink.txt', (err) => {
    if (err) throw err;
    console.log('File deleted using rm!');
});