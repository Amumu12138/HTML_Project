// abstract类：不能实例化，只能作为父类被继承
abstract class AnimalAbstract {
    abstract name: string;
    abstract age: number;
}

// class类：可以实例化，也可以作为父类被继承
class DogAbstract extends AnimalAbstract {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        super();
        this.name = name;
        this.age = age;
    }
}
// 测试
const dogAbstract = new DogAbstract('大黄', 1);
dogAbstract.name = '大黄';
dogAbstract.age = 1;
console.log(dogAbstract.name, dogAbstract.age); // 大黄 1
