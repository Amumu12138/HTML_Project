// 函数add: a、b都是number类型形参,返回值为number类型
function add(a: number, b: number): number {
    return a + b
}

// 箭头函数
const addArrow = (a: number, b: number): number => {
    return a + b
}

// 函数添加默认值
function addDefault(a: number, b: number = 0): number {
    return a + b
}

// 函数可选参数
function addOptional(a: number, b?: number): number {
    return a + (b || 0)
}

// 函数剩余参数
function addRest(a: number, ...rest: number[]): number {
    return a + rest.reduce((prev, cur) => prev + cur, 0)
}

// 函数传递对象参数
interface AddObj {
    a: number,
    b: number
}

function addObj(obj: AddObj): number {
    return obj.a + obj.b
}

// 函数this类型
interface Obj {
    user: number,
    add: (a: number, b: number) => number
}

let obj: Obj = {
    user: 1001,
    add(a: number, b: number): number {
        return this.user + a + b
    }
}

console.log(obj.add(1, 2)); // 1004

// 函数重载：先写重载签名（只声明，不实现），最后写一个实现签名
function addNum(a: number, b: number): number
function addNum(a: number): number
function addNum(a: number, b?: number): number {
    return b === undefined ? a + 1 : a + b
}

console.log(addNum(1)); // 2
console.log(addNum(1, 2)); // 3 
