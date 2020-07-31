var Example = Example || {};

/**
 * @desc JavaScript函数
 * 一、定义
 * 函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块
 * 二、函数语法
 * 函数就是包裹在花括号中的代码块,前面使用了关键字function
 * 当调用该函数时,会执行函数内的代码
 * JavaScript对大小写敏感,关键字function必须是小写的,并且必须以与函数名称相同的大小写来调用函数
 * 三、调用带参数的函数
 * 在调用函数时,可以向其传递值,这些值称之为参数
 * 函数可以传递任意多的参数,由逗号(,)分隔
 * 当声明函数时,把参数作为变量来声明
 * 例如:
 * function myFunction(var1, var2) {}
 * 变量和参数必须以一致的顺序出现,第一个变量就是第一个被传递的参数的给定的值
 * 四、带有返回值的函数
 * 有时我们希望函数将值返回调用它的地方
 * 通过使用return语句就可以实现
 * 使用return语句时,函数就会停止执行,并返回指定的值
 * 注意:在使用renturn时,整个JavaScript并不会停止执行,仅仅是函数.JavaScript将继续执行代码,从调用函数的地方
 * 五、局部JavaScript变量
 * 在JavaScript函数内部声明的变量(使用var)是局部变量,所以只能在函数内部访问它。(该变量的作用域是局部的)
 * 你可以在不同的函数中使用名称相同的局部变量,因为只有声明过该表变量的函数才能识别出该变量
 * 只要函数运行完毕,本地变量就会被删除
 * 六、全局JavaScript变量
 * 在函数外声明的变量是全局变量,网页上的所有脚本和函数都能访问它
 * 七、JavaScript变量的生存期
 * JavaScript变量的生命期从它们被声明的时间开始
 * 局部变量会在函数运行以后被删除
 * 全局变量会在页面关闭后被删除
 * 八、向未声明的JavaScript变量分配值
 * 如果你把值赋给尚未声明的变量,该变量将被自动作为window的一个属性
 * 非严格模式下给未声明变量赋值创建的全局变量,是全局对象的可配置属性,可以删除.
 */
Example.Function = function () {

    //执行全选/全部取消
    document.write(`
        看书: <input type="checkbox" name="checkbox" value=1><br>
        写字: <input type="checkbox" name="checkbox" value=2><br>
        打飞机: <input type="checkbox" name="checkbox" value=3><br>
        玩游戏: <input type="checkbox" name="checkbox" value=4><br>
        <input type="button" value="全选" onclick="allcheck(this)">
    `);

    document.write(`
    <script>
        var checkAll = false;
        function allcheck(element) {
            checkAll = !checkAll;
            element.value = checkAll ? "全不选" : "全选";
            let inputs = document.getElementsByName("checkbox");
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = checkAll;
            }
        }
    </script>
    `)

};

var one = 1;
two = 2;

console.log("one before = ", this.one);
console.log("window one = ", window.one);
console.log("window two = ", window.two);

delete one;
console.log("one after = ", one);

delete two;
console.log("delete two = ", delete two);
// console.log("two after = ", two); //已经删除 报错变量未定义
if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}