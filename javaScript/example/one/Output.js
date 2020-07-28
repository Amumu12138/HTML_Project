var Example = Example || {};

/**
 * @desc JavaScript输出
 * 1,使用window.alert()弹出警告框
 * 2,使用document.write()方法将内容写到HTML文档中
 * 3,使用innerHTML写入到HTML元素
 * 4,使用console.log()写入到浏览器的控制台
 */
Example.Output = function () {
    //并行HTML表格格式
    /**
     *  <table>
        <tr>
            <form method="post" action="personinfoAction">
                <button type="submit" class="btn btn-default List-group-item">账户信息</button>
            </form>
        </tr>
        <tr>
             <form method="post" action="">
                <button type="submit" class="btn btn-default List-group-item">驾照认证</button>
            </form>
        </tr>
         <tr>
            <button type="submit" class="btn btn-default List-group-item">我的订单</button>
        </tr>
    </table>
     */
    //根据并行按钮点击实现js输出方式
    document.write(`
    <table>
        <tr>
            <button type="submit"  onclick="outAlert()">alert输出</button>
        </tr>
        <tr>
            <button type="submit" onclick="outWrite()">write输出</button>
        </tr>
        <tr>
            <button type="submit" onclick="outInnerHTML()">inner输出</button>
        </tr>
        <tr>
            <button type="submit" onclick="outLog()">log输出</button>
        </tr>
    </table>
    <p id="demo">修改前的段落</p>
    `)

    //写入方法
    document.write(`
        <script>
            //弹出警告框
            function outAlert() {
                window.alert("alert弹框输出");
            }

            //将内容写到HTML文档中
            function outWrite() {
                document.write(Date());
            }

            //操纵HTML元素
            function outInnerHTML() {
                document.getElementById("demo").innerHTML = "段落已经修改！";
            }

            //写入到浏览器的控制台
            function outLog() {
                console.log("log打印控制台输出");
            }
        </script>
    `)
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}