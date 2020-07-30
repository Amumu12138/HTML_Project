var Example = Example || {};

/**
 * @desc JavaScript变量
 * 变量是用于存储信息的"容器"
 * 一、与代数一样,JavaScript变量可用于存放值(比如x=5)和表达式(比如z=x+y)
 * 变量可以使用短名称(比如x、y),也可以使用描述性更好的名称(比如age、sum、num)
 * a,变量必须以字母开头
 * b,变量也能以$和_符号开头(不推荐)
 * c,变量名称对大小写敏感(y和Y是不同的变量)
 * 二、数据类型
 * JavaScript变量还能保存其他数据类型,比如文本值(name = "Amumu")
 * 在JavaScript中,类似"Amumu"这样一条文本被称为字符串
 * 当用变量分配文本值时,应该用双引号或单引号包围这个值
 * 当用变量赋值数值时,不要使用引号
 * 三、声明变量
 * 在JavaScript中创建变量通常称为声明变量
 * 我们使用var关键字来声明变量(例如 var a;)
 * 变量声明后,该变量是空的(它没有值)
 * 一个好的编程习惯是,在代码的开始处,统一对需要的变量进行声明
 * 四、空值
 * 在计算机程序中,经常会声明无值的变量.未使用值来声明的变量,其值实际上是undefined
 * 五、重新声明
 * 如果重新声明JavaScript变量,该变量值不会改变
 * 
 */
Example.Variable = function () {
    var name = "Amumu";
    console.log("name before = ", name);
    var name;
    console.log("name after = ", name);
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}