// 实现private、protected、public
class AnimalLst {
    private name: string
    // super()方法：调用父类的构造函数
    constructor(name: string) {
        this.name = name;
    }

    sleep() {
        console.log('sleep called');
    }
    // protected属性只能在类内部访问，不能在外部访问
    protected protectedName: string = 'protectedName';
    // public属性可以在外部访问
    public publicName: string = 'publicName';
}

// 实现super()方法：调用父类的构造函数
class DogLst extends AnimalLst {
    constructor(name: string) {
        super(name)
    }

    sleep() {
        console.log('dog sleep called');
    }
    // static属性可以在外部访问，但是不能在类内部访问
    static staticName: string = 'staticName';
    // static方法可以在外部访问，但是不能在类内部访问
    static staticMethod() {
        console.log('static method called');
    }
    // 实例方法可以在外部访问
    instanceMethod() {
        console.log('instance method called');
    }

    // 实现属性age
    private age: number = 0;
    // 实现setter方法：设置age属性
    set setAge(age: number) {
        this.age = age;
    }
    // 实现getter方法：获取age属性
    get getAge() {
        return this.age;
    }
}
// 测试
const animal = new AnimalLst('amumu');
// animal.name = 'amumu'; // 错误：private属性不能在外部访问
// animal.sleep(); // 错误：sleep方法不能在外部调用
console.log(animal.publicName, 'publicName'); // publicName
// console.log(animal.protectedName, 'protectedName'); // 错误：protected属性不能在外部访问

// 测试static属性和方法
console.log(DogLst.staticName, 'staticName'); // staticName
DogLst.staticMethod(); // static method called
// 测试实例方法
const dogLst = new DogLst('大黄')
dogLst.instanceMethod(); // instance method called
// 测试属性age
console.log(dogLst.getAge, 'getAge'); // 0
dogLst.setAge = 1;
console.log(dogLst.getAge, 'getAge'); // 1
