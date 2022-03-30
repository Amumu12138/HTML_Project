var Eaxmple = Example || {};

/**
 * @desc JavaScript 函数参数
 * 一、函数显式参数(Parameters)与隐式参数(Arguments)
 * 函数显式参数在函数定义式列出
 * 函数隐式参数在函数调用时传递给函数真正的值
 * 
 * 二、参数规则
 * JavaScript函数定义显式参数时没有指定数据类型
 * JavaScript函数对隐式参数没有进行类型检测
 * JavaScript函数对隐式参数的个数没有进行检测
 * 
 *三、默认参数
 ES5中如果函数在调用时未提供隐式参数,参数会默认设置为:undefined
 有时这是可以接受的,但是建议虽好为参数设置一个默认值
 例如:
 function myFunction(x, y) {
    y = y || 0; // 如果y已经定义,y||0 返回y, 否则返回0
 }
 四、ES6函数可以自带参数
    ES6支持函数带有默认参数,就判断undfined和||的操作
    例如： function myFunction(x, y = 10) { retunr x + y;}

五、arguments对象
 JavaScript函数有个内置的对象arguments对象
 argumentd对象包含了函数调用的参数数组
 例如:
 function findMax() {
    var i, max = arguments[0];
    ...
 }

 六、通过值传递参数
 在函数中调用的参数是函数的隐式参数
 JavaScript隐式参数通过值来传递:函数仅仅是获取值
 如果函数修改参数的值,不会修改显式参数的初始值
 隐式参数的该变量在函数外是不可见的

 七、通过对象传递参数
 在javaScript中,可以引用对象的值
 因此我们在函数内部修改对象的属性就会修改其初始的值
 修改对象属性可作于函数外部
 修改对象属性在函数外是可见的
 */
Example.Arguments = function () {

    //寻找数组中最大值
    function findMax() {
        var i, max = arguments[0];

        if (arguments.length < 2) return max;


        for (i = 0; i < arguments.length; i++) {
            if (arguments[i] > max) {
                max = arguments[i];
            }
        }

        return max;
    }

    var x = findMax(1, 123, 90, 1555, 44, 88);
    console.log("Amumu x = ", x);
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}