var Example = Example || {};

/**
 * @desc JavaScript 异步编程
 * 一、异步的概念 
 * 异步(Asynchronous,asyn)是与同步(Synchronous,sync)相对的概念
 * 在我们学习的传统单线程编程中,程序的运行是同步的(同步不意味着所有步骤同时进行,而是指步骤在
 * 一个控制流序列中按顺序执行).而异步的概念则是不保证同步的概念,也就是说,一个异步过程的执行将不再
 * 与原有的序列有顺序关系。
 * 简单理解来说:同步按你的代码顺序执行,异步不按代码顺序执行,异步的执行效果更高.
 * 通俗地解释一下异步:异步就是从主线程发射一个子线程来完成任务.
 * 
 * 二、什么时候用异步编程
 * 在前端编程中(甚至后端有时也是这样),我们在处理一些简短、快速的操作时,例如计算1+1的结果,往往在主线程中就可以
 * 完成.主线程作为一个线程,不能够同时接受多方面的请求,所以,当一个事件没有结束时,界面将无法处理其他请求。
 * 现在有一个按钮,如果我们设置它的onclick事件为一个死循环,那么当这个按钮按下,整个网页将失去响应
 * 为了避免这种情况的发生,我们常常用子线程来完成一些可能消耗事件足够长以至于被用户察觉的事情,比如读取了一个大文件
 * 或者发出一个网络请求。因为子线程独立于主线程,所以即使出现阻塞也不会影响主线程的运行,但是子线程有一个局限:一旦
 * 发射了以后就会与主线程失去同步,我们无法确定它的结束,如果结束之后需要处理一些事情,比如处理来自服务器的信息,我们
 * 是无法将它合并到主线程中去的。
 * 为了解决这个问题,javaScript中的异步操作函数往往通过回调函数来实现异步任务的结果处理
 * 
 * 
 * 三、回调函数
 * 回调函数就是一个函数,它是在我们启动一个异步任务的时候就告诉它:等你完成了这个任务之后要干什么,这样一来主线程几乎
 * 不用关心异步任务的状态了.他们自己会善始善终。
 * 例如:
 * function print() {
 *      console.log("Amumu print");
 * }
 * 
 * setTimeout(printn, 3000);
 * 上述程序中的setTimeout就是一个消耗时间3s的过程,它的第一个参数是个回调函数,第二个参数是毫秒数,这个函数执行之后会产生
 * 一个子线程,子线程会等待3秒,然后执行回调函数"print",打印日志"Amumu print"
 * 
 * 四、异步AJAX
 * 除了setTimeout函数以外,异步回调广泛应用于AJAX编程.
 * XMLHttpRequest常常用于请求来自远程服务器上的XML或JSON数据
 * 补充:
 * XMLHttpRequest的onload和onerror属性都是函数,分别在它请求成功和请求失败时被调用。
 * 
 * 五、Promise介绍
 * Promise是一个ECMAScript6提供的类,目的是更加优雅地书写复杂的异步任务
 * 由于Promise时ES6新增的,所以一些旧的浏览器并不支持,苹果的Safari 10 和 Windows的Edge 14
 * 版本以上浏览器才开始支持ES6特性
 * 
 * 六、Promise的使用
 * 1,Promise构造函数只有一个参数,是一个函数,这个函数在构造之后会直接被异步运行,所以我们称之为
 * 起始函数,起始函数包含两个参数resolve和reject
 * 2,resolve和reject都是函数,其中调用resolve代表一切正常,reject是出现异常时所调用的
 * 3,Promise类有.then()、.catch()和.finally()三个方法,这三个方法的参数都是一个函数,.then()可以
 * 将参数中的函数添加到当前Promise的正常执行序列,.catch()则是设定Promise的异常处理序列,.finally()
 * 是在Promise执行的最后一定会执行的序列。.then()传入的函数会按顺序依次执行,有任何异常都会直接跳到
 * catch序列
 * 4,resolve()中可以放置一个参数用于向下一个then传递一个值,then中的函数也可以返回一个值传递给then。
 * 但是,如果then中返回的是一个Promise对象,那么下一个then将相当于对这个返回的Promise进行操作.
 * reject()参数中国一般会传递一个异常给之后的catch函数用于处理异常
 * 但请注意以下两点:
 * a.resolve和reject的作用域只有起始函数,不包括then以及其他序列
 * b,resolve和reject并不能够使起始函数停止运行,别忘了return
 * 
 * 七、异步函数
 * 异步函数是ES2017标准的规范,几乎被所有的浏览器所支持,除了Internet Explorer
 * 异步函数async function中可以使用await指令,await指令后必须跟着一个Promise,
 * 异步函数会在这个Promise运行中暂停,直到其运行结束再继续运行
 * 异步函数实际上原理与Promise原生API的机制是一模一样的,只不过更便于程序员阅读
 */
Example.Asynchronous = function () {
    //XMLHttpRequest请求实例
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        //输出接收到的文字信息
        console.log("Amumu Asynchronous data = ", xhr.responseText);
    }

    xhr.onerror = function () {
        console.log("Amumu Asynchronous onerror");
    }

    //发送异步GET请求
    xhr.open("GET", "https://www.runoob.com/try/ajax/ajax_info.txt", true); //跨域请求失败
    xhr.send();

    //Promise实现
    new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("First");
            resolve();
        }, 1000);
    }).then(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("Second");
                resolve();
            }, 4000);
        });
    }).then(function () {
        setTimeout(function () {
            console.log("Third")
        }, 3000);
    });

    //Promise第二个实例
    new Promise(function (resolve, reject) {
        var a = 0;
        var b = 0;
        if (b == 0) reject("Diveide zero");
        else resolve(a / b);
    }).then(function (value) {
        console.log("Amumu Promise a / b = ", value);
    }).catch(function (err) {
        console.log("Amumu Promise err = ", err);
    }).finally(function () {
        console.log("End");
    });
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}