// 引入fs 模块
const fs = require('fs');

// 调用方法读取文件
// fs.readFile('../../resources/test.md', (err, data) => {
//     // 如果失败,则抛出错误
//     if (err) throw err;
//     // 如果没有出错,则输出内容
//     console.log(data.toString());
// })

// 使用Promise封装
new Promise((resolve, reject) => {
    fs.readFile('../../resources/test.md', (err, data) => {
        err ? reject(err) : resolve(data);
    })
}).then((res) => {
    console.log(`then calles res ${res.toString()}`);
}, (err) => {
    console.error(`then calles err 文件读取失败!`);
});


// 读取多个文件: test.md test02.md test03.md
const p = new Promise((resolve, reject) => {
    fs.readFile('../../resources/test.md', (err, data) => {
        err ? reject(err) : resolve([data]);
    });
});

p.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('../../resources/test02.md', (err, data) => {
            value.push(data);
            err ? reject(err) : resolve(value);
        });
    });
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('../../resources/test03.md', (err, data) => {
            value.push(data);
            err ? reject(err) : resolve(value);
        });
    });
}).then(result => {
    console.log(result.join('\r\n'));
});