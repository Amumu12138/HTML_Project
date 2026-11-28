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

// 泛型约束
interface GAnimal<G> {
    gender: G
}
class TDogConstraint<N, A, G extends string> implements GAnimal<G> {
    name: N;
    age: A;
    gender: G;
    constructor(name: N, age: A, gender: G) {
        this.name = name
        this.age = age
        this.gender = gender
    }
}
const TdogConstraint = new TDogConstraint('黄', 1, 'male')
console.log(TdogConstraint.gender); // male


// keyof 泛型
interface PersonT {
    name: string;
    age: number
}
type PersonTKey = keyof PersonT
// keyof 生成的是类型："name" | "age"，类型会在编译后被擦除，不能直接当值打印
// 正确做法：把 PersonTKey 作为变量的类型注解，再打印变量的值
const key1: PersonTKey = 'name'
const key2: PersonTKey = 'age'
console.log(key1, key2); // name age