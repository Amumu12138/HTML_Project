var Example = Example || {};

/**
 * @desc JavaScript 弹窗
 * 在JavaScript中创建三种消息框: 警告框、确认框、提示框
 * 
 * 一、警告框
 * 警告框经常用于确保用户可以得到某些消息
 * 当警告框出现后,用户需要点击确认按钮才能继续进行操作
 * window.alert()方法可以不带上windwow对象,直接使用alert()方法 
 *
 * 二、确认框
 * 确认框通常用于验证是否接受用户操作
 * 当确认框弹出时,用户可以点击"确认"或者"取消"来确定用户操作
 * 当你点击"确认",确认框返回true,如果点击"取消",确认框返回false
 * window.confirm()方法可以不带上window对象,直接使用confirm()方法
 * 
 * 三、提示框
 * 提示框经常用于提示用户在进入页面前输入某个值
 * 当提示框出现后,用户需要输入某个值,然后点击确认或取消按钮才能继续操作
 * 如果用户点击确认,那么返回值为输入的值,如果用户点击取消,那么返回值为null
 * window.prompt()方法可以不带上window对象,直接使用prompt()方法
 * 
 * 四、换行
 * 弹窗使用反斜杠 + n 来设置换行
 * 示例: alert("HELLE \n WORLD");
 */
Example.WindowDialog= function() {
    console.log("Amumu WindowDialog");

    window.alert("这是一个警告框");
    window.confirm("这是一个确认框");
    window.prompt("这是一个提示框");
}   

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}

