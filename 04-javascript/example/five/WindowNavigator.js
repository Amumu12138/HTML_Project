var Example = Example || {};

/**
 * @desc JavaScript Window Navigator
 * window.navigator对象包含有关访问者浏览器的信息
 * 
 * 一、window navigator
 * window.navigator对象在编写时可不使用window这个前缀
 * navigator.appCodeName: 浏览器代号
 * navigator.appName: 浏览器名称
 * navigator.appVersion: 浏览器版本
 * navigator.cookieEnabled: 启用Cookies
 * navigator.platform: 硬件平台
 * navigator.useraAgent: 用户代理
 * navigator.systemLanguage: 用户代理语言
 * 
 * 二、警告
 * 来自navigator对象的信息具有误导性,不应该被用于检测浏览器版本
 * 原因:
 * 1,navigator数据可被哦浏览器使用者更改
 * 2,一些浏览器对测试站点会识别错误
 * 3,浏览器无法报告晚于浏览器发布的新操作系统
 * 
 * 三、浏览器检测
 * 由于navigator可误导浏览器检测,使用对象检测可用来嗅探不同的浏览器
 * 由于不同的浏览器支持不同的对象,你可以使用对象来检测浏览器,例如:
 * 由于只有Opera支持属性"window.opera",你可以据此识别出Opera浏览器
 */
Example.WindowNavigator = function() {
    console.log("Amumu WindowNavigator");

    console.log(`Amumu + 
    浏览器代号:${navigator.appCodeName},
    浏览器名称: ${navigator.appName},
    浏览器版本: ${navigator.appVersion},
    启用Cookies: ${navigator.cookieEnabled},
    硬件平台: ${navigator.platform},
    用户代理: ${navigator.userAgent},
    服务工作: ${navigator.serviceWorker}
    `);
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}

