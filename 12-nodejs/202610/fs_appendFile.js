// 追加文件内容
const fs = require('fs');
// 追加文件内容
fs.appendFile('hello.txt', '\r\nappendFile content', (err) => {
    if (err) throw err;
    console.log('File has been saved!');
});