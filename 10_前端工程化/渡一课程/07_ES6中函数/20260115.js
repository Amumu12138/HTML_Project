function mixArgs(a, b = 1, c = 2) {
    console.log(arguments.length); // 2
    console.log(a === arguments[0]); // true
    console.log(b === arguments[1]); // true
    a = 'appha'
    b = 'beta'

    console.log(a === arguments[0], a); // true alpha
    console.log(b === arguments[1], b); // true beta

}

mixArgs(1, 2)
console.log(mixArgs.length); // 1

function strictMixArgs(a, b) {
    'use strict' // 使用严格模式
    console.log(arguments.length); // 2
    console.log(a === arguments[0]); // true
    console.log(b === arguments[1]); // true
    a = 'appha'
    b = 'beta'

    console.log(a === arguments[0], a); // false alpha
    console.log(b === arguments[1], b); // false beta

}

strictMixArgs(1, 2)
console.log(strictMixArgs.length); // 2

let n = 1;
function getValue() {
    return n++;
}

function foo(a, b = getValue()) {
    console.log(a, b, n);
}

foo(1, 2) // 1 2 1
foo(1) // 1 1 2
foo(1) // 1 2 3
foo(1) // 1 3 4
foo(1) // 1 4 5
