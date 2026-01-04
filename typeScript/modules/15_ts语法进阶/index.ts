class Person {
    // static静态属性/方法是通过类名调用: Person.b
    static b: string = 'b'
    // readonly属性也是通过实例调用: p.a
    readonly a: string = 'a'
    name: string;
    constructor(name: string) {
        this.name = name
    }
}

let p: Person = new Person('amumu');

console.log(p.name, 'name'); // amumu
console.log(p.a, 'a'); // a
console.log(Person.b, 'b'); // b
