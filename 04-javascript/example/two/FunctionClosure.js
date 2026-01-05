var Example = Example || {};

/**
 * @desc JavaScript 闭包
 * JavaScript变量可以是局部变量或全局变量
 * 私有变量可以用到闭包
 * 
 * 一、全局变量
 * 函数可以访问由函数内部定义的变量
 * 例如:
 * function myFunction01() {
 *      var a = 4;
 *      return a * a;
 * }
 * 函数也可以访问函数外部定义的变量
 * 例如:
 * var b = 4;
 * function myFunction02() {
 *      return b * b;
 * }
 * 后面一个实例中,b是一个全局变量
 * 在web页面中全局变量属于window对象
 * 全局变量可应用于页面上的所有简本
 * 在前面一个实例中,a是一个局部变量
 * 局部变量只能用于定义它函数内部,对于其他的函数或脚本代码是不可用的
 * 全局和局部变量即使名称相同,他们也是两个不同的变量,修改其中一个,不会影响另一个的值
 * 变量声明时如果不使用var关键字,那么它就是一个全局变量,即使它在函数内部定义
 * 
 * 二、变量生命周期
 * 全局变量的作用域是全局性的,即在整个javaScript程序中,全局变量处处都在
 * 而在函数内部声明的变量,只在函数内部起作用,这些变量是局部变量,作用域是局部性的;
 * 函数的参数也是局部性的,只在函数内部起作用
 * 
 * 三、JavaScript内嵌函数
 * 所有函数都能访问全局变量
 * 实际上,在javaScript中,所有函数都能访问他们上一层的作用域
 * JavaScript支持嵌套函数,嵌套函数可以访问上一层的函数变量
 * 
 */
Example.FunctionClosure = function () {
    //内嵌函数
    function add() {
        var conter = 0;

        function plus() {
            conter += 1;
        }

        plus();
        return conter;
    }

    var a = add();
    console.log("Amumu a = ", a);

    var add = (function () {
        var counter = 0;
        return function () {
            return counter += 1;
        }
    })();

    var b = add();
    console.log("Amumu b = ", b);
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}

/**
 * 茫茫乾坤,方圆几何
 * 长传我 千百年 民族魂魄
 * 往日宫墙 寻常巷陌
 * 是谁把英雄的故事一说再说
 * 走马扬鞭 翻山过河
 * 轻生死 重大义 男儿本色
 * 几番起落 风雨振作
 * 赶它个天时地利与人和
 */