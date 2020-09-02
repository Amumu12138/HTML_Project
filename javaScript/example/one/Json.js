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
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}