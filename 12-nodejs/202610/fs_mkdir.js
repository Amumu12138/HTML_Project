// 利用fs模块创建文件夹
const fs = require('fs');
// 创建文件夹
// fs.mkdir('subdir_mkdir', (err) => {
//     if (err) throw err;
//     console.log('Directory created!');
// });

// 递归创建
// fs.mkdir('subdir_mkdir/subdir2', { recursive: true }, (err) => {
//     if (err) throw err;
//     console.log('Directory created recursively!');
// });

// 读取文件夹
fs.readdir('subdir_mkdir', (err, files) => {
    if (err) throw err;
    console.log('Files in directory:', files);
});


// 删除文件夹
// fs.rmdir('subdir_mkdir/subdir2', (err) => {
//     if (err) throw err;
//     console.log('Directory deleted!');
// });

// 递归删除文件夹
// fs.rmdir('subdir_mkdir', { recursive: true }, (err) => {
//     if (err) throw err;
//     console.log('Directory deleted recursively!');
// }); 