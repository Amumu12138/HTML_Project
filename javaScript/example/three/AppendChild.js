var Example = Example || {};

/**
 * @desc JavaScript HTML DOM节点(如何向文档中添加和移除元素节点)
 * 
 * 一、创建新的HTML元素(节点)-appendChild()
 * 要创建新的HTML元素节点需要先创建一个元素,然后在已存在的元素中添加它,用于添加新元素到尾部
 * 示例: element.appendChild(id);
 * 
 * 二、创建新的HTML元素节点-insertBefore()
 * 如果需要将新元素添加到开始位置,可以使用insertBefore()方法
 * 示例: element.insertBefore(para, child);
 * 
 * 三、移除已存在的元素
 * 要移除一个元素,需要知道该元素的父元素
 * 注意:早期的Internet Explorer浏览器不支持node.remove()方法
 * 示例: element.removeChild(child);
 * 
 * 四、替换HTML元素-replaceChild方法
 * 使用replaceChild()方法来替换HTML DOM中的元素
 * 
 */
Example.AppendChild = function () {
   
    document.write(`
        <button id="appendChild-btn">appencChild添加</button>
        <button id="insertBefore-btn">insertBefore添加</button>
        <button id="removeChild-btn">removeChild移除</button>
        <button id="replaceChild-btn">replaceChild移除</button>
        <div id="div1">
        <p id="p1">这是一个段落</p>
        <p id="p2">这是另外一个段落</p>
        </div>
    `);

    //注册监听事件
    document.getElementById("appendChild-btn").addEventListener("click", appendChild);
    document.getElementById("insertBefore-btn").addEventListener("click", insertBefore);
    document.getElementById("removeChild-btn").addEventListener("click", removeChild);
    document.getElementById("replaceChild-btn").addEventListener("click", replaceChild);

     //创建新的HTML元素-appendChild方法
    function appendChild() {
        var para = document.createElement("p");
        var node = document.createTextNode("这是一个新的段落");
        para.appendChild(node);
        //para设置id,修改样式,修改文本
        para.id = "p3";
        para.style.fontSize = "20px";
        para.innerHTML = "这是一个段落123";

        var element = document.getElementById("div1");
        element.appendChild(para);
    }

    //创建新的HTML元素-insertBefore方法
    function insertBefore() {
        var insertPara = document.createElement("p");
        var insertNode = document.createTextNode("这是insertBefore创建的段落");
        insertPara.appendChild(insertNode);

        var element = document.getElementById("div1");
        var child = document.getElementById("p1");
        element.insertBefore(insertPara, child);
    }
 
    //移除已存在的元素-removeChild方法
    function removeChild() {
        var removeParent = document.getElementById("div1");
        var removeChild = document.getElementById("p1");
        removeParent.removeChild(removeChild);
    } 
    
    //替换HTML元素-replaceChild方法
    function replaceChild() {
        var replacePara = document.createElement("p");
        var replaceNode = document.createTextNode("又是一个新的段落456");
        replacePara.appendChild(replaceNode);

        var parent = document.getElementById("div1");
        var replaceChild = document.getElementById("p2");
        parent.replaceChild(replacePara, replaceChild);
    }
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}