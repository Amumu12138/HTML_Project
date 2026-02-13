var one;
one = 1;
var two = 2;
// two = '123' // 不能将类型“string”分配给类型“number”
var a;
// a = 1 //不能将类型“1”分配给类型“23”
var b = 23;
console.log(one, two, a, b); // 1 2 undefined 23
var demo; // anyScript
demo = 1;
demo = 'hello';
demo = true;
var un; // 安全的any类型
un = 1;
un = 'hello';
var str;
// str = un  // 不能将类型“unknown”分配给类型“string”
if (typeof un === 'string') {
    str = un; // 通过typeof判断,unkonwn类型可以赋值给string类型
}
// 类型断言
str = un; //通过类型断言,unkonwn类型也 可以赋值给string类型
function fun(a) {
    return a + 1;
}
var result = fun(1); // 2
console.log(result);
// 对象obj必须要有name属性且类型为string, age属性可以有/无,类型为number
var obj;
obj = { name: 'amumu', age: 18 }; // 可以
obj = { name: 'test' }; // 可以
// obj = { name: '111', key: 'value' } // 不可以
// 属性key为string类型, value值为unknown
var obj2;
obj2 = { name: 'amumu' }; // 可以
obj2 = {}; // 也可以
obj2 = { name: 'amumu', age: 20 }; // 可以
// 数组声明
var arr;
var arr2;
arr = ['1', '2'];
arr2 = ['h', 'e', 'l', 'l', 'o'];
console.log(arr, arr2);
// 元组: 固定长度的数组
var tuple;
tuple = [1, 2]; // 可以
// tuple = [1] // 不行
// tuple = [] // 不行
// tuple = [1, 2, 3]  // 不行
// 枚举 - 数字枚举
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["yellow"] = 2] = "yellow";
})(Color || (Color = {}));
console.log('red', Color.red);
// 字符串枚举
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (Gender = {}));
console.log(Gender.FEMALE);
