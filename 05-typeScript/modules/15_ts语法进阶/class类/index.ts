// 动物类
class Animal {
    public name: string
    constructor(name: string) {
        this.name = name;
    }

    sleep() {
        console.log('sleep called');
    }
}

// 实现接口继承
interface IAnimal {
    name: string
    sleep(): void
}

// 狗类
class Dog extends Animal implements IAnimal {
    public name: string
    constructor(name: string) {
        super(name)
        this.name = name;
    }

    sleep() {
        console.log('dog sleep called');
    }
}

// 测试
const dog = new Dog('大黄')
console.log(dog.name, 'name');
dog.sleep()
