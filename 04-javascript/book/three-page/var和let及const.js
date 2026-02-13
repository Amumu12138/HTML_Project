console.log('before message -->', message); // before message --> undefined 原理: message会被提升,但未赋值
var message = 'hi';
console.log(message); // hi

// var声明作用域
function test() {
    var a = 'fdsdfa';
}
test();
// console.log('a-->', a); // 报错 ReferenceError: a is not defined

function test02() {
    a2 = 'dsdsds';  // a2变为了全局变量
}
test02();
console.log('a2 -->', a2); //a2 --> dsdsds
// let声明变量
// console.log('age -->', age); // 报错 ReferenceError: Cannot access 'age' before initialization 原理: let定义的变量不会被提升
let age = 1;
// let age = 2; // 报错 SyntaxError: Identifier 'age' has already been declared
// for循环中的let声明
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i); // 5, 5,5,5,5
    }, 0)
}
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i); // 0,1,2,3,4
    }, 0)
}

// const声明变量
const sex = 'man';
// sex = 'dkls';
// console.log(sex); // 报错 TypeError: Assignment to constant variable. 不能给常量赋值
const person = {};
person.name = 'dsdsd'; // 修改对象内部的属性并不违反const的属性
console.log(person); //{ name: 'dsdsd' } 

let index = 0;
for (const j = 7; index < 5; ++index) {
    console.log('j -->', j); // 7 7 7 7 7
}

for (const key in { a: 1, b: 2 }) {
    console.log('key -->', key); //a b
}

for (const value of [1, 2, 3, 4, 5]) {
    console.log('value -->', value); // 1 2 3 4 5
}