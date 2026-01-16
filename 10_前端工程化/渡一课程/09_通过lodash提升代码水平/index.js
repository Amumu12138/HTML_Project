// chunk函数: 将一个数组分割为指定大小的分组,如果数组不能被均分,最后一个分组收纳剩余元素
const chunk = (array, size = 1) => {
    // 判断边界条件
    if (size < 1) {
        return []
    }

    const result = []
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size))
    }

    return result;
}

const arr = [1, 2, 3, 4, 5]
const res = chunk(arr, 0)
console.log(res, 'res');

// 返回对象的每个键对应一个数字,用于统计该键出现的次数
// iteratee函数接收一个参数value,该参数表示collection中某个元素
const countBy = (collection, iteratee) => {
    if (typeof iteratee !== 'function') {
        throw new Error("iteratee no function");
    }

    const result = {};
    for (const key in collection) {
        console.log(key, iteratee(collection[key]));
        const prop = iteratee(collection[key])
        result[prop] ? result[prop]++ : (result[prop] = 1)
    }

    return result;
}

const userArr = [
    {
        id: '001',
        active: true
    },
    {
        id: '002',
        active: true
    },
    {
        id: '003',
        active: false
    }
]
// console.log(countBy(userArr, val => val.active));
// console.log(countBy(userArr, 123)); // iteratee no function

// 获取object对象下的path路径的数据
const get = (object, path, defaultValue = 'default') => {
    let obj = object
    if (typeof path === 'string') {
        const reg = /[^\[\].]/g
        path = path.match(reg)
    }
    console.log(path, 'path');

    for (const element of path) {
        console.log(element, obj[element], 'element obj');

        if (!obj) {
            return defaultValue;
        }
        obj = obj[element]
    }
    return obj === undefined ? defaultValue : obj;
}

// 正则: 取出除了[].这三个字符外的字符
const reg = /[^\[\].]/g
// console.log('a[0].b.c'.match(reg));
const object = { a: [{ b: { c: 1 } }] }
// console.log(get(object, 'a[0].b.c', 'default'));
// console.log(get(object, ['a', '1', 'b', 'c']));

// 创建一个会缓存 func 结果的函数。 如果提供了 resolver ，就用 resolver 的返回值作为 key 缓存函数的结果。 
// 默认情况下用第一个参数作为缓存的 key。 func 在调用时 this 会绑定在缓存函数上。
const memoize = (func, resolver) => {
    console.log(func, 'func');
    // 创建一个会缓存 func 结果的函数。
    const memoized = function (...args) {
        // 缓存中是否存在
        const key = resolver ? resolver.apply(this, args) : args[0]
        console.log(key, 'key');

        if (memoized.cache.has(key)) {
            return memoized.cache.get(key);
        }
        // 获取传入函数func调用结果,根据key值返回缓存
        const result = func.apply(this, args)
        memoized.cache.set(key, result)

        return result
    }

    // 设置弱引用缓存
    memoized.cache = new WeakMap();
    return memoized;
}

const obj1 = { a: 1, b: 2 }
const values = memoize(obj => Object.values(obj))
// () => ({}),设置{}为键,每次获取缓存都是最新的
// const values = memoize(obj => Object.values(obj), () => ({}))
// console.log(values(obj1), 'values');

obj1.a = 2;
console.log(values(obj1), 'values'); // [ 1, 2 ] values

// const arr1 = [1, 2, 3]
// const values1 = memoize(obj => Object.values(obj))
// console.log(values1(arr1), 'values1');
values.cache.set(obj1, ['a', 'b'])
console.log(values(obj1), 'values set update a,b');
