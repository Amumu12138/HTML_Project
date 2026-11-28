// symbol 类型
/**
 * 定义: symbol 类型表示 symbol 类型的值, symbol 类型的值是 symbol 类型的唯一值
 * 原理: symbol 类型的值是 symbol 类型的唯一值, symbol 类型的值是 symbol 类型的唯一值
 * 使用场景: 1. 函数 symbol 类型的参数 2. 函数 symbol 类型的返回值
 */
// 语法: let s: symbol = Symbol('s')
let s: symbol = Symbol('s')
console.log(s) // Symbol(s)
console.log(typeof s) // symbol
console.log(s === s) // true
console.log(s.toString()) // Symbol(s)
console.log(s.toString().substring(7, -1)) // Symbol(

// symbol 类型的使用场景
// 1. 函数 symbol 类型的参数
// 2. 函数 symbol 类型的返回值
function getSymbol(): symbol {
    return Symbol('s')
}
console.log(getSymbol()) // Symbol(s)

// 1. 函数 symbol 类型的参数
function fn(s: symbol) {
    console.log(s)
}
fn(s) // Symbol(s)


// 2. 函数 symbol 类型的返回值
function fn2(): symbol {
    return s
}
console.log(fn2()) // Symbol(s)

// symbol.for('s')
console.log(Symbol.for('s')) // Symbol(s)
console.log(Symbol.for('s') === Symbol.for('s')) // true

// 迭代器
/**
 * 定义: 迭代器是一种特殊的函数,它可以返回一个迭代器对象
 * 原理: 迭代器是一种特殊的函数,它可以返回一个迭代器对象
 * 使用场景: 1. 迭代器可以用来遍历一个集合
 * 语法: function* fn() {
 *     yield 1;
 *     yield 2;
 *     yield 3;
 * }
 */
function* iterator() {
    yield 1;
    yield 2;
    yield 3;
}
let it = iterator()
console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: false }
console.log(it.next()) // { value: undefined, done: true }

