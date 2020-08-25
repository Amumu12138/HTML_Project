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
 */
Example.UseStrict = function () {
    "use strict";

    var a = 10;
    if (10 == a) {
        console.log("true");
    } else {
        console.log("false");
    }
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}