var Example = Example || {};

/**
 * @desc JavaScript 保留关键字
 * 在JavaScript中,一些标识符是保留关键字,不能用作变量名或函数名
 * 一、保留关键字
 * javaScript的保留关键字不可以用作变量、标签或者函数名.有些保留关键字是作为
 * javaScript以后扩展用
 * 例如: 
 * abstract 抽象  arguments 参数    boolean 布尔类型    break 跳出  byte 字节
 * case 条件语句关键字 catch 调试语句关键字 char 字符 class 类  const 常量定义
 * continue 跳出语句关键字 debugger 断点 default 默认 delete 删除 do 执行
 * double 双精度浮点类型 else 条件语句关键字 enum 枚举 eval 评估 export 导出
 * extends 继承 false 布尔类型关键字 final 最终 finally 调试语句关键字 float 单精度浮点类型
 * for 循环语句关键字 function 函数定义 goto 跳转 if 条件语句关键字 implements 接口实现
 * import 导入 in 循环语句关键字 instanceof 转换 int 整数类型 interface 接口
 * let 变量定义 long 长整型 native 原生 new 新建 null 空类型 
 * package 包定义 priavte 私有的 protected 受保护的 public 公有的 return 返回
 * short 短整型 static 静态的 super 非常的 switch 条件语句关键字 synchronized 同步类型
 * this 表示当前对象的一个引用 throw 抛出异常 throws 抛出 transient 短暂的 true 布尔类型关键字
 * try 试图,抛出异常关键字 typeof 类型 var 变量定义 void 无类型 volatile 易变的
 * while 循环语句关键字 with 与 yield 使生成器函数执行暂停
 * 
 * 二、对象、属性和方法
 * Array 数组 Date 日期 eval 评估 function 函数 hasOwnProperty 是否拥有这个属性
 * Infinity 无限 isFinite 检查其参数是否是无穷大 isNaN 是否是NaN值 isPrototypeOf 指示对象是否存在于另一个对象的原型链中 length 数组长度
 * Math 数学类关键字 NaN 空值 name 名字 Number 数字类型 Object 对象类型
 * prototype 原型对象 String 字符串类型 toString 转换为字符串类型 undefined 空值类型 valueOf 返回 Array 对象的原始值
 * 
 * 三、Java保留关键字
 * JavaScript经常与Java一起使用,需要避免使用一些Java对象和属性作为JavaScript标识符
 * getClass、java、JavaArray、javaClass、JavaObject、JavaPackage
 * 
 * 四、windows保留关键字
 * JavaScript可以在HTML外部使用,它可在许多其它应用程序中作为编程语言使用
 * 在HTML中,你必须避免使用HTML和Windows对象和属性的名称作为Js的变量及函数名
 * alert 断言 all 所有的 anchor 瞄点 anchors 瞄点 area 区域
 * assign 分配 blur 模糊 button 按钮 checkbox 复选框 clearInterval 清除定时
 * clearTimeout 清除延迟 clientInformation close 关闭 closed 关闭 confirm 确认
 * constructor 构造函数 crypto decodeURI decodeURIComponent defaultStatus 默认状态
 * document element 元素 elements embed embeds
 * encodeURI encodeURIComponent excape event fileUpload 
 * focus 聚焦 form forms frame innerHeight 返回窗口的文档显示区的高度
 * innerWidth 返回窗口的文档显示区的宽度 layer 层级 layers link 链接 location 本地
 * mimeTypes navigate navigator frames frameRate
 * hidden history image images offscreenBuffering 
 * open opener option outerHeight outerWidth
 * packages pageXOffset pageYOffset parent parseFloat
 * parseInt 转换为Int类型 password 面膜 pkcs11 plugin 插件 prompt
 * propertylsEnum radio reset screenX屏幕坐标X screenY屏幕坐标Y
 * scroll 滑动 secure select 选择 self setInterval 设置定时器
 * setTimeout 设置计时器 status 状态 submit taint text 文本
 * textarea top 顶部 unescape untaint window 全局
 * 
 * 五、HTML事件句柄
 * 应该避免使用HTML事件句柄的名称作为JavaScript的变量及函数名
 * onblur onclick 点击事件 onerror 错误事件 onfocus 聚焦事件
 * onkeydown 按键按下事件 onkeypress onkeyup 按键抬起事件 onmouseover 鼠标结束事件
 * onload 加载事件 onmouseup 鼠标抬起事件 onmousedown 鼠标按下事件 onsubmit
 * 
 * 六、非标准JavaScript
 * 除了保留关键字,在javaScript实现中国也有一些非标准的关键字
 * 一个实例时const关键字,用于定义变量.一些javaScript引擎把const当作var的同义词,另一些引擎则把const当作变量的定义.
 * const时JavaScript的扩展,javaScript引擎支持它用在firefox和Chrome中,但是它并不是JavaScript便准ES3或ES5的组成部分
 * 建议:不要使用它
 * 
 * this 关键字
 * 面向对象语言中this表示当前对象的一个引用
 * 但在js中this不是固定不变的,它会随着执行环境的改变而改变
 * 1,在方法中,this表示该方法所属的对象
 * 2,如果单独使用,this表示全局对象
 * 3,在函数中,this表示全局对象
 * 4,在函数中,在严格模式下,this是未定义的undefined
 * 5,在事件中,this表示接收事件的元素
 * 6,类似call()和apply()方法可以将this引用到任何对象
 * 
 * 七、显示函数绑定
 * 在JavaScript中函数也是对象,对象则有方法,apply和call就是函数对象的方法。
 * 这两个方法异常强大,他们允许切换函数执行的上下文环境,即this绑定的对象
 * 例如；
 * var person1 = {
 *  fullName: function() {
 *      return this.firstName + " " + this.lastName;
 *  }
 * }
 * var person2 = {
 *  firstName: "John",
 *  lastName: "Doe"
 * }
 * person1.fullName.call(person2);  //John Doe
 */
Example.KeyWord = function () {
    //const 常量定义
    const a = 1;
    console.log("Amumu KeyWord a = ", a);
    // a = 2; //实现报错
    // console.log("Amumu keyWord a = ", a);


    var person1 = {
        fullName: function () {
            return this.firstName + "_" + this.lastName;
        }
    }

    var person2 = {
        firstName: "John",
        lastName: "Doe"
    }
    var b = person1.fullName.call(person2);
    console.log("Amumu KeyWord b = ", b); //Amumu KeyWord b =  John_Doe
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}