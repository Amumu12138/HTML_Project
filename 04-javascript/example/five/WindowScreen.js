var Example = Example || {};

/**
 * @desc JavaScript Window Screen
 * window screen对象包含有关用户屏幕的信息
 * 
 * 一、Window Screen
 * window.screen对象在编写时可以不使用window这个前缀
 * 属性: 
 * screen.availWidth: 可用的屏幕宽度
 * screen.availHeight: 可用的屏幕高度
 * 
 * 二、可用宽度
 * screen.availwidth属性返回访问者屏幕的宽度,以像素计,减去界面特性,比如窗口任务栏
 * 
 * 三、可用高度
 * screen.availHeight 属性返回访问者屏幕的高度，以像素计，减去界面特性，比如窗口任务栏。
 */
Example.WindowScreen = function() {
    console.log("Amumu availWidth = ", window.screen.availWidth, " availHieght = ", window.screen.availHeight);

    window.onresize = function(data) {
        console.log("Amumu data = ", data);
        console.log("Amumu WindowScreen onresize width = ", screen.availWidth);
        console.log("Amumu WindowScreen onresize height = ", screen.availHeight);
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}

