var Example = Example || {};

/**
 * @desc JavaScript教程测试项目
 */
Example.Test = function () {
    // //	您只能在 HTML 输出中使用 document.write。如果您在文档加载后使用该方法，会覆盖整个文档。

    // //添加标题
    // document.write(`<h1>这是一个测试项目</h1>`);
    // //添加段落
    // document.write(`<p>这是一个测试段落</p>`);

    // //添加按钮
    // document.write(`<button type="button " onclick="alert('欢迎!')">点我!</button>`);

    // //改变HTML元素的样式
    // document.write(`<p id="demo">JavaScript能改变HTML元素的样式</p>`);
    // document.write(`<script>
    //     function myFunction() {
    //         var x = document.getElementById("demo");
    //         x.style.color = "#ff0000";
    //     }
    // </script>`);
    // document.write(`<button type="button" onclick="myFunction()">改变颜色</button>`);
    //隐藏Back按钮
    var commonBtn = document.getElementsByClassName('common-js-btn');
    commonBtn[0].style.display = "none";
    // body元素向左偏移20px
    document.body.style.margin = "0 20px";
    document.write('<p> JS获取日期和格式转化 </p>')
    var myDate = new Date();
    var getYear = myDate.getYear();
    document.write(`<p>获取当前年份(2位) --> ${getYear}</p>`); // 当前年份减去1900年所获得的数值
    var getFullYear = myDate.getFullYear();
    document.write(`<p>获取完整年份(4位, 1970-至今) --> ${getFullYear}`);
    var getMonth = myDate.getMonth();
    document.write(`<p>获取当前月份(0-11, 0代表1月) --> ${getMonth}`);
    var getDate = myDate.getDate();
    document.write(`<p>获取当前日(1-31) --> ${getDate}`);
    var getDay = myDate.getDay();
    document.write(`<p>获取当前星期X(0-6, 0代表星期天) --> ${getDay}`);
    var getTime = myDate.getTime();
    document.write(`<p>获取当前时间(从1970.1.1开始的毫秒数) --> ${getTime}`);
    var getHours = myDate.getHours();
    document.write(`<p>获取当前小时数(0-23) --> ${getHours}`);
    var getMinutes = myDate.getMinutes();
    document.write(`<p>获取当前分钟数(0-59) --> ${getMinutes}`);
    var getSeconds = myDate.getSeconds();
    document.write(`<p>获取当前秒数(0-59)--> ${getSeconds}`);
    var getMilliseconds = myDate.getMilliseconds();
    document.write(`<p>获取当前毫秒数(0-999)--> ${getMilliseconds}`);
    var toLocaleDateString = myDate.toLocaleDateString();
    document.write(`<p>获取当前日期--> ${toLocaleDateString}`);
    var toLocaleTimeString = myDate.toLocaleTimeString();
    document.write(`<p>获取当前时间--> ${toLocaleTimeString}`);
    var toLocaleString = myDate.toLocaleString();
    document.write(`<p>获取日期与时间--> ${toLocaleString}`);
    // 判断是否是闰年
    Date.prototype.isLeapYear = function () {
        return (0 == this.getYear() % 4 && (0 != this.getYear() % 100) || (0 == this.getYear() % 400));
    }
    document.write(`<p> 判断闰年 --> ${myDate.isLeapYear()}</p > `)
    // 格式化
    Date.prototype.Format = function (formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        // 年份
        str = str.replace(/yyyy|YYYY/, this.getFullYear());
        str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
        // 月份
        str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
        str = str.replace(/M/g, this.getMonth() + 1);

        // 星期
        str = str.replace(/w|W/g, Week[this.getDay()]);

        // 日期
        str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
        str = str.replace(/d|D/g, this.getDate());

        // 小时
        str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
        str = str.replace(/h|H/g, this.getHours());
        // 分钟
        str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
        str = str.replace(/m/g, this.getMinutes());
        // 秒
        str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
        str = str.replace(/s|S/g, this.getSeconds());

        return str;
    }

    document.write(`<p> 格式化 --> ${myDate.Format('yyyy-MM-dd hh-mm-ss 星期w')}</p > `);

    // 求两个时间的天数差 日期格式为YYYY-MM-DD
    function daysBetween(DateOne, DateTwo) {
        var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
        var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
        var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

        var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
        var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
        var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

        var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
        return Math.abs(cha);
    }
    document.write(`<p> 求两个时间的天数差 --> ${daysBetween('2021-7-26', '2021-6-26')}</p > `);
    // 日期计算
    Date.prototype.DateAdd = function (strInterval, Number) {
        var dtTmp = this;
        switch (strInterval) {
            case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
            case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
            case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
            case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
            case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
            case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        }
    }
    document.write(`<p> 日期计算 --> ${myDate.DateAdd('d', 10).Format('yyyy-MM-dd')}</p > `);

    // 字符串转成日期类型   ( 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  )  
    function StringToDate(DateStr) {
        var converted = Date.parse(DateStr);
        var myDate = new Date(converted);
        if (isNaN(myDate)) {
            //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
            var arys = DateStr.split('-');
            myDate = new Date(arys[0], --arys[1], arys[2]);
        }
        return myDate;
    }
    document.write(`<p> 字符串转成日期类型 --> ${StringToDate('2021-07-26')}</p > `);

    var curDate = '2021-07-26';
    var nextDate = StringToDate(curDate).DateAdd('d', 6).Format('yyyy-MM-dd');
    document.write(`<p> 增加六天 --> ${nextDate}</p > `);

    // 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
    Date.prototype.DateDiff = function (strInterval, dtEnd) {
        var dtStart = this;
        if (typeof dtEnd == 'string')//如果是字符串转换为日期型  
        {
            dtEnd = StringToDate(dtEnd);
        }
        switch (strInterval) {
            case 's': return parseInt((dtEnd - dtStart) / 1000);
            case 'n': return parseInt((dtEnd - dtStart) / 60000);
            case 'h': return parseInt((dtEnd - dtStart) / 3600000);
            case 'd': return parseInt((dtEnd - dtStart) / 86400000);
            case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7));
            case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
            case 'y': return dtEnd.getFullYear() - dtStart.getFullYear();
        }
    }

    document.write(`<p> 比较日期差(与2021-12-31 比较) --> ${myDate.DateDiff('d', '2021-12-31')}</p> `);

    // 日期输出字符串，重载了系统的toString方法  
    Date.prototype.toString = function (showWeek) {
        var myDate = this;
        var str = myDate.toLocaleDateString();
        if (showWeek) {
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            str += ' 星期' + Week[myDate.getDay()];
        }
        return str;
    }
    document.write(`<p> 日期输出字符串 --> ${myDate.toString('星期')}</p> `);

    // 把日期分割成数组  
    Date.prototype.toArray = function () {
        var myDate = this;
        var myArray = Array();
        myArray[0] = myDate.getFullYear();
        myArray[1] = myDate.getMonth() + 1;
        myArray[2] = myDate.getDate();
        myArray[3] = myDate.getHours();
        myArray[4] = myDate.getMinutes();
        myArray[5] = myDate.getSeconds();
        return myArray;
    }
    document.write(`<p> 把日期分割成数组 --> ${myDate.toArray()}</p> `);

    // 取得日期数据信息  
    //| 参数 interval 表示数据类型  
    //| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
    Date.prototype.DatePart = function (interval) {
        var myDate = this;
        var partStr = '';
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        switch (interval) {
            case 'y': partStr = myDate.getFullYear(); break;
            case 'm': partStr = myDate.getMonth() + 1; break;
            case 'd': partStr = myDate.getDate(); break;
            case 'w': partStr = Week[myDate.getDay()]; break;
            case 'ww': partStr = myDate.WeekNumOfYear(); break;
            case 'h': partStr = myDate.getHours(); break;
            case 'n': partStr = myDate.getMinutes(); break;
            case 's': partStr = myDate.getSeconds(); break;
        }
        return partStr;
    }
    document.write(`<p> 取得日期数据信息 --> ${myDate.DatePart('d')}</p> `);

    // 取得当前日期所在月的最大天数  
    Date.prototype.MaxDayOfDate = function () {
        var myDate = this;
        var ary = myDate.toArray();
        var date1 = (new Date(ary[0], ary[1] - 1, 1));
        var date2 = date1.DateAdd('m', 1);
        var result = date1.DateDiff('d', date2.Format('yyyy-MM-dd'));
        return result;
    }
    document.write(`<p> 取得当前日期所在月的最大天数 --> ${myDate.MaxDayOfDate()}</p> `);

    // 取得当前日期所在周是一年中的第几周  
    Date.prototype.WeekNumOfYear = function () {
        //本年的第一天
        var beginDate = new Date(this.getFullYear(), 0, 1);
        //星期从0-6,0代表星期天，6代表星期六
        var endWeek = this.getDay();
        if (endWeek == 0) endWeek = 7;
        var beginWeek = beginDate.getDay();
        if (beginWeek == 0) beginWeek = 7;
        //计算两个日期的天数差
        var millisDiff = this.getTime() - beginDate.getTime();
        var dayDiff = Math.floor((millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1000)) / 86400000);
        return Math.ceil(dayDiff / 7) + 1;
    }
    document.write(`<p> 取得当前日期所在周是一年中的第几周 --> ${myDate.WeekNumOfYear()}</p> `);


    // 若要显示:当前日期加时间(如:2009-06-12 12:00)
    function CurentTime() {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";
        if (month < 10)
            clock += "0";
        clock += month + "-";
        if (day < 10)
            clock += "0";
        clock += day + " ";
        if (hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm;
        return (clock);
    }
    document.write(`<p> 当前日期加时间 --> ${CurentTime()}</p> `);


    // 日期时间检查 ( 格式为：YYYY-MM-DD HH:MM:SS  ) -逻辑有问题
    function CheckDateTime(str) {
        var reg = /\d+/g;
        var r = str.match(reg);
        if (r == null) return false;
        r[1] = r[1] - 1;
        var d = new Date(r[0], r[1], r[2], r[3], r[4], r[5]);
        console.log('Amumu d.getFullYear() ---> ', d.getFullYear())
        if (d.getFullYear() != r[0]) return false;
        if (d.getMonth() != r[1]) return false;
        if (d.getDate() != r[2]) return false;
        if (d.getHours() != r[3]) return false;
        if (d.getMinutes() != r[4]) return false;
        if (d.getSeconds() != r[5]) return false;
        return true;
    }
    document.write(`<p> 日期时间检查 --> ${CheckDateTime('2021-07-26 14:40:40')}</p> `);


    // 日期合法性验证  (格式为：YYYY-MM-DD或YYYY/MM/DD  ) -逻辑有问题
    function IsValidDate(DateStr) {
        var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;   
        if (sDate == '') return true;
        //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''   
        //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式   
        var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '');
        if (s == '') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D   
        {
            var t = new Date(sDate.replace(/\-/g, '/'));
            var ar = sDate.split(/[-/:]/);
            if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
                //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
                return false;
            }
        }
        else {
            //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
            return false;
        }
        return true;
    }
    document.write(`<p> 日期合法性验证 --> ${IsValidDate('2021-7-6')}</p> `);
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}