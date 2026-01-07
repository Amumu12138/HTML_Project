var pjapi = window.PJ_API || {};


pjapi.getURLVar = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null
};



pjapi.buildURL = function(url, args) {
    if (url) {
        var urlList = url.split("#");
        var params = {};
        var query = urlList[0].split("?")[1];
        var result = urlList[0].split("?")[0] + "?";
        if (query) {
            query = query.split("&");
            for (var i in query) {
                var vars = query[i].split("=");
                params[vars[0]] = vars[1]
            }
        }
        for (var i in args) {
            params[i] = args[i]
        }
        var first = true;
        for (var i in params) {
            result += (first ? "": "&") + i + "=" + (params[i] ? params[i] : "");
            first = false;
        }
        return result + (urlList[1] ? "#" + urlList[1] : "");
    }
    return "";
};


pjapi.httpGet = function(url,params,callback) {

    var hosturl = pjapi.buildURL(url,params);
    $.ajax({
        type: "GET",
        url: hosturl,
        dataType: "json",
        success: function(data){
            callback(data);
        }
    });
};

pjapi.httpGetByJsonp = function(url,params,callback) {

    var hosturl = pjapi.buildURL(url,params);
    console.info("当前请求地址："+hosturl);
    $.ajax({
        type: "GET",
        url: hosturl,
        dataType: "jsonp",
        success: function(data){
            callback(data);
        }
    });

};

pjapi.getItem = function(key) {
    if (window.localStorage) {
        return window.localStorage.getItem("pj_" + key)
    } else {
        var arr = document.cookie.match(new RegExp("(^| )pj_" + key + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
    }
    return null;
};

pjapi.setItem = function(key, value) {
    if (window.localStorage) {
        try {
            window.localStorage.setItem("pj_" + key, value);
        } catch(err) {}
    } else {
        var exp = new Date;
        exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1e3);
        document.cookie = "pj_" + key + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
};


//生成udid
pjapi.getUdid = function(){
    var u = pjapi.getItem("udid");
    if(!u){
        var gu = pjapi.genUdid();
        pjapi.setItem("udid",gu);
        return gu;
    }else{
        return u;
    }
};

pjapi.s4 = function(){
    return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
pjapi.genUdid = function(){
    return(pjapi.s4() + pjapi.s4()+ pjapi.s4() + pjapi.s4() + pjapi.s4()+ pjapi.s4() + pjapi.s4() + pjapi.s4());
};


pjapi.confirmDialog = function(txt, oklabel, cancellabel, okcallback, cancelcallback, title, callback) {
    var html = '<div id="confirmDialog" class="mask dialog-box">';
    html += '<div class="r5">';
    html += "<div>" + (title ? title: "提示信息") + "</div>";
    html += "<div>" + txt + "</div>";
    html += '<div class="flex">';
    html += '<a href="javascript:;" data-type="cancel" class="flex-list unselect">' + (cancellabel ? cancellabel: "继续登录") + "</a>";
    html += '<a href="javascript:;" data-type="cancel" class="flex-list unselect">' + (cancellabel ? cancellabel: "退出游戏") + "</a>";
    if (oklabel) {
        html += '<a href="javascript:;" data-type="ok" class="flex-list unselect ok">' + oklabel + "</a>"
    }
    html += "</div></div></div>";
    $("body").append(html);
    if (callback) {
        callback()
    }
    $("#confirmDialog .flex a").click(function() {
        var type = $(this).attr("data-type");
        if (type == "cancel") {
            if (cancelcallback) {
                cancelcallback()
            }
        } else if (type == "ok") {
            if (okcallback) {
                okcallback()
            }
        }
        $(this).parents("#confirmDialog").remove()
    })
};



pjapi.httpGet = function(hosturl,params,callback) {
    $.ajax({
        type: "GET",
        data:params,
        url: hosturl,
        dataType: "json",
        success: function(data){
            callback(data,params);
        }
    });
};

pjapi.httpPost = function(hosturl,params,callback) {
    $.ajax({
        type: "POST",
        data:params,
        url: hosturl,
        dataType: "json",
        success: function(data){
            callback(data,params);
        }
    });
};


pjapi.isWeixin = function() {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
};

pjapi.getURLParams = function(){
    var param = location.search.substr(1).split("&");
    var params = {};
    for(var i = 0 ; i < param.length ;i ++){
        var split = param[i].split("=");
        params[""+split[0]] = split[1];
    }
    return params;
};

//获取时间戳
pjapi.getTimestamp = function(){
    var timestamp=new Date().getTime();
    return timestamp;
};

//JSON数据拼接成链接
pjapi.jsonToAccessLinks = function(url,param) {
    var paramStr = "";
    for (var key in param) {
        paramStr += "&" + key + "=" + param[key];
    }
    var visitUrl = url +"?"+ paramStr.substr(1);
    return visitUrl;
};

//判断是否是ios手机
pjapi.is_IOS = function() {
    //判断设备是android还是ios
    var u = navigator.userAgent, app = navigator.appVersion;
   // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS;
};
//判断是否是微信打开
pjapi.is_weixin = function() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
   }
};


/*pjapi.md5 = function(data,key){
    var sort ="";
    Object.keys(data).sort().forEach(function(v, i) {
        if("sign" == v){
        }else {
            sort +=v;
            sort +="=";
            sort +=data[v];
        }
    });
    var bstr = sort + key;
    var md5 = $.md5(bstr);
    return md5;
};*/



window.PJ_API = pjapi;



