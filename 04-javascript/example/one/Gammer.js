var Example = Example || {};

/**
 * @desc JavaScript语法
 * 一、JavaScript字面量
 * 数字(Number):可以是整数或小数,或是科学计数(e) 例如:3.14, 1001, 123e5
 * 字符串(String):可以使用单引号或双引号 例如:"Amumu", 'John'
 * 表达式:用于计算 例如: 5+6, 5 * 10
 * 数组(Array): 定义一个数组 例如: [40, 100, 1, 6, 35]
 * 对象(Object): 定义一个对象 例如: {firstName: "Amumu", lastName: "Doc", age: 23, sex: man}
 * 函数（Function): 定义一个函数 例如: function myFunction(a, b) { return a * b; }
 * 二、JavaScript变量
 * 在编程语言中,变量用于存储数据值
 * JavaScrpit使用关键字var来定义变量,使用等号(=)来为变量赋值
 * 变量是一个名称,字面量是一个值
 * var x, length;
 * x = 5;
 * length = 0;
 * 三、JavaScript操作符
 * 赋值、算术、位运算符: = + - * /
 * 条件、比较及逻辑运算符: == != < >
 * JavaScript语句
 * JavaScript语句是发给浏览器的命令,这些命令的作用是告诉浏览器要做的事情
 * 四、分号
 * 分号用于分割JavaScript语句
 * 通常我们在每条可执行的语句结尾添加分号
 * 使用分号的另一用处是在一行中编写多条语句
 * 在JavaScript中,用分号来结束语句是可选的
 * 五、代码
 * JavaScript代码是JavaScript语句的序列
 * 浏览器按照编写顺序依次执行每条语句
 * 六、代码块
 * JavaScript可以分批地组合起来
 * 代码块以左花括号开始,以右花括号结束
 * 代码块的作用是一并地执行语句序列
 * 七、语句标识符
 * JavaScript语句通常以一个语句标识符开始,并执行该语句
 * 语句标识符是保留关键字不能作为变量名使用
 * 语句                         描述
 * break                    用于跳出循环
 * catch                    语句块,在try语句执行出错时执行catch语句块
 * continue                 跳过循环中的一个迭代
 * do...while               执行一个语句块,在条件语句位true时继续执行该语句块
 * for                      在条件语句位true时,可以将代码块执行指定的次数
 * for...in                 用于遍历数组或者对象的属性(对数组或者对象的属性进行循环操作)
 * function                 定义一个函数
 * if...else                用于基于不同的条件来执行不同的动作
 * return                   退出函数
 * switch                   用于基于不同的条件来执行不同的动作
 * throw                    抛出(生成)错误
 * try                      实现错误处理,与catch一同使用
 * var                      声明一个变量
 * while                    当条件语句位true时,执行语句块
 * 八、空格
 * JavaScript会忽略多余的空格,可以脚本添加空格,来提高其可读性
 * 九、JavaScript是脚本语言,浏览器会在读取代码时,逐行地执行脚本代码,
 * 而对传统编程语言来说,会在执行前对所有代码进行编译
 */
Example.Gammer = function () {
    var str = "Volvo";
    var num = 16;
    console.log(" str + num = ", str + num, "type = " + typeof (str + num));
    console.log(" num + str = ", num + str, "type = " + typeof (num + str));

    //在文本字符串中使用反斜杠(\)对代码进行换行
    document.write("HELLO \
    WORLD ");

    //JavaScript注释可用于提高代码的可读性
    /**
     * 1,单行注释用//
     * 2,多行注释用/**/

    // 养成一个好的习惯就是写注释
    // 方便你二次阅读,维护你的代码
    // 如果后面项目转手,也方便别人来理解你的代码和维护你的代码

    // 应用注释符号验证浏览器是否支持JavaScript脚本功能
    // 如果用户不能确定浏览器是否支持JavaScript脚本,那么可以应用HTML提供的注释符号进行验证。
    // HTML注释符号是以<--开始, -->结束的。如果在此注释符号内编写JavaScript脚本,对于不支持
    // JavaScript的浏览器,将会把编写的JavaScript的脚本作为注释处理
    document.write(`
        <script>    
        <!-- 
        document.write("你的浏览器支持JS脚本"); 
        -->
        </script>
    `);
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}