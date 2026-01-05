var Eaxmple = Example || {};

/**
 * @desc JavaScript 函数调用
 * JavaScript函数有4种调用方式
 * 每种方式的不同在于this的初始化
 * 
 * 一、this关键字
 * 一般而言,在JavaScript中,this指向函数执行时的当前对象
 * 注意this是保留关键字,你不能修改this的值
 * 
 * 二、调用JavaScript函数
 * 1,作为一个函数调用
 * 例如: 
 * function myFunction(a ,b) {
 *      retunr a * b;
 * }
 * 以上函数不属于任何对象,但是在javaScript中它始终是默认的全局对象
 * 在HTML中默认的全局对象是HTML页面本身,所以函数是属于HTML页面
 * 在浏览器中的页面对象是浏览器窗口(window对象),以上函数会自动变为window对象的函数
 * 也就是myFunction()和window.myFunction()是一样的。
 * 
 * 2,全局对象
 * 当函数没有被自身的对象调用时this的值就会变成全局对象
 * 在web浏览器中全局对象是浏览器窗口(window对象)
 * 例如: 
 * function myFunction01() {
 *      return this;
 * }
 * myFunction01(); //返回window对象
 * 函数作为全局对象调用,会使this的值成为全局对象,使用window对象作为一个变量容易造成程序崩溃
 * 
 * 3,函数作为方法调用
 * 在JavaScript中你可以将函数定义为对象的方法
 * 以下实例创建了一个对象(myObject),对象有两个属性(firstName和latName),及一个方法(fullName)
 * var myObject = {
 *   firstName: "john",
 *   lastName: "Doe",
 *   fullName: function() {
 *      return this.firstName + " " + this.lastName; 
 *  }   
 * }
 * myObject.fullName(); //john Doe
 * fullName方法是一个函数,函数属于对象,myObject是函数的所有者
 * this对象,拥有JavaScript代码,实例中this的值为myObject对象
 * 函数作为对象方法调用,会使得this的值成为对象本身
 * 
 * 4,使用构造函数调用函数
 * 如果函数调用前使用了new关键字,则是调用了构造函数
 * 这看起来就像创建了新的函数,但实际上JavaScript函数是重新创建的对象
 * 例如：
 * function myFunction02(arg1, arg2) {
 *      this.firstName = arg1;
 *      this.lastName= arg2;
 * } 
 * var x = new myFunction02("Jhon", "Dee");
 * x.firstName; //John
 * 构造函数的调用会创建一个新的对象,新对象会继构造函数的属性和方法.
 * 构造函数中this关键字没有任何的值,this的值在函数调用实例化对象时创建
 * 
 * 5,作为函数方法调用函数
 * 在JavaScript中,函数是对象.javaScript函数有它的属性和方法。
 * call()和apply()是预定义的函数方法,两个方法可用于调用函数,两个方法的第一个参数必须是对象本身
 * 两个方法都使用了对象本身作为第一个参数,两者的区别在于第一个参数:apply传入的是一个参数数组,也
 * 就是将多个参数组合成为一个数组传入,而call作为call的参数传入(从第二个参数开始)
 * 在JavaScript严格模式下,在调用函数时第一个参数会成为this的值,即使该参数不是一个对象。
 * 在JavaScript非严格模式下,如果第一个参数的值是null或undefined,它将使用全局对象替代。
 * 通过call()或apply()方法你可以设置this的值,且作为已存在对象的新方法调用
 */
Example.FunctionCall = function () {

    function myFunction02(arg1, arg2) {
        this.firstName = arg1;
        this.lastName = arg2;
        console.log("Amumu FunctionCall this = ", this); //未创建时不会有值; new 创建对象时为函数本身; 直接调用该方法时为window对象
    }
    // var x = new myFunction02("Jhon", "Dee");
    // myFunction02(0, 1);

    function myFunction(a, b) {
        return a * b;
    }

    var myObject = myFunction.call(myObject, 10, 2);
    console.log("Amumu myObject = ", myObject); //20

    function myFunction03(a, b) {
        return a * b;
    }

    myArrar = [10, 2];
    var myObject03 = myFunction03.apply(myObject03, myArrar);
    console.log("Amumu myObject03 = ", myObject03);
}

Example.a = "a";
console.log("Amumu a = ", Example.a);
if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}