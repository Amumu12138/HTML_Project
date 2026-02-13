// 在定义函数/类时,如果遇到类型不确定就可以使用泛型
// 泛型就是一个不确定的类型
// 语法: function cache<T>(value: T): T {}
function getT<T>(param: T): T {
    return param;
}

let str = getT<string>('str')
console.log(typeof str); // string

let numA = getT<number>(123)
console.log(typeof numA); // number

// 泛型约束和多个泛型
interface PersonT {
    name: string;
    age: number
}
function getPerson<T extends PersonT>(arg: T): T {
    return arg;
}
const person = getPerson({ name: 'amumu', age: 20 })

// 多个泛型
function getMsg<N, A>(name: N, age: A): [N, A] {
    return [name, age];
}

const [Nname, Aage] = getMsg('amumu', 20)
console.log(Nname, Aage);


// 类中实现泛型
interface GAnimal<G> {
    gender: G
}
class TDog<N, A, G> implements GAnimal<G> {
    name: N;
    age: A;
    gender: G;
    constructor(name: N, age: A, gender: G) {
        this.name = name
        this.age = age
        this.gender = gender
    }
}

const Tdog = new TDog('黄', 1, 'male')
