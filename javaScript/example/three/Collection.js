var Example = Example || {};

/**
 * @desc JavaScript HTML DOM集合(Collection)
 * 
 * 一、HTMLCollection对象
 * getElementsByTagName()方法返回HTMLCollection对象
 * HTMLCollection对象类似包含HTML元素的一个数组、
 * 示例:
 * //获取文档所有的<p>元素
 * var x = document.getElementsByTagName("p");
 * //集合中的元素可以通过索引(以0为起始位置)来访问
 * y = x[1];    //访问第二个<p>元素
 * 
 * 二、HTMLCollection对象length属性
 * HTMLCollection对象的length属性定义了集合中元素的数量
 * 示例:
 * var myCollection = doucment.getElementsByTagName("p");
 * document.getElementById(id).innerHTML = myCollection.length;
 * 集合length属性常用于遍历集合中的元素
 * 
 * 注意:
 * HTMLCollection不是一个数组
 * HTMLCollection看起来可能是一个数组,但其实不是
 * 你可以像数组一样,使用索引来获取元素
 * HTMLCollection无法使用数组的方法: valueOf(), pop(), push(), join等等
 * 
 * 三、HTML DOM节点列表
 * NodeList对象是一个从文档中获取的节点列表
 * NodeList对象类似HTMLCollection对象
 * 一些旧版本浏览器中的方法(如: getElementsByClassName()),返回的是NodeList对象,而不是HTMLCollection对象
 * 所有浏览器的childNodes属性返回的是NodeList对象
 * 大部分浏览器的querySelectorAll()返回NodeList对象
 * 示例:
 * //NodeList中的元素可以通过索引来访问(以0为起始位置)
 * var myNodeList = document.querySelectorAll("p");
 * //访问第二个<p>元素
 *  y = myNodeList[1];
 * 
 * 四、NodeList对象length属性
 * NodeList对象length属性定义了节点列表中元素的数量
 * 示例:
 * var myNodeList = docement.querySelectorAll("p");
 * document.getElementById(id).innerHTML = myNodeList.length;
 * 
 * NodeList节点列表不是一个数组
 * 节点列表看起来可能是一个数组,但其实不是
 * 你可以像数组一样,使用索引来获取元素
 * 节点列表无法使用数组的方法,例如: valuef(), pop(), jon等等
 * 五、HTMLCollection与NodeList的区别
 * HTMLCollection是HTML元素的集合
 * NodeList是一个文档节点的集合
 * NodeList与HTMLCollection有很多类似的地方
 * NodeList与HTMLCollection都与数组对象有点类似,可以使用索引来获取元素
 * NodeList与HTMLCollection都有lenght属性
 * HTMLCollection元素可以通过name,id或索引来获取,而NodeList只能通过索引来获取
 * 只有NodeList对象有包含属性节点和文本节点
 */
Example.Collection = function () {
    document.write(
        "<div id='div1'>" 
         + "<p>段落1</p>" 
        +"<p>段落2</p>" 
        + "<p>段落3</p>" 
        + "</div>"
    );

    console.log("Amumu div1 = ", document.getElementsByClassName("div1")); //Chrome浏览器: HTMLCollection; IE浏览器:Amumu div1 = [object HTMLCollection]

     //获取文档所有的<p>元素
     var x1 = document.getElementsByTagName("p");
     console.log("Amumu x1 = ", x1);
    //集合中的元素可以通过索引(以0为起始位置)来访问
     y1 = x1[1];    //访问第二个<p>元素
     console.log("Amumu y1 = ", y1);

     //NodeList中的元素可以通过索引来访问(以0为起始位置)
     var myNodeList = document.querySelectorAll("p");
     console.log("Amumu myNodeList = ", myNodeList);
     //访问第二个<p>元素
      y = myNodeList[1];
      console.log("Amumu y = ", y);

      //修改节点列表中所有<p>元素的背景颜色
      var i;
      for(i = 0; i < myNodeList.length; i++) {
          myNodeList[i].style.backgroundColor = "red";
      }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}