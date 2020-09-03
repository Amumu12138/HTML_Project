var Example = Example || {};

/**
 * @desc JavaScript JSON
 * JSON是用于存储和传输数据的格式
 * JSON通常用于服务端向网页传递数据
 * 
 * 一、介绍JSON
 * 1,JOSN英文名全称JavaScript Object Notation
 * 2,JSON是一种轻量级的数据交换格式
 * 3,JSON是独立的语言
 * 4,JSON易于理解
 * 注意:JSON使用JavaScript语法,但是JSON格式仅仅是一个文本
 * 文本可以被任何编程语言读取及作为数据格式传递
 * 
 * 二、JSON语法规则
 * 1,数据为键/值对
 * 2,数据由逗号分隔
 * 3,大括号保存对象
 * 4,方括号保存数组
 * JSON数据:一个名称对应一个值(键/值对包括字段名称，后面一个冒号，然后是值)
 * 
 * 三、JSON对象和JSON数组
 * 1,JSON对象保存再大括号内,就像在JavaScript中,对象可以保存多个键/值对
 * 例如:{"name": "Amumu" "url": "www.Amumu.com"}
 * 2,JSON数组保存在中括号内,就像JavaScript中,数组可以包含对象
 * 例如:
 * "sites":[
 *  {"name": "Runoob", "url": "www.runoob.com"},
 *  {"name": "Google", "url": "www.google.com"},
 *  {"name": "TaoBao", "url": "www.taobao.com"}
 * ]
 * 
 * 四、JSON字符串转换为JavaScript对象
 * 通常我们从服务器中读取JSON数据,并在网页中显示数据
 * 利用JavaScript内置函数JSON parse()将字符串转换为JavaScript对象
 *
 * 相关函数                         描述
 * JSON parse()                 用于将一个JSON字符串转换为JavaScript对象
 * JSON stringify()             用于将JavaScript值转换为JSON字符串
 * 
 * 五、void(0)含义
 * javascript:void(0)中最关键的是void关键字,void是javascript种非常重要的关键字,
 * 该操作符指定要计算一个表达式但是不返回值
 * 例如:
 * void func()
 * javascript: void func()
 * 
 * 六、href='#'与href='javascript:void(0)'的区别
 * #包含了一个位置信息,默认的瞄是#top也就是网页的上端
 * 而javascript:void(0),仅仅表示一个死链接
 * 在页面很长的时候会使用#来定位页面的具体位置,格式为:#+id
 * 
 */
Example.Json = function () {
    //将JOSN字符串转换为JavaScript对象 利用JOSN parse()函数
    document.write(`
        <h2>将JOSN字符串转换为JavaScript对象</h2>
        <p id="demo"></p>
    `);

    document.write(`
    <script>
        var text = '{"sites": [' +
            '{"name": "Runoob", "url": "www.runoob.com"},' + 
            '{"name": "Google", "url": "www.google.com"},' +
            '{"name": "TaoBao", "url": "www.taobao.com"}] }';

        obj = JSON.parse(text);
        document.getElementById("demo").innerHTML = obj.sites[1].name + " " + obj.sites[1].url;
    </script>
    `);

    //实现javascript:void(0)
    document.write(`
        <a href="javascript:void(0)">点击此处什么也不会发生</a>
        <br>
    `);

    window.location.href = "javascript: void(0)";

    document.write(`
        <a href="#pos">点我定位到指定位置</a>
        <br>
    `);

    document.write(`
        <p id="pos">尾部定位点</p>
    `);
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}