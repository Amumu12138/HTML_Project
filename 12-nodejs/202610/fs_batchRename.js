// 利用fs模块将js文件批量重命名
const fs = require('fs');
const path = require('path');

// 批量重命名函数
function batchRenameFiles(directory, oldPrefix, newPrefix) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            // 判断文件是否以旧前缀开头且为js文件
            if (file.endsWith('.js') && file.startsWith(oldPrefix)) {
                const oldPath = path.join(directory, file);
                const newFileName = file.replace(oldPrefix, newPrefix);
                const newPath = path.join(directory, newFileName);

                fs.rename(oldPath, newPath, (err) => {
                    if (err) throw err;
                    console.log(`Renamed: ${oldPath} -> ${newPath}`);
                });
            }
        });
    });
}

// 使用示例
const directoryPath = '../202610'; // 指定目录路径
const oldPrefix = 'fs_fs_'; // 旧前缀
const newPrefix = 'fs_'; // 新前缀

batchRenameFiles(directoryPath, oldPrefix, newPrefix);  