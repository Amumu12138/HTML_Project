var Example = Example || {};

/**
 * @desc JavaScript 计时事件
 * JavaScript一个设定的时间间隔之后来执行代码,我们称之为计时事件
 * 
 * 一、JavaScript计时事件
 * 通过使用JavaScript,我们有能力做到在一个设定的时间间隔之后来执行代码,而不是在函数被
 * 调用后立即执行,我们称之为计时事件
 * 1,setInterval(): 间隔指定的毫秒数不停地执行指定的代码
 * 2,setTimeout(): 在指定的毫秒数后执行指定代码
 * 注意: setInterval()和setTimeout() 时HTML DOM Window对象的两个方法
 * 
 * 二、setInterval()方法
 * setInterval 间隔指定的毫秒数不停地指定指定的代码
 * window.setInterval()方法可以不使用window前缀,直接俄使用函数setInterval()
 * setInterval()第一个参数是函数,第二个参数是间隔的毫秒数
 * 注意: 1000毫秒是一秒
 * 
 * 三、clearInterval()方法
 * clearInterval()方法用于停止setInterval()方法执行的函数代码
 * window.clearInterval()方法可以不使用window前缀,直接使用函数clearInterval()
 * 要使用clearInterval()方法,在创建计时方法时你必须使用全局变量,然后用clearInterval()方法来停止
 * 
 * 四、setTimeout()方法
 * setTimeout()方法会返回某个值,假如你希望取消这个setTimeout(),你可以使用这个值来指定它
 * setTimeout()的第一个参数是指定函数,第二个参数是毫秒数
 * 
 * 五、clearTimeout()方法
 * clearTimeout()方法用于停止执行setTimeout()方法的函数代码
 * window.clearTimeout()方法可以不使用window前缀,如果指定函数还未执行,你可以使用
 * clearTimeout()方法来停止执行函数代码
 */
Example.WindowTime= function() {
    console.log("Amumu WindowTime");

    myIntervalFun = setInterval(function() {
        console.log("Amumu WindowTime setInterval");
    }, 1000);

    myTimeoutFun = setTimeout(function(){
        console.log("Amumu WindwoTime setTimeout");
    }, 1000);

    clearInterval(myIntervalFun);
    clearTimeout(myTimeoutFun);
}   

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}

