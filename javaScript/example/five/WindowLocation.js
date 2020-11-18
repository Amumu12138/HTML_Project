var Example = Example || {};

/**
 * @desc JavaScript Window Location
 * window location对象用于获得当前页面的地址(URL), 并把浏览器重定向到新的页面
 * 
 * 一、window location
 * window.location对象在编写时可不使用window这个前缀
 * location.hostname返回web主机的域名
 * location.pathname返回当前页面的路径和文件名
 * location.port返回web主机的端口
 * location.protocol返回所使用的web协议(http/https)
 * 
 * 二、window location href
 * location href属性返回当前页面的URL
 * 
 * 三、window location pathname
 * location pathname属性返回URL的路径名
 * 
 * 四、window location assign
 * location assign() 方法加载新的文档
 * 注意: 
 * window.location.assign(url): 加载URL指定新的HTML文档。就相当于一个链接,跳转到指定的url,当前页面会
 * 转为新页面内容,可以点击后退返回上一个页面
 * window.location.replace(url): 通过加载URL指定的文档来替换当前文档,这个方法是替换当前窗口页面,前后
 * 两个页面功用一个窗口,所以没有后退返回上一页面
 */
Example.WindowLocation = function() {
    console.log("Amumu WindowLocation");
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}

