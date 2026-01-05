var Example = Example || {};

/**
 * @desc JavaScript let和const
 * ES2015(ES6)新增加了两个重要的JavaScript关键字: let和const
 * let声明的变量只在let命令所在的代码块内有效
 * const声明一个只读的常量,一旦声明,常量的值就不能改变
 * 
 * 一、全局变量
 * 在函数外声明的变量作用域是全局的
 * 全局变量在JavaScript程序的任何地方都可以访问
 * 
 * 二、局部变量
 * 在函数内部声明的变量作用域是局部的
 * 函数内使用var声明的变量只能在函数内部访问,如果不使用var则是全局变量
 * 
 * 三、块级作用域
 * 使用var关键字声明的变量不具备块级作用域的特性，它在大括号{}外依然能够被访问到
 * 在ES6之前,是没有块级作用域的概念的
 * ES6可以使用let关键字来实现块级作用域
 * let声明的变量只在let命令所在的代码块{}内有效,在{}之外不能访问
 * 
 * 四、重新定义变量
 * 使用var关键字重新声明变量可能会带来问题
 * 在块中重新声明变量也会重新声明块外的变量
 * let关键字可以解决这个问题,let只在命令所在代码块{}内有效
 * 
 * 五、const关键字
 * const用于声明一个或多个常量,声明时必须进行初始化,且初始化后值不可再修改
 * const定义变量与使用let定义的变量相似:
 * a,二者都是块级作用域
 * b,都不能和它所在作用域内的其他变量或函数拥有相同的名称
 * 两者还有两点区别:
 * a,const声明的常量必须初始化,而let声明的变量不用
 * b,const定义常量的值不能通过再赋值修改,也不能再次声明,而let定义的变量可以修改
 * 
 * 六、const本质
 * const定义的变量并非常量,并非不可变,它定义了一个常量引用的一个值(引用地址),使用const定义的对象或者数组,
 * 其实是可变的(但是首地址不会改变)
 * 
 */
Example.LetConst = function () {
    //const可以修改数组/对象
    const arr = [1, 2, 3];
    arr[0] = 10;
    console.log("Amumu LetConst arr = ", arr);

    arr.push(4);
    console.log("Amumu LetConst arr  after = ", arr);

    const a = "123";
    // a = "1"; //报错  Assignment to constant variable.
    // console.log("Amumu LetConst a = ", a);
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}