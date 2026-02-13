// 在定义函数/类时,如果遇到类型不确定就可以使用泛型
// 泛型就是一个不确定的类型
// 语法: function cache<T>(value: T): T {}
function getT(param) {
    return param;
}
var str = getT('str');
console.log(typeof str); // string
var numA = getT(123);
console.log(typeof numA); // number
function getPerson(arg) {
    return arg;
}
var person = getPerson({ name: 'amumu', age: 20 });
// 多个泛型
function getMsg(name, age) {
    return [name, age];
}
var _a = getMsg('amumu', 20), Nname = _a[0], Aage = _a[1];
console.log(Nname, Aage);
