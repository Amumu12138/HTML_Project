// 引入fs 模块
const fs = require('fs');

// 调用方法读取test.md文件
function readTest() {
    return new Promise((resolve, reject) => {
        fs.readFile('../../resources/test.md', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

// 调用方法读取test02.md文件
function readTest02() {
    return new Promise((resolve, reject) => {
        fs.readFile('../../resources/test02.md', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

// 调用方法读取test03.md文件
function readTest03() {
    return new Promise((resolve, reject) => {
        fs.readFile('../../resources/test03.md', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

// 入口函数
async function main() {
    let test = await readTest();
    let test02 = await readTest02();
    let test03 = await readTest03();
    console.log(test + '\n\r' + test02 + '\n\r' + test03);
}

main();