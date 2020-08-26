var Example = Example || {};

/**
 * @desc JavaScript 表单
 * HTML表单验证可以通过JavaScript来完成
 * 
 * 一、数据验证
 * 数据验证用于确保用户输入的数据是有效的
 * 典型的数据验证有:
 * a,必需字段是否有输入
 * b,用户是否输入了合法的数据
 * c,在数字字段是否输入了文本
 * 大多数情况下,数据验证用于确保用户正确输入数据
 * 数据验证可以使用不同的方法来定义,并通过多种方式来调用
 * 服务端数据验证是在数据提交到服务器上后再验证
 * 客户端数据验证是在数据发送到服务端前,在浏览器上完成验证
 * 
 * 二、HTML约束验证
 * HTML5新增了HTML表单的验证方式:约束验证
 * 约束验证时表单被提交时浏览器用来实现验证的一种算法
 * HTML约束验证基于:
 * a,HTML输入属性
 * b,CSS伪类选择器
 * c,DOM属性和方法
 * 约束验证HTML输入属性
 * 属性                         描述
 * disabled                 规定输入的元素不可用
 * max                      规定输入元素的最大值
 * min                      规定输入元素的最小值
 * pattern                  规定输入元素值的模式
 * required                 规定输入元素字段是必需的
 * type                     规定输入元素的类型
 * 约束验证CSS伪类选择器
 * 属性                          描述
 * disabled                 选取属性为“disabled”属性的input元素
 * invalid                  选取无效的input元素
 * optional                 选择没有"required"属性的input属性
 * required                 选择有"required"属性的input属性
 * valid                    选取有效值的input元素、
 * 
 * 三、表单验证
 * javaScript可用来在数据被送往服务器前对HTML表单中的这些输入数据进行验证
 * 表单数据经常需要使用JavaScript来验证其正确性:
 * a,验证表单数据是否为空
 * b,验证输入是否是一个正确的email地址
 * c,言则日期是否输入正确
 * d,验证表单输入内容是否为数字型
 * 
 * 四、必填/必选项目
 * 在用来检查用户是否已填写表单中的必填/必选项目:假如必填/必选项为空,那么警告框就会弹出,
 * 并且函数的返回值为false,否则函数的返回值则为true
 * 
 * 五、email验证
 * 检查输入的数据是否符合电子邮件地址的基本语法
 * 意思就是说,输入的数据必须包含`@`符号和`.`符号。同时`@`不可以是邮件地址的首字符，并且`@`之后需有
 * 至少一个点号
 */
Example.ValidateForm = function () {
    //用于判断表单字段fname值是否存在,如果不存在就弹出信息,阻止表单提交
    document.write(`
        <script>
            function validateFrom() {
                var x = document.froms["myFrom"]["fname"].value;
                if(x == null || x == "") {
                    alert("输入为空!");
                    return;
                }
            }
        </script>
    `);

    document.write(`
        <form name="myForm" action="demo.php" onsubmit="return validateFrom()" method="post">
        名字: <input type="text" name="fname">
        <input type="submit" value="提交">
        </form>
    `);

    //email验证
    document.write(`
        <script>
            function validateForm() {
                var x = document.forms["myForm"]["email"].value;
                var atpos = x.indexOf("@");
                var dotpos = x.lastIndexOf(".");
                if(atopx < 1 || dotpos < atpos + 2 || dotpos + 2 > x.length) {
                    alert("不是有效的e-mail地址");
                    return false;
                }
            }
        </script>
    `);

    document.write(`
        <form name="myForm" action="demo-form.php" onsubmit="return validateForm();" method="post">
        Email: <input type="text" name="email">
        <input type="submit" value="email地址提交">
        </form>
    `);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}