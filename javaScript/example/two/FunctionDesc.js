var Example = Example || {};

/**
 * @desc JavaScript 函数定义
 * JavaScript使用关键字function定义函数
 * 函数可以通过声明定义,也可以是一个表达式
 * 
 * 一、函数声明
 * 例如：
 * function myFunction() {
 *      return 0;
 * }
 * 函数声明后不会立即执行,会在我们需要的时候调用
 * 分号是用来分隔可执行JavaScript语句。
 * 由于函数声明表示一个可执行语句,所以不是分号结束
 *  
 * 二、函数表达式
 * 例如：
 * var x = function(a, b) { return a*b;};
 * JavaScript函数可以通过一个表达式定义
 * 函数表达式可以存储在变量中
 * 在函数表达式存储在变量后,变量也可作为一个函数使用
 * 以上函数实际上是一个匿名函数
 * 函数变量存储在变量中,不需要函数名称,通常通过变量名来调用
 * 上述函数以分号结尾,因为它是一个执行语句
 * 
 * 三、Function()构造函数 
 * 函数同样可以通过内置的JavaScript函数构造器(Function)定义
 * 例如：
 * var myFunction = new Function("a", "b", "return a * b");
 * var x = myFunction(3,4);
 * 注意:在JavaScript中,很多时候,你需要避免使用new关键字
 * 
 * 四、函数提升
 * 提升是JavaScript默认将当前作用域提升到前面去的行为
 * 提升应用在变量的声明与函数的声明
 * 例如：
 * myFunction(); //调用
 * //声明
 * function myFunction() {
 *      return 0;
 * }    
 * 注意:使用表达式定义函数时无法提升
 * 
 * 五、自调用函数
 * 函数表达式可以自调用
 * 自调用表达式会自动调用
 * 如果表达式后面紧跟(),则会自动调用
 * 不能自调用声明的函数
 * 通过添加括号,来说明它是一个函数表达式
 * 例如：
 * (function() {var x = "hello"; })(); //我调用我自己  
 * 以上函数实际上是一个匿名自我调用的函数
 * 
 * 六、函数可作为一个值使用
 * 七、函数是对象
 * 在JavaScript中使用typeof操作符判断函数类型将返回“function”
 * 但是JavaScript函数描述为一个对象更加准确
 * JavaScript函数有属性和方法
 * arguments.length属性返回函数调用过程接受到的参数个数
 * 函数定义作为对象的属性,称之为对象方法
 * 函数如果用于创建新的对象,称之为对象的构造函数
 * 
 * 八、箭头函数
 * ES6新增了箭头函数（类似于Lambda表达式）
 * 箭头函数表达式的语法比普通哈桑农户表达式更简洁
 * 例如： (参数1, 参数2, ...) => {函数声明}
 * 当只有一个参数时,圆括号是可选的
 * 例如： 参数1 => {函数声明}
 * 没有参数的函数可以写成一对圆括号
 * 例如: () => {函数声明}
 * 
 * 有的箭头函数都没有自己的this,不适合定义一个对象的方法
 * 当我们使用箭头函数的时候,箭头函数会默认帮我们绑定外层this的值,所以在箭头
 * 函数中this的值和外层的this是一样的
 * 箭头函数是不能提升的,所以需要在使用之前定义
 * 使用const比使用var更安全,因为函数表达式始终是一个常量
 * 如果函数部分只是一个语句,则可以省略return关键字和大括号{},这样做是一个比较好的习惯
 * 注意:IE11及更早IE版本不支持箭头函数
 */
Example.FunctionDesc = function () {

    var myFunction = new Function("a", "b", "return a * b");
    var x = myFunction(3, 4);
    console.log("Amumu FunctionDesc myFunction = ", myFunction);
    console.log("Amumu FunctionDesc x = ", x);

    //我调用我自己
    (function () {
        var x = "hello";
        console.log(x)
    })();

    //箭头函数
    const y = x => {
        return x;
    }
    console.info("Amumu 箭头函数 y = ", y(0));

    const a = (x, y) => {
        return x * y;
    }
    console.info("Amumu 箭头函数 a = ", a(3, 4));
};



if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}