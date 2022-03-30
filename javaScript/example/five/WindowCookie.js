var Example = Example || {};

/**
 * @desc JavaScript Cookie
 * Cookie用于存储web页面的用户信息
 * 
 * 一、介绍cookie
 * Cookie是一些数据,存储于你电脑上的文本文件中
 * 当web服务器向浏览器发送web页面时,在链接关闭后,服务端不会记录用户的信息
 * cookie的作用就是用于解决’如何记录客户端的用户信息‘
 * 1,当用户访问web页面时,它的名字可以记录在cookie中
 * 2,在用户下一次访问该页面时,可以在cookie中读取用户访问记录
 * cookie以键值对形式存储,当浏览器从服务器上请求web页面时,属于该页面的cookie会被
 * 添加到该请求中,服务端通过这种方式来获取用户的信息
 * 
 * 二、使用JavaScript创建cookie
 * JavaScript可以使用document.cookie属性来创建、读取以及删除cookie
 * JavaScript中,创建cookie如下所示: document.cookie = "username=Jhon Doe";
 * 你还可以为cookie添加一个过期时间,默认情况下,cookie在浏览器关闭时删除
 * 示例: document.cookie = "Jhon Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";
 * 你可以使用path参数告诉浏览器cookie的路径,默认情况下,cookie属于当前页面
 * 示例： document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
 * 
 * 三、使用JavaScript读取cookie
 * 在JavaScript中,可以使用 var x = document.cookie; 读取cookie
 * 注意: document.cookie 将以字符串的方式返回所有的 cookie，类型格式： cookie1=value; cookie2=value; cookie3=value;
 * 
 * 四、使用JavaScript修改cookie
 * 在JavaScript中, 修改cookie类似于创建cookie,旧的cookie将被覆盖
 * 
 * 五、使用JavaScript删除cookie
 * 删除cookie非常简单,你只需要设置expires参数为以前的时间即可
 * 示例: document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
 * 注意: 当你删除时不必指定cookie的值
 * 
 * 六、cookie字符串
 * document.cookie属性看起来像一个普通的文本字符,但其实不是。
 * document.cookie中写入一个完整的cookie字符串,当你重新读取该cookie信息时,cookie信息是
 * 以键值对的形式展示的。如果你设置了新的cookie,旧的cookie不会被覆盖,新的cookie将添加到
 * document.cookie将添加到ducument.cookie中。
 * 如果你需要查找一个指定cookie值,你必须创建一个JavaScript函数在cookie字符串中查找cookie值
 * 
 * 七、JavaScript Cookie实例
 * 1,设置cookie值的函数
 * 示例:
 *  function setCookie(cname, cvalue, exdays) {
 *      var d = new Date();
 *      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
 *      var expires = "expires=" + d.toGMTString();
 *      document.cookie = cname + "=" + cvalue + ";"  + expirse;
 * }
 *  以上的函数参数中，cookie的名称为cname,cookie的值为cvalue,并设置了cookie的过期时间expries
 * 
 * 2,获取cookie值得函数
 * cookie名的参数为cname
 * 创建一个文本变量用于检索cookie:cname+=;
 * 使用分号来分割document.cookie字符串,并将分割后的字符串数组赋值给ca;
 * 循环ca数组,然后读取数组中的每个值,并去除前后空格
 * 如果找到cookie,返回cookie的值,没有则返回""
 * 示例：
 *  function getCookie(cname) {
 *      var name = cname + "=";
 *      var ca = document.cookie.splict(";");
 *      for(var i = 0; i < ca.length; i++) {
 *          var c = ca[i].trim();
 *          if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
 *      }
 *      return "";
 *  }
 * 
 * 3,检测cookie值的函数
 * 创建一个检测cookie是否创建的函数
 * 如果设置了cookie,将显示一个问候信息;如果没有设置cookie,将会先hi一个弹窗用于询问访问者的名字,
 * 并调用setCookie函数将访问者的名字存储365天
 * function checkCookie() {
 *      var username = getCookie("username");
 *      if(username != "") {
 *          alert("Welcome again" + username);
 *      } else {
 *          username= prompt("Plase enter you name", "");
 *          if(username != "" && username != null) {
 *              setCookie("username", username, 365);
 *          }
 *      }
 * }
 */
Example.WindowCookie = function () {
    console.log("Amumu WindowCookie");

    //注意:必须当web服务器向浏览器发送web页面时才有效果,本地调用无效果
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
        }
        return "";
    }
    function checkCookie() {
        var user = getCookie("username");
        if (user != "") {
            alert("欢迎 " + user + " 再次访问");
        }
        else {
            user = prompt("请输入你的名字:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 30);
            }
        }
    }

    checkCookie();

    /**
//      * @desc 设置cookie
//      * @param {String} name 
//      * @param {String} value 
//      * @param {number} day 
//      */
    //     setCookie = function (name, value, day) {
    //         var date = new Date();
    //         date.setDate(date.getDate() + day);
    //         document.cookie = name + '=' + value + ';expires=' + date;
    //     }

    //     /**
    //      * @desc 获取cookie
    //      * @param {String} name 
    //      */
    //     getCookie = function (name) {
    //         var reg = RegExp(name + '=([^;]+)');
    //         var arr = document.cookie.match(reg);
    //         if (arr) {
    //             return arr[1];
    //         } else {
    //             return '';
    //         }
    //     }

    //     /**
    //      * @desc 删除cookie
    //      * @param {*} name 
    //      */
    //    delCookoe = function (name) {
    //         setCookie(name, null, -1);
    //     }

    //     setCookie("user", "ASDFGH", 7);
    //     setCookie("pswd", "123456", 7);
    //     console.log("Amumu user = " + getCookie("user") + " pswd = " + getCookie("pswd"));
}

if (typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}

