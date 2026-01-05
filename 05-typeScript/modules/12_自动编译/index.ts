/**
 * 1、自动编译单个文件
 * 编译文件时,使用-w指令后,ts编译器会自动监视文件的变化,并在文件发生改变时对文件进行重新编译
 * 命令: tsc index.ts -w
 * 
 * 2、自动编译当前项目在所有ts文件
 * 首先在项目根目录下创建一个ts配置文件tsconfig.json
 * tsconfig.json是一个json文件,添加配置后,只需要tsc -w命令即可完成对整个项目的编译
 */

console.log('自动编译成功!!!');
console.log('自动编译成功!!!');
console.log('自动编译成功!!!');
