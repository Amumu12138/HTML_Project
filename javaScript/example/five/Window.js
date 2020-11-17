var Example = Example || {};

/**
 * @desc JavaScript Window浏览器对象模型
 * 浏览器对象模型(BOM)使JavaScript有能力与浏览器对话
 * 
 * 一、浏览器对象模型(BOM)
 * 浏览器对象模型尚无正式标准
 * 由于现代浏览器已经实现了JavaScript交互性方面的相同方法和属性,因此常被认为是BOM的方法和属性
 * 
 * 二、Window对象
 * 所有浏览器都支持window对象,它表示浏览器窗口
 * 所有JavaScript全局对象、函数以及变量均自动成为window对象的成员
 * 全局变量是window对象的属性
 * 全局函数是window对象的方法
 * 甚至HTML DOM的doucument也是window对象的属性之一
 * 示例； window.document => document
 * 
 * 三、Window尺寸
 * 有三种方法能够确定浏览器窗口的尺寸
 * 对于Internet Explorer、Chrome、Firefox、Opera以及Safari:
 * window.innerHeight: 浏览器窗口的内部高度(包括滚动条)
 * window.innerwidth: 浏览器窗口的内部宽度(包括滚动条)
 * 
 * 对于Internet Explorer8、7、6、5: 
 * document.ducumentElement.clientHeight/document.body.clientHeight
 * document.ducumentElement.clientwidth/doucment.body.clientWidth
 * 
 * 四、其它Window方法
 * 一些其它方法:
 * window.open()-打开新窗口
 * window.close()-关闭当前窗口
 * window.moveTo()-移动当前窗口
 * window.resizeTo()-调整当前窗口的尺寸
 */
Example.Window = function() {

}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}

