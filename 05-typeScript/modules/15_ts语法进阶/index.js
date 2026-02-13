console.log('index called');
var Person = /** @class */ (function () {
    function Person(name) {
        // readonly属性也是通过实例调用: p.a
        this.a = 'a';
        this.name = name;
    }
    // static静态属性/方法是通过类名调用: Person.b
    Person.b = 'b';
    return Person;
}());
var p = new Person('amumu');
console.log(p.name, 'name');
console.log(p.a, 'a');
console.log(Person.b, 'b');
