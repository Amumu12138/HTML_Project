// 类型别名 
// 语法: type 定义: 类型1 | 类型2 | ...
type Numb = 1 | 2 | 3;
let num: Numb;
let numb: Numb;

type StrOrNum = string | number;
let a: StrOrNum = 1;
let b: StrOrNum = '123'

// 联合类型声明
let abc: string | number | boolean;
abc = 1;
abc = '123'
abc = false
// abc = undefined //不能将类型“undefined”分配给类型“string | number | boolean

// 联合类型判断：函数重载 + 联合类型实现
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: number | string, b: number | string): number | string
function add(a: number | string, b: number | string): number | string {
    return typeof a === 'number' && typeof b === 'number' ? a + b : `${a}${b}`
}

console.log(add(1, 2)); // 3
console.log(add('1', '2')); // '12'
console.log(add(1, '2')); // '12'

// 交叉类型：& 运算符
type User = {
    name: string;
    age: number;
}
type Admin = User & {
    role: 'admin';
}

let admin: Admin = {
    name: 'amumu',
    age: 18,
    role: 'admin'
}

// 类型断言：as 运算符（把更宽的类型断言成更具体的类型）
let value: string | number = admin.name;
let adminName: string = value as string;
console.log(adminName); // 'amumu'
