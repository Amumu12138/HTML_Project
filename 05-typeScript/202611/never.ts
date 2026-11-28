// never 类型 
/**
 * 定义: never 类型表示 never 类型的值, never 类型的值是 never 类型的唯一值
 * 原理: never 类型的值是 never 类型的唯一值, never 类型的值是 never 类型的唯一值
 * 使用场景: 1. 函数 never 类型的参数 2. 函数 never 类型的返回值
 */
function neverFunc(): never {
    throw new Error('never 类型的函数')
}

// never 类型的参数
function neverFunc2(param: never): never {
    console.log(param);
    throw new Error('never 类型的函数2')
}

// 死循环
function neverFunc3(): never {
    while (true) {
        console.log('死循环')
    }
}
