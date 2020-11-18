var Example = Example || {};

/**
 * @desc JavaScript Window History
 * window history对象包含浏览器的历史
 * 
 * 一、window history
 * window.history对象在编写时可不使用window这个前缀
 * 为了保护用户隐私,对JavaScript访问该对象的方法做出了限制
 * history.back(): 与浏览器点击后退按钮相同
 * history.forward(): 与浏览器中点击向前安妮相同
 * 
 * 二、window history.back()
 * history.back()方法加载历史列表中的前一个URL
 * 这与在浏览器中点击后退按钮是相同的
 * 
 * 三、window history.forward()
 * history.forward()方法加载历史列表中的下一个URL
 * 这与浏览器中点击前进按钮是相同的
 * 
 * 四、history.go()
 * go(1):表示前进一个页面
 * go(-1): 表示后退一个页面
 * go(0): 表示刷新页面
 */
Example.WindowHistory= function() {
    console.log("Amumu WindowHistory");
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}

