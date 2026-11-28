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
var TDog = /** @class */ (function () {
    function TDog(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    return TDog;
}());
var Tdog = new TDog('黄', 1, 'male');
var TDogConstraint = /** @class */ (function () {
    function TDogConstraint(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    return TDogConstraint;
}());
var TdogConstraint = new TDogConstraint('黄', 1, 'male');
console.log(TdogConstraint.gender); // male
console.log(PersonTKey); // "name" | "age"
// keyof 生成的是类型："name" | "age"，类型会在编译后被擦除，不能直接当值打印
// 正确做法：把 PersonTKey 作为变量的类型注解，再打印变量的值
var key1 = 'name';
var key2 = 'age';
console.log(key1, key2); // name age
