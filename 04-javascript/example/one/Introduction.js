var Example = Example || {};

/**
 * @desc JavaScript简介
 * JavaScript已经由ECMA(欧洲电脑制造商协会)通过ECMAScript实现语言的标准化
 * 1997年   ECMAScript1     第一个版本
 * 1998年   ECMASCript2     版本变更
 * 1999年   ECMAScript3     添加正则表达式、天啊及try/catch
 * 年份不明  ECMAScript4    没有发布
 * 2009年   ECMAScript5     添加'strict mode',严格模式、添加JSON支持
 * 2011年   ECMAScript5.1   版本变更
 * 2015年   ECMAScript6     添加类和模块
 * 2016年   ECMAScript7     增加指数元素符(**)、增加Array.prototype.includes
 */
Example.Introduction = function () {
    //判断输入是否是数字
    document.write(`<p>请输入数字,如果输入值不是数字,浏览器会弹出提示框</p>`);
    document.write(`<input id="demo" type="text"></input>`);
    document.write(`<script>
        function inputFunction() {
            var x = document.getElementById("demo").value;
            if(isNaN(x)||x.replace(/(^\s*)|(\s*$)/g,"")==""){
                alert("输入不是数字");
            } else {
                alert("输入是数字");
            }
        }
    </script>`);
    document.write(`<button type="button" onclick="inputFunction()">判断结果</button>`);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}