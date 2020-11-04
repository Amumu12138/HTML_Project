var Example = Example || {};

/**
 * @desc JavaScript HTML DOM EventListener
 * 一、addEventListener()方法
 * a,addEventListener()方法用于向指定元素添加事件句柄
 * b,addEventListener()方法添加的事件句柄不会覆盖已存在的事件句柄
 * c,你可以向一个元素添加多个事件句柄
 * d,你可以向同一个元素添加多个同类型的事件句柄
 * e,你可以向任何DOM对象添加事件监听,不仅仅是HTML元素,还包括"window对象"
 * f,addEventListener()返回方法可以更简单的控制事件(冒泡和捕获)
 * g,当你使用addEventListener()方法时,JavaScript从HTML标记中分离开来,可读性更强,
 * 在没有控制HTML标记时也可以添加事件监听
 * h,你可以使用removeEventListener()方法来移除事件的监听
 * 
 * 示例:
 * <button id="myBtn"></button>
 * document.getElementById("myBtn").addEventListener("click", displayDate);
 * 
 * 二、语法
 * element.addEventListener(event, function, useCapture);
 * 第一个参数是事件的类型(如"click"、"mousedown")
 * 第二个参数是事件触发后调用的函数
 * 第三个是个布尔值,用于描述事件是冒泡还是捕获,该参数是可选的
 * 注意:不要使用"on"前缀,例如,使用click而不是使用onclick
 * 
 * 三、向原元素添加事件句柄
 * 示例: element.addEventListener("click", function(){ alert("HELLO WORLD"); });
 * 
 * 四、向一个元素中添加多个事件句柄
 * addEventListener()方法允许向同一个元素添加多个事件,且不会覆盖已存在的事件
 * 示例:
 * element.addEventListener("mousedown", downFun());
 * element.addEventListener("click", clickFun());
 * element.addEventListener("mouseup", upFun());
 * 
 * 五、向window对象添加事件句柄
 * addEventListener()方法允许你在HTML DOM对象添加事件监听,HTML DOM对象如: HTML元素,HTML文档、
 * window对象.或者其他支出的事件对象，如xmlHttpRequest对象等
 * 
 * 示例:
 * //当用户重置窗口大小时添加事件监听
 * window.addEventListener("resize", function() {
 *      document.getElementById("demo").innerHTML = sometext;
 * });
 * 
 * 六、事件冒泡或事件捕获
 * 事件传递有两种方式：冒泡与捕获
 * 事件传递定义了元素事件触发的顺序,如果你将<p>元素插入到<div>元素中,用户点击<p>元素,哪个元素的"click"事件先触发:
 * a,在冒泡中,内部元素的事件先被触发,然后再触发外部元素,即<p>元素的点击事件先触发,然后会触发<div>元素的点击事件
 * b,在捕获中,外部元素的事件会先被触发,然后才会触发内部元素的事件,即<div>元素的点击事件先触发,然后再触发<p>元素的点击事件
 * 注意: addEventListener()方法可以指定"useCapture"参数来设置传递类型,默认值未false,即冒泡传递,当值未true时,事件使用捕获传递
 * 
 * 注意:IE8及更早IE版本,Opera7.0及更早版本不支持addEventListener()和removeEventListener()方法。但是,对于这类浏览器版本可以使用
 * attachEvent()方法添加监听事件和detachEvent()方法开移除事件句柄
 */
Example.EventListener = function () {
    //当用户重置窗口大小时添加事件监听
    window.addEventListener("resize", function() {
        console.log("Amummu EventListener innerWidth = ", window.innerWidth, " innerHeight = " , window.innerHeight);
    });

    //跨浏览器解决方法,元素绑定监听事件
    function bind(obj, eventStr, callback) {
        //在支持addEventListener的浏览器情况中
        if(obj.addEventListener) {
            obj.addEventListener(eventStr, callback, false);
            console.log("Amumu EventListener addEventListener click");
        } else {
            //在IE8及以下浏览器
            obj.attachEvent("on" + eventStr, function() {
                if(callback) callback();
                console.log("Amumu EventListener attachEvent click");
            });
        }
    }

    //测试案例
    document.write(`<p id="bing-btn">bing绑定</p>`);
    var btn = document.getElementById("bing-btn");
    bind(btn, "click", function() {
        console.log("Amumu EventListener bing-btn click");
    })

};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}