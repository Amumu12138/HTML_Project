// 写入文件
const fs = require('fs');
fs.writeFile('hello.txt', 'Hello Node.js!', (err) => {
    if (err) throw err;
    console.log('File has been saved!');
});