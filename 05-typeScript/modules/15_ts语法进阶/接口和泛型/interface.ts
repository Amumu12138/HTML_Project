// 接口定义: 用来定义一个类结构,同时接口也可以当成类型声明去使用
// 接口可以重复声明,取所有相同接口名的并集
// 语法: interface Animal {}

interface Animal {
    name: string;
    sleep(): void;
    ['key']: Symbol;
}

//当成类型声明去使用
let anmial: Animal;
anmial = {
    name: 'amumu',
    sleep(): void { },
    ['key']: Symbol('key')
}

//  用来定义一个类结构
class MyDog implements Animal {
    name = 'myDog';
    'key' = Symbol('dog');
    sleep(): void {
        console.log(this.name, 'name -- key ', this.key);
    }
}

let myDog = new MyDog();
myDog.sleep(); // myDog name -- Symbol(dog) age
