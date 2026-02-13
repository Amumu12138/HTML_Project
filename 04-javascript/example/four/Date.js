var Example = Example || {};

/**
 * @desc JavaScript Dat 日期对象
 * 日期对象用于处理日期和时间
 * 
 * 一、创建日期
 * Date对象用于处理日期和时间
 * 可以通过new关键字来定义Date对象,在不指定参数的时候,默认参数是0
 * 
 * 二、设置日期
 * 通过使用针对日期对象的方法,我们可以很容易地对日期进行操作
 * 注意:如果增加天数会改变月份或者年份,那么日期对象会自动完成这种转换
 * 
 * 三、两个日期比较
 * 日期对象可用于比较两个日期
 * 示例:
 * var x = new Date();
 * x.setFullYear(2100, 0, 14);
 * var today = new Date();
 * 
 * if(x > today) {
 *      alert("true");
 * } else {
 *      alert("false"); 
 * }
 */
Example.Date = function() {
    //比较日期示例
     var x = new Date();
     x.setFullYear(2100, 0, 14);
     var today = new Date();
     
     if(x > today) {
        alert("true, " + "今天是2100年1月14日之前");
     } else {
        alert("false, " + "今天是2100年1月14日之后"); 
     }

     document.write(`
        <p id="demo">记录当前时间</p>
     `);

     //把日期格式转化为指定格式
     Date.prototype.foramt = function(value) {
         var date = {
             "M+": this.getMonth() + 1,             //月份
             "D+": this.getDate(),                  //日
             "H+": this.getHours(),                 //小时
             "minutes+": this.getMinutes(),         //分钟
             "s+": this.getSeconds(),               //秒
             "q+": Math.floor((this.getMonth() + 3) / 3), //季度
             "minlliseconds+": this.getMilliseconds()   //毫秒
         }

         if(/(y+)/.test(value)) {
            //  console.log(RegExp.$1); //获取第一个元素,yyyy
            //  console.log(202 + ""); //"202"
            //  console.log(4 - RegExp.$1.length); //0
            //  console.log((202 + "").substr(4 - RegExp.$1.length));//202
             value = value.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
         }

         for(var k in date) {
             if(new RegExp("(" + k + ")").test(value)) {
                 value = value.replace(RegExp.$1, (RegExp.$1.length == 1) ? date[k] : (("00" + date[k]).substr(("" + date[k]).length)));
             }
         }

         return value;
     }

     //显示当前时间格式
     var now = new Date();
    //  var nowStr = now.foramt("yyyy-MM-dd hh:mm:ss");
     setInterval(function() {
        document.getElementById("demo").innerHTML = new Date().foramt("yyyy年M月D日H小时minutes分s秒q季度minlliseconds毫秒");
     }, 100);

}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}