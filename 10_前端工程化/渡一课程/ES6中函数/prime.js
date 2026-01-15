const obj = {
    a: 1,
    m: function () {
        setTimeout(function () {
            // node环境: undefiend undefined globalThis
            // 浏览器环境: undefined '' window
            console.log(this.a, this.name, this);
        })
    }
}

// obj.m();

// 数组去重: 利用Set和...扩展运算符
const arr = [1, 1, 1, 2, 2, 2, 3, 3, 4]
console.log([...new Set(arr)]); // [1, 2, 3, 4]


// 默认配置
function foo(options = {}) {
    const defaultOptions = {
        a: 1,
        b: 2,
        c: 3
    }
    options = {
        ...defaultOptions,
        ...options
    }

    console.log(options);

}

foo({ a: 100 }) //{ a: 100, b: 2, c: 3 }

// 分离关注点
const calculator = {
    count: 0,
    next() {
        return ++this.count;
    },
    double(a) {
        return a * 2
    },
    add(a, b) {
        return a + b;
    }
}

// 在不改动上面代码情况下,实现调用函数时进行日志记录
for (const key in calculator) {
    const origin = calculator[key]
    console.log(typeof origin, origin);
    if (typeof origin === 'function') {
        calculator[key] = function (...args) {
            console.log(`start ${key}`);
            const result = origin.call(this, ...args)
            console.log(`result=${result}`);

            console.log(`end ${key}`);
        }
    }
}

calculator.next()
calculator.double(1)
calculator.add(1, 2)


const obj2 = {
    name: "Shae",
    sayHi: () => {
        console.log(this.name);

    },
    sayHi2() {
        (() => {
            console.log(this.name);

        })();
    }
}
obj2.sayHi() // node: undefined window: ''
obj2.sayHi2() // Shae

const products = [
    { name: 'X', stock: 2000 },
    { name: 'I', stock: 1500 },
    {
        name: 'H', stock: 1300
    }
]

const newProducts = products.map(p => p.name === 'I' ? { ...p, stock: p.stock - 1 } : p)
console.log(newProducts, 'newProducts');
console.log(products, 'products');

// 函数柯里化
const sum = (a, b, c, d) => a + b + c + d;

const currying = (fn, ...args) => {
    return (...reArgs) => {
        const allArgs = [...args, ...reArgs]
        if (allArgs.length === fn.length) {
            return fn(...allArgs)
        } else {
            return currying(fn, ...allArgs)
        }
    }
}

const result = currying(sum, 1)(2)(3)(4)
console.log(result, 'result'); // 10
const result2 = currying(sum)(1)(2)(3)(4)
console.log(result2, 'result2'); // 10
const result3 = currying(sum)(0, 2)(1, 4)
console.log(result3, 'result3'); // 7
