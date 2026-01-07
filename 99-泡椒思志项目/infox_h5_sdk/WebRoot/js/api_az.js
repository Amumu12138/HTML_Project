var sdkApi = {};
sdkApi.shortcut={};
sdkApi.oW=0;
sdkApi.oH=0;
sdkApi.host = null;
sdkApi.platformId = null;
sdkApi.platformType = null;
sdkApi.apiUrl = null;
sdkApi.loginUrl= null;
sdkApi.xieYiUrl = null;
sdkApi.mainUrl= null;
sdkApi.findPwdUrl= null;
sdkApi.SUCCESS = null;
sdkApi.appVersion= null;
sdkApi.sdkVersion= null;
sdkApi.visitType= null;

sdkApi.getURLVar = function(name) {//获取请求路径参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null
};


sdkApi.setURLVar = function(url, key, value) {//拼参数
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
        if (value) {
            params[key] = value
        } else {
            params[key] = null;
            delete params[key]
        }
        var first = true;
        for (var i in params) {
            result += (first ? "": "&") + i + "=" + (params[i] ? params[i] : "");
            first = false
        }
        return result + (urlList[1] ? "#" + urlList[1] : "")
    }
    return ""
};


sdkApi.buildURL = function(url, args) {
	if(url) {
		var urlList = url.split("#");
		var params = {};
		var query = urlList[0].split("?")[1];
		var result = urlList[0].split("?")[0] + "?";
		if(query || query === "") {
			query = query.split("&");
			for(var i in query) {
				var vars = query[i].split("=");
				params[vars[0]] = vars[1];
			}
		}
		for(var i in args) {
			if(args[i] !==undefined && args[i] !== null) {
				params[i] = args[i];
			}
		}
		var first = true;
		for(var i in params) {
			result += (first ? "" : "&") + i + "=" + (params[i] !== undefined && params[i] !== null ? params[i] : "");
			first = false;
		}
		return result + (urlList[1] ? "#" + urlList[1] : "");
	}
	return "";
};



sdkApi.isMobile = function() { 
    var userAgent = navigator.userAgent.toLowerCase();
    var agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
    for (var v = 0; v < agents.length; v++) {
        if (userAgent.indexOf(agents[v]) > 0) {
            return true;
        }
    } 
    return false;
};



sdkApi.setItem = function(key, value) {
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
sdkApi.getItem = function(key) {
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
sdkApi.removeItem = function(key) {
    if (window.localStorage) {
        window.localStorage.removeItem("pj_" + key);
    } else {
        var exp = new Date;
        exp.setTime(exp.getTime() - 1);
        var cval = sdkApi.getItem(key);
        if (cval != null) {
            document.cookie = "pj_" + key + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
};



sdkApi.setSession = function(key, value) {
    if (window.sessionStorage) {
        window.sessionStorage.setItem("pj_" + key, value);
    }
};
sdkApi.getSession = function(key) {
    if (window.sessionStorage) {
        return window.sessionStorage.getItem("pj_" + key);
    }
    return null
};
sdkApi.removeSession = function(key) {
    if (window.sessionStorage) {
        window.sessionStorage.removeItem("pj_" + key);
    }
};


sdkApi.isWeixin = function() {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
};

sdkApi.isiOS = function() {
	return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
};



sdkApi.httpGet = function(url, callback, type) {
	
	  $.ajax({
        type: "GET",
        url: url,
        dataType: type,
        success: function(data){
      	  sdkApi.log(url,data);
      	  callback(data);
         },
         error:function(e){ 
      	   console.log(e);
      	   sdkApi.closeLoading();
      	   sdkApi.confirmDialog("网络错误，请重试！");
         }
    });
};

sdkApi.httpGet2 = function(url,callback) {
		
	  $.ajax({
       type: "GET",
       url: url,
       async:false,
       dataType: 'json',
       success: function(data){
     	  callback(data);
        }
   });
};


sdkApi.genSignUrl = function(param,sdkApiName){
	var key = sdkApi.getItem("appKey");
	var url = sdkApi.buildURL(sdkApi.apiUrl+sdkApiName,param); 
	var sign = "";
	var signParam = jQuery.extend(true, {}, param);
	delete signParam.payType;
    var dataArray = [];  
	for (var i in signParam) {
		if(signParam[i] == null){
			continue;
		}
		dataArray.push(i + "=" + signParam[i]); 	
	}
	dataArray.sort(); 
    var genData = dataArray.join("");	
	sign =  $.md5(genData+key); 	
    url = url+"&sign="+sign;
	return url;
};


sdkApi.md5 = function(data,key){ 
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
};


//加载loading动画
sdkApi.showLoading = function() {
    if (!$("#loadingBox").length) {
        var html = '<div id="loadingBox" class="mask loading"><div><div></div><div></div><div></div><div></div><div></div></div></div>';
        $("body").append(html);
    }
};

sdkApi.closeLoading = function() {
    $("#loadingBox").remove();
};



sdkApi.confirmDialog = function(txt, oklabel, cancellabel, okcallback, cancelcallback, title, callback) {
    var html = '<div id="confirmDialog" class="mask dialog-box">';
    html += '<div class="r5">';
    html += "<div>" + (title ? title: "提示信息") + "</div>";
    html += "<div>" + txt + "</div>";
    html += '<div class="flex">';
    html += '<a href="javascript:;" data-type="cancel" class="flex-list unselect">' + (cancellabel ? cancellabel: "关闭") + "</a>";
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


sdkApi.showUcBox = function(ucurl){  
	$("#iconDiv").trigger("click");
	var loginHtml = '<div id="showUcBox" style="top:0px;" class="mask2 login-box2">'; 
	loginHtml += '<div class="r5" style="margin:0 auto;top:0px;-webkit-border-radius:0px;border-radius:0px;">';         
	loginHtml += '<div class="login-head2"  style="text-align: right;"><span><i class="icon-cancel" onclick="sdkApi.closeUcBox()"></i></span></div>';   
	loginHtml += '<div class="login-body" style="height:'+($(window).height()-40)+'px !important;-webkit-overflow-scrolling: touch; overflow-y: scroll;">';                   
	loginHtml += '<iframe  width="'+$(window).width()+'px !important" frameborder="no" scrolling="yes" border="0px" height="100%"   src="'+ucurl+'"></iframe>';   
	loginHtml += '</div>';
	loginHtml += '</div>';       
	loginHtml += '</div>';  
	$("body").append(loginHtml);
};


//切换用户，返回登录页
sdkApi.checkUcUser = function(){
	sdkApi.setItem("sdkToken","null");
	window.location.href = sdkApi.host + sdkApi.getItem("loginUrl")+"?" + sdkApi.getItem("params");
}

//打开用户中心
sdkApi.closeUcBox = function(){  
	$("#showUcBox").remove();	
};


//显示悬浮菜单
sdkApi.showNav =function(){
	var r =   $("#navDiv").css("display");
	
	if(r =="none"){  
		sdkApi.unbindTouchEvent();
		
		  $("#navDiv").css("display","block");
		  $("#navDiv1").css("display","block");
		  var  leftW =  $("#shortcut").css("left");
		  var left  =   parseInt(leftW.replace("px",""));
		  
		  if(left > 0 || isNaN(left)){//图标在右边
			  $("#iconDiv").css("float","right");
			  $("#shortcut").css("right","0px"); 
		  }else{
			  $("#iconDiv").css("float","left");
			  $("#shortcut").css("left","0px");  
		  }
		  $("#shortcut").css("width",($("#iconDiv").width()+$("#navDiv").width()+$("#navDiv1").width()+12)+"px");
	}else{
		 $("#navDiv").css("display","none");
		 $("#navDiv1").css("display","none");
		 $("#shortcut").css("width","50px"); 
		 
		 sdkApi.bindTouchEvent();
	}
	 $("#shortcut").css("opacity","1");
	 $("#shortcut").css("filter","alpha(opacity=100)");

}


//启动悬浮窗
sdkApi.enableFloatBox = function() {
		$("#shortcut").remove();
        var t = '<div id="shortcut"  style="width: 50px;height:50px;left: -10px;opacity:0.4;filter:alpha(opacity=70);"  class="shortcut">';
        t += '<div class="flex" onclick="sdkApi.showNav()" id="iconDiv" style="width: 50px;height:50px;float:left;">';
        t += '<div id="ic-menu" class="r50" style="width: 50px;height:50px;"><span style="width: 50px;height:50px;" class="r50"></span></div>';
        t += "</div>";
        t += '<div  id="navDiv" style="display:none;width: 50px;height:50px;border: 3px solid #232529;border-radius:25px;background-color:#44474e;float:left;text-align: center;">';

        t += "</div>";
        t += "</div>";
        $("body").append(t);
        
        //绑定touch事件
        sdkApi.bindTouchEvent();
		
		//初始化悬浮球菜单
        sdkApi.initFloatBox();
		
		window.setInterval(function(){
			 if( !$("#showUcBox").length > 0  && !$("#payBox").length > 0 ){
				$("#gameFrame").focus();
			 }
			 
		},1000);
			
		
		
};




function touchstart(e){
	var touches = e.touches[0]; 
	sdkApi.oW = touches.clientX -  sdkApi.shortcut.offsetLeft;
	sdkApi.oW = touches.clientY -  sdkApi.shortcut.offsetTop;
	document.addEventListener("touchmove", defaultEvent, false);
	 
}
function touchmove(e){
	var touches = e.touches[0];
	var oLeft = touches.clientX - sdkApi.oW;
	var oTop = touches.clientY - sdkApi.oW;
		
if(oLeft < 0) {
		oLeft = 0;
	}
	if(oTop <0 ){
		oTop = 0; 
	}
	
	var rLeft = document.documentElement.clientWidth - sdkApi.shortcut.offsetWidth;
	if(oLeft > rLeft){
		oLeft = rLeft; 
	}
	
	var htop = document.documentElement.clientHeight - sdkApi.shortcut.offsetHeight;
	if(oTop > htop){
		oTop = htop; 
	}

	sdkApi.shortcut.style.left = oLeft + "px";
	sdkApi.shortcut.style.top = oTop + "px";
	
}

function touchend(e){
	
	
	document.removeEventListener("touchmove", defaultEvent, false);
	
	var touches = e.changedTouches[0];
	
	var oLeft = touches.clientX - sdkApi.oW;
	var oTop = touches.clientY - sdkApi.oW;
	
	if(oLeft > (document.documentElement.clientWidth/2)){
		sdkApi.shortcut.style.right =  "-10px"; 
		sdkApi.shortcut.style.left ="auto";
		$("#shortcut").css("opacity","0.4");
		$("#shortcut").css("filter","alpha(opacity=40)");
     }else{ 
    	 sdkApi.shortcut.style.left = "-10px";
    	 $("#shortcut").css("opacity","0.4");
 		$("#shortcut").css("filter","alpha(opacity=40)");
     }


}
function defaultEvent(e) {
	e.preventDefault();

}

sdkApi.bindTouchEvent = function(){
	sdkApi.shortcut = document.getElementById("shortcut");
	/*$("#shortcut").unbind().bind("click",function(){
		
	});*/
	sdkApi.shortcut.addEventListener("touchstart", touchstart, false)
	sdkApi.shortcut.addEventListener("touchmove", touchmove, false); 
	sdkApi.shortcut.addEventListener("touchend", touchend, false);
};

//移除touch事件
sdkApi.unbindTouchEvent = function(){
	sdkApi.shortcut.removeEventListener("touchmove", touchmove, false);
	sdkApi.shortcut.removeEventListener("touchstart", touchstart, false);
	sdkApi.shortcut.removeEventListener("touchend", touchend, false);
};

sdkApi.isNotNull = function(str){
	 if(str != null && str != "null" && str != ""){ 
		  return true;
	}else{
		return false;
	}
};

//退出登录2
sdkApi.clearLoginItem = function(){
	sdkApi.removeItem("channelId");
	sdkApi.removeItem("gameId");
	sdkApi.removeItem("sdkToken");
	sdkApi.removeItem("uid");
};

sdkApi.log =function(title,data){
	if(sdkApi.debug){ 
		console.log("\n"+title+"\n"+JSON.stringify(data)+"\n");  
	}
};



//生成udid
sdkApi.getUdid = function(){ 
	var u = sdkApi.getItem("udid");
	if(!u){
		var gu = sdkApi.getUdid();
		sdkApi.setItem("udid",gu);
		return gu;
	}else{
		return u;
	}
};
sdkApi.s4 = function(){
	return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
sdkApi.getUdid = function(){ 
	return(sdkApi.s4() + sdkApi.s4()+ sdkApi.s4() + sdkApi.s4() + sdkApi.s4()+ sdkApi.s4() + sdkApi.s4() + sdkApi.s4());
};



//加载loading页
sdkApi.initLoading = function(callback){    
	$("#flash").show();  
	$("#flash").append(/*"<img src='"+sdkApi.host+"/images/pj_background_flash_logo.png'/>"*/);
			setTimeout(function () {
		    $("#flash").animate({opacity: 0}, 100, "swing", function () {
			$("#flash").remove();
			 callback(); 
		});
	}, 500);  

}; 






sdkApi.init = function(sdk){
	
	sdkApi.platformId = sdk.platformId;
	sdkApi.platformType = sdk.platformType;
	sdkApi.apiUrl = sdk.apiUrl;
	sdkApi.loginUrl= sdk.loginUrl;
	sdkApi.xieYiUrl = sdk.xieYiUrl;
	sdkApi.mainUrl= sdk.mainUrl;
	sdkApi.findPwdUrl= sdk.findPwdUrl;
	sdkApi.SUCCESS = sdk.SUCCESS;
	sdkApi.appVersion= sdk.appVersion;
	sdkApi.sdkVersion= sdk.sdkVersion;
	
	var appVersion = sdkApi.getItem("appVersion");
	if(!sdkApi.isNotNull(appVersion)){
		sdkApi.setItem("appVersion",sdkApi.appVersion);
	}
	
	sdkApi.host = sdk.host;
	
	sdkApi.setItem("params",window.location.search.substr(1));
	
	var gameId = sdkApi.getURLVar("gameId");
	var channelId = sdkApi.getURLVar("channelId");
	var channelName = sdkApi.getURLVar("channelName");
	var edition = sdkApi.getURLVar("edition");
	var visitType = sdkApi.getURLVar("visitType");
	if(sdkApi.isNotNull(gameId) && sdkApi.isNotNull(channelId)){
		var gameId_s =  sdkApi.getItem("gameId");
		var channelId_s =  sdkApi.getItem("channelId");
		if(sdkApi.isNotNull(gameId_s) && sdkApi.isNotNull(channelId_s)){
		         if(gameId_s != gameId  || channelId_s != channelId){
		        	 sdkApi.clearLoginItem();
		        	 sdkApi.setItem("gameId",gameId);
					 sdkApi.setItem("channelId",channelId);
				}
			}else{
				sdkApi.setItem("gameId",gameId);
				sdkApi.setItem("channelId",channelId);
			}
		}
	
	if(sdkApi.isNotNull(channelName)){
		var _channelName =  sdkApi.getItem("channelName");
		if(sdkApi.isNotNull(_channelName)){
			if(_channelName != channelName){
				sdkApi.setItem("channelName",channelName);
			}
		}else{
			sdkApi.setItem("channelName",channelName);
		}
	}else{
		sdkApi.setItem("channelName","");
	}
	
	if(sdkApi.isNotNull(edition)){
		var _edition =  sdkApi.getItem("edition");
		if(sdkApi.isNotNull(_edition)){
			if(_edition != edition){
				sdkApi.setItem("edition",edition);
			}
		}else{
			sdkApi.setItem("edition",edition);
		}
	}else{
		sdkApi.setItem("edition","");
	}
	
	
	if(!sdkApi.isNotNull(sdkApi.getItem("model"))){
		sdkApi.setItem("model","");
	}
    //获取访问类型
    if(sdkApi.isNotNull(visitType)){
        var _visitType =  sdkApi.getItem("visitType");
        if(sdkApi.isNotNull(_visitType)){
            if(_visitType != visitType){
                sdkApi.setItem("visitType",visitType);
            }
        }else{
            sdkApi.setItem("visitType",visitType);
        }
    }else{
        sdkApi.setItem("visitType",0);
    }

}

sdkApi.init2 = function(sdk){
	
	sdkApi.platformId = sdk.platformId;
	sdkApi.platformType = sdk.platformType;
	sdkApi.apiUrl = sdk.apiUrl;
	sdkApi.loginUrl= sdk.loginUrl;
	sdkApi.xieYiUrl = sdk.xieYiUrl;
	sdkApi.mainUrl= sdk.mainUrl;
	sdkApi.findPwdUrl= sdk.findPwdUrl;
	sdkApi.SUCCESS = sdk.SUCCESS;
	sdkApi.appVersion= sdk.appVersion;
	sdkApi.sdkVersion= sdk.sdkVersion;
	sdkApi.setItem("params",window.location.search.substr(1));
	var appVersion = sdkApi.getItem("appVersion");
	if(!sdkApi.isNotNull(appVersion)){
		sdkApi.setItem("appVersion",sdkApi.appVersion);
	}
	
	sdkApi.host = sdk.host;
	var gameId = sdkApi.getURLVar("gameId");
	var channelId = sdkApi.getURLVar("channelId");
	var channelName = sdkApi.getURLVar("channelName");
	var edition = sdkApi.getURLVar("edition");
	var visitType = sdkApi.getURLVar("visitType");
	if(sdkApi.isNotNull(gameId) && sdkApi.isNotNull(channelId)){
		var gameId_s =  sdkApi.getItem("gameId");
		var channelId_s =  sdkApi.getItem("channelId");
		if(sdkApi.isNotNull(gameId_s) && sdkApi.isNotNull(channelId_s)){
		         if(gameId_s != gameId  || channelId_s != channelId){
		        	 sdkApi.clearLoginItem();
		        	 sdkApi.setItem("gameId",gameId);
					 sdkApi.setItem("channelId",channelId);
				}
			}else{
				sdkApi.setItem("gameId",gameId);
				sdkApi.setItem("channelId",channelId);
			}
		}
	
	if(sdkApi.isNotNull(channelName)){
		var _channelName =  sdkApi.getItem("channelName");
		if(sdkApi.isNotNull(_channelName)){
			if(_channelName != channelName){
				sdkApi.setItem("channelName",channelName);
			}
		}else{
			sdkApi.setItem("channelName",channelName);
		}
	}else{
		sdkApi.setItem("channelName","");
	}

	//获取访问类型
	if(sdkApi.isNotNull(visitType)){
		var _visitType =  sdkApi.getItem("visitType");
		if(sdkApi.isNotNull(_visitType)){
			if(_visitType != visitType){
				sdkApi.setItem("visitType",visitType);
			}
		}else{
			sdkApi.setItem("visitType",visitType);
		}
	}else{
		sdkApi.setItem("visitType",0);
	}
	
	if(sdkApi.isNotNull(edition)){
		var _edition =  sdkApi.getItem("edition");
		if(sdkApi.isNotNull(_edition)){
			if(_edition != edition){
				sdkApi.setItem("edition",edition);
			}
		}else{
			sdkApi.setItem("edition",edition);
		}
	}else{
		sdkApi.setItem("edition","");
	}
	
	
	if(!sdkApi.isNotNull(sdkApi.getItem("model"))){
		sdkApi.setItem("model","");
	}
	
}


//打开账号注册页面
sdkApi.closeRegBox = function(){
	$("#showRegBox").remove();
};
sdkApi.showRegBox = function(){   
	var loginHtml = '<div id="showRegBox" class="mask login-box">';
	loginHtml += '<div class="r5">';        
	loginHtml += '<div class="login-head" style="text-align: right;"><img style="width: 220px;height:40px;" src='+sdkApi.host+'"/images/titleIcon.png" />&nbsp;<span><i class="icon-cancel" onclick="sdkApi.closeRegBox()"></i></span></div>';
	loginHtml += '<div class="login-body">';
	loginHtml += '<div>'; 
	loginHtml += '<div  class="flex"><i class="icod-user"></i><input class="flex-list" id="r_userName" type="text" value="" placeholder="请输入账号"></div>';
	loginHtml += '<div  class="flex"><i class="icod-lock"></i><input class="flex-list" id="r_password" type="password" value="" placeholder="请填写密码"></div>';
	loginHtml += '<div  class="flex"><i class="icod-lock"></i><input class="flex-list" id="r1_password" type="password" value="" placeholder="请确认密码"></div>';
	  
	loginHtml += '<div  class="flex" style="border:none"><input type="checkbox" id="agreeCk" style="-webkit-appearance:checkbox;height:21px;" checked="checked" />&nbsp;<font style="color:#999">我已阅读并接受</font>&nbsp;<font style="color:#3997EE"> <a href="javascript:;" onclick="sdkApi.showXieYi()" style="line-height:0px;">>>用户服务协议</a></font></div>';
	
	loginHtml += '</div>';   
	loginHtml += '<a href="javascript:;" class="btn" onclick="sdkApi.reg2()">注册</a>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	
	$("body").append(loginHtml);
	
};

sdkApi.closeXieYi = function(){
	$("#showXieYi").remove();
};
sdkApi.showXieYi =function(){
	var loginHtml = '<div id="showXieYi" style="top:0px;" class="mask2 login-box2">'; 
	loginHtml += '<div class="r5" style="margin:0 auto;top:0px;-webkit-border-radius:0px;border-radius:0px;">';          
	loginHtml += '<div class="login-head2" style="text-align: right;"><span><i class="icon-cancel" onclick="sdkApi.closeXieYi()"></i></span></div>';   
	loginHtml += '<div class="login-body">';    
	loginHtml += '<iframe width="100%" frameborder="no" border="0px"  height="'+($(window).height()-60)+'px" src="'+sdkApi.xieYiUrl+'"></iframe>';   
	loginHtml += '</div>';     
	loginHtml += '</div>';  
	loginHtml += '</div>';
	$("body").append(loginHtml); 
};

//账号密码注册
sdkApi.reg2 = function(){
	var r_userName = $("#r_userName").val();
	var r_password = $("#r_password").val();
	var r1_password = $("#r1_password").val();

	
	var isChecked = $('#agreeCk').is(":checked"); 
	if(!isChecked){
		sdkApi.confirmDialog("必须接受用户协议"); 
		 return false;
	}
	
	if(r_userName == ''){
		sdkApi.confirmDialog("请输入用户名");
		 return false;
	}
	if(r_password == '' || r1_password == ''){
		sdkApi.confirmDialog("请输入密码");
		 return false;
	}
	if(r_password != r1_password){
		sdkApi.confirmDialog("两次输入的密码不一致");
		 return false;
	}

	var params = {};	
	params["gameId"]=sdkApi.getItem("gameId");
	params["appVersion"]=sdkApi.getItem("appVersion");
	params["os"]=sdkApi.platformType;
	params["channel"]=sdkApi.getItem("channelName");
	params["platformType"]=sdkApi.platformType;
	params["platformId"]=4;
	params["userName"]= r_userName; 
	params["userId"]=0;
	params["mac"]="";
	params["uid"]="";
	params["password"]= r_password;
	params["ip"]=sdkApi.getItem("ip");
	params["gameVersion"]=sdkApi.getItem("appVersion");
	params["imei"]=sdkApi.getItem("imei");
	params["sdkVersion"]=sdkApi.sdkVersion; 
	params["tBrand"] = sdkApi.platformType;
	params["model"]= sdkApi.getItem("model");
	params["udid"] = sdkApi.getUdid();
	params["channelId"]=sdkApi.getItem("channelId");
	params["platformId"]=sdkApi.platformId;
	params["cid"]=sdkApi.getItem("channelId");
	params["visitType"]=sdkApi.getItem("visitType");

	 sdkApi.showLoading();
	 sdkApi.api(params,"reg",function(retData){
		 if(retData.code == sdkApi.SUCCESS){
			  sdkApi.closeRegBox();  
			  sdkApi.closeLoading();
			  sdkApi.confirmDialog(retData.msg);
			  $("#userName").val(r_userName);
			  $("#password").val(r_password);
			  sdkApi.setItem("sdkToken",retData.data.token); 
		 }else{
			 sdkApi.closeLoading();
			 sdkApi.confirmDialog(retData.msg);  
		 }
	});
	
};



sdkApi.getGameInfo = function(isLogin,callback) {  //游戏信息初始化
    var params={};
    
    document.body.addEventListener('touchmove', function (e) {
		  e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
		}, {passive: false});
    
    params["gameId"] = sdkApi.getItem("gameId");
    params["appVersion"] =sdkApi.getItem("appVersion");
    params["os"] = sdkApi.platformType;
    params["channel"] = sdkApi.getItem("channelId");
    params["platformType"] = sdkApi.platformType;
    params["platformId"] = sdkApi.platformId;
    params["userId"] = 0;
    params["mac"] = "";
    params["uid"] = "";
    params["gameVersion"] =sdkApi.getItem("appVersion");
    params["imei"] = sdkApi.getItem("imei");
    params["sdkVersion"] = sdkApi.sdkVersion;
    params["tBrand"] = "h5";
    params["model"] = sdkApi.getItem("model");
    params["udid"] = sdkApi.getUdid();
    params["channelId"] = sdkApi.getItem("channelId");
    params["cid"] = sdkApi.getItem("channelId");
    params["edition"] = sdkApi.getItem("edition");
    
    sdkApi.api(params,"getGameInfo",function(retData){
    	if(retData.code != 1){
    		sdkApi.closeLoading(); 
    		sdkApi.confirmDialog(retData.msg);
    	}else{
    		sdkApi.setItem("appKey",retData.data.appKey);
    		sdkApi.setItem("mainUrl",retData.data.mainUrl);
			callback(retData);
    	}
    });
};


//退出登录
sdkApi.logout = function(){
	var param={};
	param["channelId"] = sdkApi.getItem("channelId");
	param["gameId"] = sdkApi.getItem("gameId");
	var url = sdkApi.buildURL(sdkApi.loginUrl,param);  
	
	sdkApi.removeItem("channelId");
	sdkApi.removeItem("gameId");
	sdkApi.removeItem("sdkToken");
	sdkApi.removeItem("uid");
	window.location.href= url;
};

//退出登录2
sdkApi.clearLoginItem = function(){
	sdkApi.removeItem("channelId");
	sdkApi.removeItem("gameId");
	sdkApi.removeItem("sdkToken");
	sdkApi.removeItem("uid");
};



sdkApi.closeLoginBox = function(){
	$("#loginBox").remove(); 
};
//打开登录框
sdkApi.loadLoginBox = function(){
	var loginHtml = '<div id="loginBox" class="mask login-box">';
	loginHtml += '<div class="r5">';    
	loginHtml += '<div class="login-head"><img style="width: 220px;height:40px;" src="'+sdkApi.host+'images/titleIcon.png" />&nbsp;</div>';
	loginHtml += '<div class="login-body">';
	loginHtml += '<div>';
	loginHtml += '<div id="userBox" class="flex"><i class="icod-user"></i><input class="flex-list" id="userName" type="text" value="" placeholder="请输入账号"></div>';
	loginHtml += '<div id="pwdBox" class="flex"><i class="icod-lock"></i><input class="flex-list" id="password" type="password" value="" placeholder="请填写密码"></div>';
	loginHtml += '</div>';  
	loginHtml += '<a href="javascript:;" style="background:#3997EE;width:50%;" class="btn" onclick="sdkApi.reg1()">一键注册</a><a href="javascript:;" style="width:50%;" class="btn" onclick="sdk.login()">登录</a>';
	loginHtml += '<div id="loginOption"   class="flex flex-x-between">'; 
	loginHtml += '<a href="javascript:;" onclick="sdkApi.showRegBox()" style="color:#999;">账号密码注册<a><a href="javascript:;" onclick="sdkApi.showFotPwdBox()" style="color:#999;">忘了密码?</a>';
	loginHtml += '</div>';      
	loginHtml += '</div>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	 
	$("body").append(loginHtml);
	
	if(sdkApi.isNotNull(sdkApi.getItem("userName"))){
		$("#userName").val(sdkApi.getItem("userName"));
	}
	if(sdkApi.isNotNull(sdkApi.getItem("password"))){
		$("#password").val(sdkApi.getItem("password"));
	}
	
};



//一键注册
sdkApi.reg1 = function(){
	var params = {};
	params["gameId"]=sdkApi.getItem("gameId");
	params["udid"] = sdkApi.getUdid(); 
	params["sdkVersion"]=sdkApi.sdkVersion;  
	params["channelId"]=sdkApi.getItem("channelId");
	params["channel"]=sdkApi.getItem("channelName");
	params["platformType"]=sdkApi.platformType;
	params["platformId"]=4;
	params["userId"]=0;
	params["mac"]="";
	params["uid"]="";
	params["ip"]=sdkApi.getItem("ip");
	params["gameVersion"]=sdkApi.getItem("appVersion");
	params["imei"]=sdkApi.getItem("imei");
	params["tBrand"]="";
	params["model"]= sdkApi.getItem("model");
	params["cid"]=sdkApi.getItem("channelId");
	params["os"]=sdkApi.platformType;
	params["visitType"]=sdkApi.getItem("visitType");
	sdkApi.showLoading();
	sdkApi.api(params,"random",function(retData){
		 if(retData.code == sdkApi.SUCCESS){
			 sdkApi.closeLoading();
			 sdkApi.showRegInfo(retData.data);
			  $("#userName").val(retData.data.userName);
			  $("#password").val(retData.data.password); 
			  sdkApi.setItem("userName",retData.data.userName);
			  sdkApi.setItem("userID",retData.data.userId);
			  sdkApi.setItem("sdkUserID",retData.data.userId);
			  sdkApi.setItem("password",retData.data.password);
			  sdkApi.setItem("sdkToken",retData.data.token);
			  sdkApi.setItem("openRealNameAuth",retData.data.openRealNameAuth);
		 }else{
			 sdkApi.closeLoading();
			 sdkApi.confirmDialog(retData.msg);
		 }
	});
};



sdkApi.checkMobile =function(phone){
	
	if (!/^1[3|4|5|7|8]\d{9}$/.test(phone) && phone !== undefined) {
        sdkApi.confirmDialog("请填入有效的手机号码！");
        return false;  
    } 
	return true;
	
};

//发送短信验证码 
sdkApi.sendUserInfo = function(){
	var phone =  $("#phone").val(); 
	
	var ret =  sdkApi.checkMobile(phone);
	if(!ret){
		return false;
	 }
	 
    var params =  {};
    params["userName"]= $("#h_userName").val();
    params["password"]= $("#h_password").val();
    params["uid"]= $("#h_uid").val();
    params["mobile"]= phone;
    params["udid"]= sdkApi.getUdid();
    params["gameId"]=sdkApi.getItem("gameId");
    sdkApi.showLoading();
	sdkApi.api(params,"sendUserInfo",function(retData){
		if(retData.code == sdkApi.SUCCESS){
				 sdkApi.closeRegInfo();
				 sdkApi.closeLoading();
				 sdkApi.confirmDialog(retData.msg);
		}else{
				 sdkApi.closeLoading();
				 sdkApi.confirmDialog(retData.msg);
		}
		});
     
};




sdkApi.closeRegInfo = function(){
	$("#showRegInfo").remove();
	/*if (sdkApi.getItem("openRealNameAuth") == "1" || sdkApi.getItem("openRealNameAuth") == "2"){
        sdkApi.loadAuthentication();
	}*/
};
//显示注册账号信息
sdkApi.showRegInfo = function(retData){  
	var loginHtml = '<div id="showRegInfo" class="mask login-box">';
	loginHtml += '<div class="r5">';   
	loginHtml += '<div class="login-head" style="text-align: right;"><span style="color:#d70c19">恭喜你注册成功！</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon-cancel" onclick="sdkApi.closeRegInfo()"></i></span></div>';  
	loginHtml += '<div class="login-body">';
	loginHtml += '<div>';  
	  
	loginHtml += '<div class="flex" style="border:none"><span style="color:#999;">您的账号：</span>'+retData.userName+'</div>';
	loginHtml += '<div class="flex" style="border:none"><span style="color:#999;">您的密码：</span>'+retData.password+'</div>';
	
	loginHtml += '<div class="flex" style="border:none"><span style="color:#999;"> 你也可以将账号信息发送至手机!</span></div>';  
   
	loginHtml += '<input type="hidden" id="h_userName" value="'+retData.userName+'" />';
	loginHtml += '<input type="hidden" id="h_password" value="'+retData.password+'" />';
	loginHtml += '<input type="hidden" id="h_uid" value="'+retData.uid+'" />';
	
	loginHtml += '<div class="flex"><i class="icod-mobile"></i><input class="flex-list" id="phone" type="text" value="" placeholder="请输入手机号码"></div>';
	loginHtml += '</div>';   
	loginHtml += '<a href="javascript:;" style="width:50%;" class="btn" onclick="sdkApi.sendUserInfo()">发送</a>'; 
	loginHtml += '</div>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	 
	$("body").append(loginHtml);
	
};


//关闭忘记密码页面
sdkApi.closeFotPwdBox =function(){
	$("#showFotPwdBox").remove();
};
sdkApi.showFotPwdBox =function(){ 	
	var loginHtml = '<div id="showFotPwdBox" class="mask2 login-box2">';  
	loginHtml += '<div class="r5" style="width: 16rem;margin:0 auto;">';                   
	loginHtml += '<div class="login-head" style="text-align: right;"><span><i class="icon-cancel" onclick="sdkApi.closeFotPwdBox()"></i></span></div>';   
	loginHtml += '<div class="login-body">';       
	loginHtml += '<iframe style="width: 16rem !important" frameborder="no" border="0px" height="300px" src="'+sdkApi.findPwdUrl+'"></iframe>'; 
	loginHtml += '</div>'; 
	loginHtml += '</div>';  
	loginHtml += '</div>';
	$("body").append(loginHtml);  	

};

sdkApi.closePayBox = function() {
    $("#payBox").remove();
};


sdkApi.api = function(param,apiName,callback){
	  var url = sdkApi.genSignUrl(param,apiName,sdkApi.apiUrl);
	  sdkApi.httpGet(url, function(retData) {
		  callback(retData);
	  }, "json");
	};


//实名认证
sdkApi.closeRealNameBox = function(params){
	$("#showRealNameBox").remove();
	if(params  != 2){
		  $("#payBox").show(); 
	}
};
sdkApi.showRealNameBox = function(params){
	var loginHtml = '<div id="showRealNameBox" class="mask login-box">';
	loginHtml += '<div class="r5">';  
	if(params.realNameAuthType == 2){ //强制开启实名认证，没有关闭按钮，无法关闭
		loginHtml += '<div class="login-head" style="text-align: right;"></div>';   
	}else{
		loginHtml += '<div class="login-head" style="text-align: right;"><span><i class="icon-cancel" onclick="sdkApi.closeRealNameBox('+params.realNameAuthType+')"></i></span></div>';   
	}
	
	loginHtml += '<div class="login-head" style="padding:0px;line-height:20px;font-size:14px;text-align: left; text-indent:20px;">根据文化部《互联网文化管理暂行规定》和《网络游戏管理暂行办法》的相关规定，未完成实名认证的用户将不能在游戏中进行支付。</div>';   
	loginHtml += '<div class="login-body">';        
	loginHtml += '<div>';  
	loginHtml += '<div  class="flex"><i class="icod-user"></i><input class="flex-list" id="r_name" type="text" value="" placeholder="请输入姓名"></div>';
	loginHtml += '<div  class="flex"><i class="icod-lock"></i><input class="flex-list" id="r_idcard" type="text" value="" placeholder="请输入身份证号"></div>';
	
	loginHtml += '</div>';   
	loginHtml += '<a href="javascript:;" class="btn" onclick="sdkApi.doRealName()">确定</a>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	$("body").append(loginHtml);
};

sdkApi.doRealName = function(){
	
	var  r_name = $("#r_name").val();
	var  r_idcard = $("#r_idcard").val(); 
	if(r_name == ''){
		 sdkApi.confirmDialog("请输入姓名！");
		 return false;
	}
	if(r_idcard == ''){
		 sdkApi.confirmDialog("请输入身份证号！");
		 return false;
	}
	
	sdkApi.showLoading(); 
	var params={};
	params["realName"] = r_name;
	params["idcard"] = r_idcard;
	params["uid"] = sdkApi.getItem("uid");
	params["gameId"] = sdkApi.getItem("gameId");
	
	  sdkApi.api(params,"doRealName",function(retData){
		    if(retData.code == 1){
		        sdkApi.confirmDialog(retData.msg,null,null,null,function(){
		        	  sdkApi.closeRealNameBox();
		        	  sdkApi.closeLoading();
		        	  $("#payBox").show(); 
		    	});  
		    	
		    }else{
		    	 sdkApi.closeLoading();
		    	sdkApi.confirmDialog(retData.msg);
		    }
		   
	  });
};



//上报玩家信息
sdkApi.reportRoleInfo = function (params){
	params["gameId"]= sdkApi.getItem("gameId");
	params["channelId"]= sdkApi.getItem("channelId");
	sdkApi.api(params,"reportRoleInfo",function(data){
		console.info("sdkApi reportRoleInfo====>"+JSON.stringify(data))
		var p={};
		p["method"]="rriCallBack";
		p["code"]=data.code;
		p["msg"]=data.msg;
		window.frames["gameFrame"].postMessage(p,"*");
	});
}; 






//初始化悬浮球
sdkApi.initFloatBox = function(){
    var params={};
    params["gameId"] = sdkApi.getItem("gameId");
    params["appVersion"] = sdkApi.getItem("appVersion");
    params["os"] = sdkApi.platformType;
    params["channel"] = sdkApi.getItem("channelId");
    params["platformType"] = sdkApi.platformType;
    params["platformId"] = sdkApi.platformId;
    params["mac"] = "";
    params["userId"] = sdkApi.getItem("sdkUserID");
    params["uid"] = "";
    params["gameVersion"] = sdkApi.getItem("appVersion");
    params["tBrand"] = "h5";
    params["model"] = sdkApi.getItem("model");
    params["sdkVersion"] = sdkApi.sdkVersion;
    params["channelId"] = sdkApi.getItem("channelId");
    params["cid"] = sdkApi.getItem("channelId");
    params["udid"] = sdkApi.getUdid();
    params["lang"] = "zh_CN";
    params["token"] = sdkApi.getItem("ucToken");
    if(!sdkApi.isNotNull(params["token"])){
    	window.location.href = sdkApi.host + sdkApi.getItem("loginUrl")+"?" + sdkApi.getItem("params");
    }
    params["sign"] = sdkApi.md5(params, sdkApi.getItem("appKey"));  
    
	var url = sdkApi.buildURL(sdkApi.apiUrl+"openGame",params); 
	sdkApi.httpGet(url, function(retData) {
		 if(retData.code == sdkApi.SUCCESS){
			
			 var data = retData.data;
			 var html="";
			 for (var i = 1; i < parseInt(data.menuSize)+1; i++) {
				 	var obj = data.menu["sort"+i];
				    html += '<div style="margin:0 9px;">';   
				    obj.menuUrl = obj.menuUrl + "?token=" + params.token + "&userId="+params.userId+"&gameId="+params.gameId+"&udid="+params.udid+"&sdkVersion="+params.sdkVersion+"&channel="+params.channel;
				    html +='<div style="width: 25px;height:25px;float:left; position: relative;left:'+(i-1)*6+'px" onclick="sdkApi.showUcBox(\''+obj.menuUrl+'\')">';
			        html += '<div  style="background:url('+obj.image+') no-repeat;width: 25px;height:25px;background-size: 100% auto;"></div>';
			        html +='<div style="width: 25px;height:25px;color:white;font-size:12px;">'+obj.menuName+'</div>';
			        html +='</div>';
			        html +='</div>';
			 };
			 	//切换账号
			 	html += '<div style="margin:0 9px;">';
			 	html +='<div style="width: 25px;height:25px;float:left; position: relative;left:'+parseInt(data.menuSize)*6+'px"" onclick="sdkApi.checkUcUser()">';
			 	html += '<div style="background:url(https://cdntf.infoxgame.com/uc.png) no-repeat;width: 25px;height:25px;background-size: 100% auto;"></div>';
			 	html +='<div style="width: 25px;height:25px;color:white;font-size:12px;">切换</div>';
			 	html +='</div>';
			 	html +='</div>';
			 $("#navDiv").css("width",(parseInt(data.menuSize+1) * 38)+"px");    
			 $("#navDiv").append(html);
		 }else{
			  sdkApi.confirmDialog(retData.msg);
		 }
	  }, "json"); 
};



sdkApi.httpPost = function(url,params,callback){
	
	$.ajax({
		url: sdkApi.host + url,
		type:'POST',
		async:false,
		data:params,
		dataType:'json',
		success:function(data){
			callback(data);
		}
	});
}


function getImei(imei){
	sdkApi.setItem("imei",imei);
}

function getUdid(udid){
	sdkApi.setItem("udid",udid);
}

function getIp(ip){
	sdkApi.setItem("ip",ip);
}

function getModel(model){
	sdkApi.setItem("model",model);
}

function getAppVersion(appVersion){
	sdkApi.setItem("appVersion",appVersion);
}
sdkApi.closeRealName = function(){
    $("#realNameAuthBox").remove();
    window.location.href= sdkApi.getItem("jumpUrl") + "?" + sdkApi.getItem("params");
};
//判断是否需要实名认证
sdkApi.loadAuthentication = function(){
    var realNameAuthStatus = sdkApi.getItem("realNameAuthStatus");
    var	openRealNameAuth = sdkApi.getItem("openRealNameAuth");
    var	userID = sdkApi.getItem("sdkUserID");
    var	cid = sdkApi.getItem("channelId");
    var	gameId = sdkApi.getItem("gameId");
    console.info(sdk.openRealNameAuthUrl + '?uid='+ userID + '&cid = '+cid +'&gameId='+gameId);
    if (openRealNameAuth == '1'){
        $("#realNameAuthBox").remove();
        var width =  $(window).width();
        var height =  $(window).height();
        var loginHtml = '<div id="realNameAuthBox" class="mask2 login-box2">';
        loginHtml += '<div class="r5" style="height:100%;margin:0 auto;top: 0;">';
       // loginHtml += '<div class="login-head" style="text-align: right;"><span style="color:#d70c19"></span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>';
        loginHtml += '<div class="login-head" style="text-align: right;"><i class="icon-cancel" onclick="sdkApi.closeRealName()"></i></div>';
        loginHtml += '<div class="login-body">';
        loginHtml += '<iframe style="width: '+ width +'px !important;height: '+ height +'px !important; " frameborder="no" border="0px" src="'+sdk.openRealNameAuthUrl + '?uid='+userID + '&cid='+cid +'&gameId='+gameId+' "></iframe>';
        loginHtml += '</div>';
        loginHtml += '</div>';
        loginHtml += '</div>';
        $("body").append(loginHtml);
    }
};





