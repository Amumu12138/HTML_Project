var Example = Example || {};

/**
 * @desc JavaScript 代码规范
 * 所有的JavaScript项目适用同一种规范
 * 
 * 一、JavaScript代码规范
 * 代码规范通常包括以下几个方面:
 * 1,变量和函数的命名规则
 * 2,空格、缩进、注释的使用规则
 * 3,其他常用规范
 * 规范的代码可以更易于阅读与维护
 * 代码规范一般在开发前规定,可以跟你的团队成员来协商设置
 * 
 * a,变量名
 * 变量名推荐使用驼峰来命令
 * 例如: firstName, InputTxt
 * 
 * b,空格与运算符
 * 通常运算符(=+-*'/)前后需要添加空格
 * 
 * c.代码缩进
 * 通常使用4个空格符号来缩进代码块
 * 注意:不推荐使用TAB键来缩进,因为不同编辑器TAB键的解析不一样
 * 
 * d.语句规则
 * 简单语句的通用规则
 * 一条语句通常以分号作为结束符
 * 复杂语句的通用规则:
 * 1,将左花括号放在第一行的结尾
 * 2,左花括号前添加一空格
 * 3,将右花括号独立放在一行
 * 4,不要以分号结束一个复杂的声明
 * 
 * e,对象规则
 * 对象定义的规则:
 * 1,将左花括号与类名放在同一行
 * 2,冒号与属性值间有个空格
 * 3,字符串使用双引号,数字不需要
 * 4,最后一个属性-值对后面不要添加逗号
 * 5,将右花括号独立放在一行,并以分号作为结束符号
 * 
 * f,每行代码字符小于80
 * 为了便于阅读每行字符数小于80个
 * 如果一个JavaScript语句超过了80个字符,建议在运算符或者逗号后换行
 * 
 * 二、命名规则
 * 一般跟多代码语言的命名规则都是类似的,例如:
 * 1,变量和函数为小驼峰法标识,即除第一个单词之外,其他单词首字母带大写
 * 2,全局变量为大写
 * 3,常量为大写
 * HTML和CSSS的横杠(-)字符
 * HTML5属性可以以data-作为前缀(例如: data-quantity)
 * CSS使用-来来连接属性名(例如: font-size)
 * 注意:(-)符号通常在JavaScript中被认为是减法,所以不允许使用
 * 下划线:很多程序员比较喜欢使用下划线,特别是在SQL数据库中(例如:data_of_birth)
 * PHP语言通常都使用下划线
 * 帕斯卡拼写法:在C语言中用的较多(例如:PascalCase)
 * 驼峰法:JavaScript中通常推荐使用驼峰法,jQuery及其他JavaScript库都使用驼峰法
 * 注意:变量名不要以$作为开始标记,会与很多JavaScript库冲突
 * 
 * 三、HTML载入外部JavaScript文件
 * 使用简洁的格式载入JavaScript文件(type属性不是必须的)
 * 例如:<script scr="myscript.js"></script>
 * 
 * 四、使用JavaScript访问HTML元素
 * 一个糟糕的HTML格式可能会导致JavaScript执行错误
 * HTML与JavaScript尽量使用相同的命名规则
 * 
 * 五、文件扩展名
 * HTML文件后缀可以是.html(或.htm)
 * CSS文件后缀是.css
 * javaScript文件后缀是.js
 * 
 * 六、使用小写文件名
 * 大多Web服务器(Apache,Unix)对大小写敏感: london.jpg不能通过London.jpg访问
 * 其他Web服务器(Microsoft.IIS)对大小写不敏感:london.jpg可以通过London.jpg或london.jpg访问
 * 你必须保持统一的风格,我们建议统一使用小写的文件名
 */
Example.CodeSpecification = function () {
    console.error("Amumu CodeSpecification data = ", new Date());
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}