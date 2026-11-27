// 语法: enum 枚举名称 {
//  成员1,
//  成员2
//}

// 数字枚举
enum Color {
    red = 0,
    green = 1,
    yellow
}

console.log(Color.red, 'red'); // 0
console.log(Color.green, 'green'); // 1
console.log(Color.yellow, 'yellow'); // 2

// 字符串枚举
enum Gener {
    MALE = 'male',
    FEMALE = 'female'
}

console.log(Gener.MALE, 'MALE'); // male
console.log(Gener.FEMALE, 'FEMALE'); // female

// 异构枚举
enum Gener2 {
    MALE = 6,
    FEMALE = 'female'
}

console.log(Gener2.MALE, 'MALE'); // 6
console.log(Gener2.FEMALE, 'FEMALE'); // female

// 接口枚举
interface Gener3 {
    MALE: string;
    FEMALE: string;
}

const Gener3: Gener3 = {
    MALE: 'male',
    FEMALE: 'female'
}

console.log(Gener3.MALE, 'MALE'); // male
console.log(Gener3.FEMALE, 'FEMALE'); // female

// const 枚举
const enum Gener4 {
    MALE = 'male',
    FEMALE = 'female'
}
console.log(Gener4.MALE, 'MALE'); // male
console.log(Gener4.FEMALE, 'FEMALE'); // female