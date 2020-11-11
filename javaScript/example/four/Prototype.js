var Example = Example || {};

/**
 * @desc JavaScript prototype 原型对象
 * 所有的JavaScript对象都会从一个prototype(原型对象)中继承属性和方法
 * 
 * 一、prototype继承
 * 所有的JavaScript对象都会从一个prototype(原型对象)中继承属性和方法
 * a,Date对象从Date.prototype继承
 * b,Array对象从Array.prototype继承
 * c,Person对象从Person.prototype继承
 * 所有的JavaScript中的对象都是位于原型链顶端的Object的实例
 * JavaScript对象有一个指向一个原型对象的链,当试图访问一个对象的属性时,它不仅仅在该对象上搜寻，
 * 还会搜寻该对象的原型,以及该对象的原型的原型,依次层层向上搜索,直到找到一个名字匹配的属性或到达
 * 原型链的末尾。
 * 例如: Date对象,Array对象,以及Person对象从Object.prototype继承
 * 
 * 二、添加属性和方法
 * 有的时候我们想要在所有已经存在的对象添加新的属性或方法
 * 另外,有时候我们想要在对象的构造函数中添加属性或方法
 * 使用prototype属性就可以给对象的构造函数添加新的属性
 */
Example.Prototype = function () {
    console.log("Amumu Prototype");
    function Person(first, last, age, eyecolor) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.eyeColor = eyecolor;
      }
       
    var myFather = new Person("John", "Doe", 50, "blue");
    var myMother = new Person("Sally", "Rally", 48, "green");
    console.log('Amumu myFather = ', myFather, " myMother = ", myMother);

    Person.nationality = "English";  //已存在的对象构造器中是不能添加新的属性
    //Person =  ƒ Person(first, last, age, eyecolor) {this.firstName = first; this.lastName = last;this.age = age;this.eyeColor = eyecolor; }
    console.log('Amumu myFather after = ', myFather, " myMother after = ", myMother, " Person = ", Person);


    function Person_01(first, last, age, eyecolor) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.eyeColor = eyecolor;
        this.nationality = "English";
    }

    var myFather_01 = new Person_01("John", "Doe", 50, "blue");
    console.log('Amumu myFather_01 = ', myFather_01); 
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}