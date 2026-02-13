const a = {
    value: 0,
    valueOf() {
        console.log(this.value); // 0 1 2

        return ++this.value;
    }
}

console.log(a == 1 && a == 2 && a == 3); // true


const value = ([][[]] + [])[+!![]] + ([] + {})[+!![] + +!![]]
// ([][[]] + [])[+!![]] -> ([][''] + [])[+true] -> ('undefined' + '')[1] -> 'n'
// ([] + {})[+!![] + +!![]] -> ('' + '[object Object]')[+true + +true] -> '[object Object]'[1 + 1]
// ->'[object Object]'[2] -> 'n'
// 'n' + 'b' -> 'nb'
console.log(value); // nb

var obj1 = {
    a: 1,
    b: 2,
    valueOf: function () {
        return this.a + this.b
    },
    toString: function () {
        return 1;
    }
}

var obj2 = {
    toString: function () {
        return 0;
    }
}

// obj1 -> 1 + 2 -> 3
// !!obj2 -> true
// 3 + true -> 3 + 1 = 4
console.log(obj1 + !!obj2, obj1.valueOf(), obj2.toString(), !!{}); // 4 3 0 true

// promise -事件循环 EventLoop
const p1 = Promise.resolve(1);
// const p2 = Promise.resolve(2).then(() => p1) // 4 5 6 1 2 3
const p2 = new Promise(resolve => resolve(p1)) // 4 5 1 6 2 3

p2.then(() => {
    console.log(1);
}).then(() => {
    console.log(2);

}).then(() => {
    console.log(3);

})

p1.then(() => {
    console.log(4);

}).then(() => {
    console.log(5);

}).then(() => {
    console.log(6);

})
