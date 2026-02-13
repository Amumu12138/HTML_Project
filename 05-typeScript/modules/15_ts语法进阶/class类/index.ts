class Animal {
    name: string
    constructor(name: string) {
        this.name = name;
    }

    sleep() {
        console.log('sleep called');
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name)
    }
}

const dog = new Dog('大黄')
console.log(dog.name, 'name');
dog.sleep()
