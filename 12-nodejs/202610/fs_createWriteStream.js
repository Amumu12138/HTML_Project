// 创建写入流
const fs = require('fs');
// 创建一个可写流
const ws = fs.createWriteStream('stream.txt');
// 使用流写入数据
ws.write('Hello Node.js!\n');
ws.write('Hello Node.js!\n');
// 关闭流
ws.close();