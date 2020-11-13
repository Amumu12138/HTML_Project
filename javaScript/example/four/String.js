var Example = Example || {};

/**
 * @desc JavaScript String 字符串对象
 * String对象用于处理已有的字符串
 * 
 * 一、JavaScript字符串
 * 一个字符串用于存储一系列字符就像"John Doe"
 * 一个字符串可以使用单引号或双引号
 * 你使用位置(索引)可以访问字符串中任何的字符
 * 字符串的索引从0开始,所以字符串第一字符为[0],第二字符为[1],依次类推
 * 
 * 二、长度
 * 字符串使用长度属性length来计算字符串的长度
 * 
 * 三、在字符串中查找字符串
 * 字符串使用indexOf()来定位字符串中某一个指定的字符首次出现的位置
 * 如果没找到对应的字符函数返回-1
 * lastIndexOf()方法在字符串末尾开始查找字符串出现的位置
 * 
 * 四、内容匹配
 * match()函数用来查找字符串中特定的字符,并且如果找到的话,则返回这个字符
 * 
 * 五、替换内容
 * replace()方法在字符串中用某些字符替换另一些字符
 * 
 * 六、字符串大小写转换
 * 字符串大小写转换使用函数toUpperCase()/toLowerCase()
 * 
 * 七、字符串转为数组
 * 字符串使用split()函数转为数组
 * 
 * 八、特殊字符
 * JavaScript中可以使用饭斜线(\)插入特殊符号,如: 撇号、引号等其他特殊符号
 * 在JavaScript中,字符串的开始和停止使用单引号或双引号.
 * 下表列出使用反斜线转义特殊字符
 * 代码                             输出
 * \'                              单引号
 * \"                              双引号
 * \\                              斜杆
 * \n                               换行
 * \r                               回车
 * \t                               tab
 * \b                               空格
 * \f                               换页
 * 
 * 九、字符串属性和方法
 * a,属性: length,prototype,constructor
 * b,方法:
 * charAt()、charCodeAt()、concat()等等
 */
Example.String = function() {
    console.log("------ Amumu String -------");
}

if(typeof module !== "undefined"){
    module.export = Example[Object.keys(Example)[0]];
}