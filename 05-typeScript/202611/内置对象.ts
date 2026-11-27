// 内置对象
// 1. Math 对象
console.log(Math.PI); // 3.141592653589793
console.log(Math.random());

// 2. Date 对象
console.log(new Date());
console.log(new Date().getFullYear()); // 2026
console.log(new Date().getMonth()); // 10
console.log(new Date().getDate()); // 25
console.log(new Date().getHours()); // 14
console.log(new Date().getMinutes()); // 23
console.log(new Date().getSeconds()); // 59

// 3. String 对象
console.log('hello'.length); // 5
console.log('hello'.toUpperCase()); // 'HELLO'
console.log('hello'.toLowerCase()); // 'hello'

// 4. Number 对象（PI、random 属于 Math，不是 Number）
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.isInteger(1.5)); // false

// 5. Boolean 对象
console.log(Boolean(true)); // true
console.log(Boolean(false)); // false
console.log(Boolean('')); // false
console.log(Boolean('hello')); // true
console.log(Boolean(0)); // false
console.log(Boolean(1)); // true

// 6. Array 对象
console.log(new Array());
console.log(new Array(1, 2, 3));
console.log(new Array(3, 4, 5));

// 7. Object 对象
console.log(new Object());
console.log(new Object({ name: 'amumu' }));

// 8. Function 对象
console.log(new Function());
console.log(new Function('return 1 + 2;'));
console.log(new Function('a', 'b', 'return a + b;'));
console.log(new Function('a', 'b', 'return a + b;')(1, 2)); // 3

// 9. RegExp 对象
console.log(new RegExp('hello'));
console.log(new RegExp('hello', 'i'));

// 10. Error 对象
console.log(new Error());
console.log(new Error('hello'));

// 11. Promise 对象（构造函数必须传 executor）
console.log(new Promise(() => { }));
console.log(new Promise((resolve, reject) => {
    resolve('hello');
}));
console.log(new Promise((resolve, reject) => {
    reject('hello');
}).catch((reason) => reason)); // 捕获 rejection，避免 unhandled rejection 让进程退出

// 12. Symbol 对象（Symbol 不能 new，直接调用）
console.log(Symbol());
console.log(Symbol('hello'));
console.log(Symbol('hello') === Symbol('hello')); // false

// 13. WeakMap 对象（key 必须是对象）
const wmKey1 = { id: 1 };
const wmKey2 = { id: 2 };
console.log(new WeakMap());
console.log(new WeakMap([[wmKey1, 'hello'], [wmKey2, 'world']]));
console.log(new WeakMap([[wmKey1, 'hello'], [wmKey2, 'world']]).get(wmKey1)); // 'hello'

// 14. WeakSet 对象（成员必须是对象）
const wsItem1 = {};
const wsItem2 = {};
console.log(new WeakSet());
console.log(new WeakSet([wsItem1, wsItem2]));
console.log(new WeakSet([wsItem1, wsItem2]).has(wsItem1)); // true

// 15. Set 对象
console.log(new Set());
console.log(new Set([1, 2, 3]));
console.log(new Set([1, 2, 3]).has(1)); // true

// 16. Map 对象
console.log(new Map());
console.log(new Map([[1, 'hello'], [2, 'world']]));
console.log(new Map([[1, 'hello'], [2, 'world']]).get(1)); // 'hello'

