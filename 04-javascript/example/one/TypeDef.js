Example = Example || {}

/**
 * @desc JavaScript数据类型
 * 一、数据类型
 * 值类型:字符串(String)、数字(Number)、布尔(Boolean)、空值(Null)、未定义(undefined)、Symbol(ES6引入的一种新的原始数据类型,表示独一无二的值)
 * 引用数据类型:对象(Object)、数组(Array)、函数(Function)
 * 二、动态类型
 * JavaScript拥有动态类型,这意味着相同的变量可用作不同的类型
 * 例如:
 * var x;       //x为undefined
 * x = 5;       //x赋值为数字
 * x = "Amumu"; //x转化为字符串
 * 三、字符串
 * 字符串是存储字符的变量。
 * 字符串可以是引号中的任意文本,可以使用单引号或双引号
 * 四、数字
 * JavaScript只有一种数字类型,数字可以带小数点，也可不带。
 * 极大或极小的数字可以通过科学计数法来表示
 * 例如(y = 123e5; //表示12300000 
 * x = 123e-5;      //表示0.00123)
 * 五、布尔
 * 布尔逻辑只能由两个值:true和false
 * 六、数组
 * 数组的下标是基于零的,所以第一个索引是arr[0],第二个是arr[1],依次类推
 * 例如
 * var arr = new Array("Saab", "Volvo", "BMW");
 * 七、对象
 * 对象由花括号分隔,在括号内部,对象的属性以名称和值对的形式(name:value)来定义,属性由逗号分隔
 * 例如:
 * var person = {
 *  firstname: "John",
 *  lastname: "Doe",
 *  id: 5566
 * };
 * 对象的两种寻址方式:
 * name = person.lastname;
 * name = person["lastname"];
 * 八、undefined和null
 * undefined这个值表示变量不含有值
 * 可以通过将变量的值设置为null来清空变量
 * 九、声明变量类型
 * 当声明新变量时,可以使用关键字"new"来声明类型
 * JavaScript变量均为对象,当声明一个变量时,就创建了一个新的对象
 * 例如
 * var name = new String;
 * 
 * JavaScript对象
 * 对象时拥有属性和方法的数据
 * 在JavaScript中,几乎所有的事物都是对象
 * 对象是非常重要的,当你理解了对象,就可以了解JavaScript
 * 对象也是一个变量,但对象可以包含多个值(多个变量)
 * 对象就是变量的容器
 * 十,对象定义
 * 使用字符来定义和创建JavaScript对象,定义对象可以跨越多行,空格和换行不是必须的
 * 例如
 * var person = {
 *  firstname: "Jhon",
 *  lastname: "Doe",
 *  age: 50,
 *  eyeColor: "blue"
 * }
 * 十一、对象属性
 * 通常认为JavaScript对象是键值对的容器
 * 键值对通常写法 name: value {键与值以冒号分割}
 * 键值对JavaScript对象通常称为对象属性
 * 十二、访问对象属性
 * a,person.firstname
 * b,person["firstname"]
 * 十三、对象方法
 * 对象的方法定义了一个函数,并作为对象的属性存储
 * 对象方法通过添加()调用
 * 又改定义了? JavaScript对象是属性和方法的容器
 * 例如:
 * person.fullName = function() {
 *  return "Amumu";
 * }
 * 十四、访问对象方法
 * person.fullName();
 */
Example.TypeDef = function () {

    var name = new String;
    console.log("name =", name); // String {""}
    console.log("null === undefined", null === undefined); //true

    //定义函数
    function getName() {
        return "Amumu";
    }

    console.log("getName = ", getName); // ƒ getName() {return "Amumu";}
    console.log("getName type= ", typeof (getName)); //function
    console.log("getName value = ", getName()); //Amumu
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}