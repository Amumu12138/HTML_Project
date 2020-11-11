var Example = Example || {};

/**
 * @desc JavaScript 对象
 *  JavaScript中的所有事务都是对象: 字符串、数值、数组、函数
 * 此外,JavaScript允许自定义对象
 * 
 * 一、所有事物都是对象
 * JavaScript提供多个内置对象,比如String,Date,Array等等,对象只是带有属性和方法的特殊数据类型
 * 1,布尔型可以是一个对象
 * 2,数字型可以是一个对象
 * 3,字符串也可以是一个对象
 * 4,日期是一个对象
 * 5,数字和正则表达式也是对象
 * 6,数组是一个对象
 * 7,函数也可以是对象
 * 
 * 二、JavaScript对象
 * 对象只是一种特殊的数据,对象拥有属性和方法
 * 
 * 三、访问对象的属性
 * 属性是与对象相关的值
 * 访问对象属性的语法是: object.propertyName
 * 
 * 四、访问对象的方法
 * 方法是能够在对象上执行的动作
 * 示例: object.methodName();
 * 
 * 五、创建JavaScript对象
 * 通过JavaScript,你能够定义并创建自己的对象
 * 创建新对象有两种不同的方法"
 * a,使用Object定义并创建对象的实例
 * b,使用函数来定义对象,然后创建新的对象实例
 * 
 * 使用Object
 * 在JavaScript中,几乎所有的对象都是Object类型的实例,他们都会从Object.prototype继承属性和方法
 * Object构造函数创建一个对象包装器
 * Object构造函数,会根据给定的参数创建对象,具体由以下情况:
 * a,如果给定值是null或undefined,将会创建并返回一个空对象
 * b,如果传进去的是一个基本类型的值,则会构造其包装类型的对象
 * c,如果传进去的是引用类型的值,仍然会返回这个值,经他们赋值的变量保有和源对象相同的引用地址
 * d,当以非构造函数形式被调用时,Object的行为等同于new Object()
 * 
 * 语法格式: new Object([value]); //value可以是任何值
 * 示例: var a = new Object(true);  //使用Object生成布尔对象
 * 
 * //JavaScript对象就是一个{name:value}的集合
 * 示例: person = {name: "Amumu", age: 23, sex: male}
 * 
 * 六、使用对象构造器
 * 在JavaScript中,this通常指向的是我们正在执行的函数本身,或者是指向该函数所属的对象(运行时)
 * 示例: function person (name, age, sex) {
 *      this.name = name;
 *      this.age = age;
 *      this.sex = sex;
 * }
 * 
 * 七、把属性添加到JavaScaipt对象
 * 你可以通过为对象赋值,向已有对象添加新属性
 * 假设person对象已存在,你可以为其添加新属性
 * 示例； person.a = "a";
 * 
 * 八、把方法添加到JavaScript对象
 * 方法是附加在对象上的函数
 * 在构造函数内部定义对象的方法
 * 示例: person.setAge = function(value) {
 *      this.age = value;
 * }
 * 
 * 九、JavaScript类
 * JavaScript是面对对象的语言,但javaScript不适用类(ES5标准)
 * 在JavaScript中,不会创建类,也不会通过类来创建对象
 * JavaScript基于prototype,而不是基于类的
 * 
 * 十、JavaScript for...in循环
 * JavaScript for...in语句循环遍历对象的属性
 * 示例:
 * for(variable in person) {
 *     //执行代码
 * }
 * 注意: for...in循环中的代码块将针对每个属性执行一次
 * 
 * 十一、JavaScript的对象是可变的
 * 对象是可变的,他们是通过引用来传递的
 * 示例:
 * var person = {name: "Amumu", age: 23, sex: "male" };
 * var x = person;
 * x.age = 0;   //x.age和person.age的值都会改变
 */
Example.JavaScriptObject = function () {
    console.log("Amumu JavaScriptObject");

    var person = {name: "Amumu", age: 23, sex: "male" };
    var x = person;
    x.age = 0;   //x.age和person.age的值都会改变
    console.log("Amumu JavaScriptObject x.age = ", x.age, " person.age = ", person.age); // x.age = 0, person.age = 0
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}