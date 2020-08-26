var Example = Example || {};

/**
 * @desc JavaScript 严格模式
 * JavaScript严格模式即在严格的条件下运行
 * 
 * 一、使用“use strict”指令
 * “use strict”指令在JavaScript1.8.5(ES5)中新增
 * 他不是一条语句,但是是一个字面量表达式,在JavaScipt旧版本中会被忽略
 * "use strict"的目的是指定代码在严格条件下执行
 * 严格模式下你不能使用未声明的变量
 * 注意:支持严格模式的浏览器: IE10+, Firefox4+, Chrome13+, Opera12+
 * 
 * 二、严格模式声明
 * 严格模式通过在脚本或函数的头部添加“use strict”;表达式来声明
 * 在函数内部声明是局部作用域(只在函数内使用严格模式)
 * 例如 : function muFunction() {
 *  "use strict";
 *  return 3.14;
 *  } 
 * 三、使用严格模式原因
 * 1,消除javaScript语法的一些不合理、不严谨之处,减少一些怪异行为:
 * a,消除代码运行的一些不安全之处,保证代码运行的安全
 * b,提高编译器效率,增加运行速度
 * c,为未来新版本的JavaScript做好铺垫  
 * “严格模式”体现了javaScript更合理、更安全、更严谨的发展方向,包括IE10在内的主流浏览器,
 * 都已经支持它,许多大项目已经开始全面拥抱它。
 * 另一方面,同样的代码,在“严格模式”中,可能会有不一样的运行结果;一些在“正常模式”下可以运行
 * 的语句,在“严格模式”下将不能运行.掌握这些内容,有助于更细致深入地理解JavaScript,让你变成
 * 一个更好的程序员。
 * 
 * 四、严格模式的限制
 * 1,不允许使用未声明的变量
 * 2,不允许删除变量或对象
 * 3,不允许删除函数
 * 4,不允许变量重名
 * 5,不允许使用八进制
 * 6,不允许使用转义字符
 * 7,不允许对只读属性赋值
 * 8,不允许对一个使用getter方法读取的属性进行赋值
 * 9,不允许删除一个不允许删除的属性
 * 10,变量名不能使用“eval”字符串
 * 11,变量名不能使用“arguments”字符串
 * 12,不允许使用类似于 with (Math){x = cos(2)};的语句
 * 13,由于一些安全原因,在作用域eval()创建的变量不能被调用
 * 14,禁止this关键字指向全局对象
 * 
 * 五、保留关键字
 * 为了向将来JavaScript的新版本过渡,严格模式新增了一些保留关键字:
 * 注意:"use strict" 指令只允许出现在脚本或函数的开头。
 * a,implements
 * b,interface
 * c,let
 * d,package
 * e,private
 * f,protected
 * g,public
 * h,static
 * i,yield
 * 
 * JavaScript使用误区
 * 六、赋值运算符应用错误
 * 在JavaScript程序中如果你在if条件语句中使用赋值运算符的等号(=)将会产生一个错误,正确的方法是使用
 * 比较运算符的两个等号(==), if条件语句返回false.因为其中的判断条件为false
 * JS没有严格的格式检查规范 例如 if(10 = a) 是允许存在的
 * 
 * 七、比较运算符常错误
 * 在常规的比较中,数据类型是被忽略的
 * 例如：
 *  var x = 10;
 *  var y = "10";
 *  if(x == y) //true
 * 在严格的比较运算中,=== 为恒等计算符,同时检查表达式的值与类型
 * 例如：
 *  var a = 10; 
 *  var b = "10";
 *  if(x === y) //false
 * 这种错误经常会在switch语句中出现,switch语句会使用恒等式计算符(===)进行比较
 * 
 * 八、加法与连接注意事项
 * 加法是两个数字相加
 * 连接是两个字符串连接
 * 但是JavaScript的加法和连接都使用+运算符
 * 例如:
 *  var x = 10 + 5; //15
 *  var x = "10" + 5; //"105"
 * 
 * 九、浮点型数据使用注意事项
 * javaScript中的所有数据都是以64位浮点型数据来存储
 * 所有的编程语言,包括JavaScript,对浮点型数的精确度都很难确定
 * 例如:
 * var x = 0.2;
 * var u = 0.1;
 * var z = x + y; //0.30000000000000004
 * 为解决以上问题,可以用整数的乘除法来解决
 *  var z = (x  * 10 + y * 10) / 10; //0.3
 *  或保留一定的精度: var x = (x + y).toFixed(1); //0.3
 * 
 * 十、其它误区
 * 1,javaScript 允许我们在字符串中使用断行语句,但是在字符串中直接使用回车换行十会报错的
 * 字符串断行需要使用饭斜杠(\)
 * 2,错误的使用分号
 * a,在if语句失去方法体,原if语句的方法体作为独立的代码块被执行,导致错误的输出结果。
 * 例如:
 * var x = 0;
 * if(x == 10);
 * {
 *   console.log("error"); //error 由于分号使用错误,if语句中的代码块就一定会执行
 * }
 * b,return语句使用注意事项
 * JavaScript默认是在代码的最后一行自动结束
 * 在JavaScript中,分号是可选的
 * 3,数组中使用名字来索引
 * 许多程序语言都允许使用名字来作为数组的索引
 * 使用名字来作为索引的数组称为关联数组(或哈希)
 * JavaScript不支持使用名字来索引数组,只允许使用数字索引
 * 
 * 但是，在JavaScript中,对象使用名字作为索引
 * 如果你使用名字作为索引,当访问数组时,JavaScript会把数组重新定义为标准对象
 * 执行这样操作后,数组的方法及属性将不能再使用,否则会产生错误
 * 例如:
 *  var person = [];
 *  person["firstName"] = "Jhon";
 *  person["lastName"] = "Doe";
 *  person["age"] = 18;
 *  var x = person.length; // 0
 *  var y = person[0]; // undefined
 * 4,定义数组元素,最后不能添加逗号
 * 数组最后一个值的后面添加逗号虽然语法没有问题，但是再不同的浏览器可能得到不同的结果
 * 例如 var colors = [5, 6, 7,]; //这样数组的长度可能为3 也可能为4。
 * 5,定义对象，最后不能添加逗号
 * 6.undeifned不是null
 * 在JavaScript中,null用于对象,undefined用于变量、属性和方法
 * 对象只有被定义才有可能为null,否则为undefined
 * 如果我们向测试对象是否存在,在对象还没定义时将会抛出一个错误
 * 例如 if(typeof myObj !== "undefined" && muObj !== null)
 * 7,程序块作用域
 * 在每个代码块中JavaScript不会创建一个新的作用域,一般各个代码块的作用域都是全局的
 * 例如
 * for(var i = 0; i < 10; i++) {
 *      //code
 * }
 * return i; // 10
 */
Example.UseStrict = function () {
    "use strict";

    //返回true
    var a = 10;
    if (10 == a) {
        console.log("true");
    } else {
        console.log("false");
    }

    //返回true
    var x = 10;
    var y = "10";
    if (x == y) {
        console.log("true");
    } else {
        console.log("false");
    }

    //返回false
    var c = 10;
    var d = "10";
    if (c === d) {
        console.log("true");
    } else {
        console.log("false");
    }

    console.log("Amumu UseStrict 0.1 + 0.2 = ", 0.1 + 0.2); //Amumu UseStrict 0.1 + 0.2 =  0.30000000000000004
    console.log("Amumu UseStrict (0.1 + 0.2).toFixed(1) = ", (0.1 + 0.2).toFixed(1)); //Amumu UseStrict (0.1 + 0.2).toFixed(1) =  0.3

    var person = [];
    person["firstName"] = "Jhon";
    person["lastName"] = "Doe";
    person["age"] = 18;
    var x = person.length; // 0
    var y = person[0]; // undefineds
    console.log(`Amumu UseStrict x = ${x}, y = ${y}`);
    console.log(`Amumu UseStrict firstName = ${person["firstName"]}`); //Jhon

    var colors = [5, 6, 7, ];
    console.log(`Amumu UseStrict Array length = ${colors.length}`); //3
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}