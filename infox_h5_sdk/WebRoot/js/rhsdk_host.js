var sdk = window.PJ_SDK || {};
sdk.debug=false; 
sdk.platformId = 0;
sdk.channelId = -1; 
sdk.platformType =0;
sdk.host="https://h5.infoxgame.com/";
sdk.apiUrl = sdk.host+"ios/"; 
sdk.loginUrl= sdk.host+'/login.html'; 
sdk.thirdLoginUrl=sdk.host+"/v1/usercenter/"; 
sdk.xieYiUrl="https://h5.paojiao.cn/xieyi.html";
sdk.mainUrl= sdk.host+'main.html'; 
sdk.token = "";
sdk.imei = "";

sdk.findPwdUrl='http://sdkapi.infoxgame.com/wap/user/findPassword.do';
 
sdk.navInfo = {};
sdk.gameInfo = {};
 
sdk.SUCCESS = 1;
sdk.ERROR = 0;
sdk.appVersion="1.0";
sdk.sdkVersion="1.0"; 

sdk.shortcut={};
sdk.oW=0;
sdk.oH=0;

sdk.init = function() {
	var gameId = sdk.getURLVar("gameId");
	var channelId = sdk.getURLVar("channelId");
	var channelName = sdk.getURLVar("channelName");
	var edition = sdk.getURLVar("edition");
	
	if(sdk.isNotNull(gameId) && sdk.isNotNull(channelId)){
		var gameId_s =  sdk.getItem("gameId");
		var channelId_s =  sdk.getItem("channelId");
		if(sdk.isNotNull(gameId_s) && sdk.isNotNull(channelId_s)){
		         if(gameId_s != gameId  || channelId_s != channelId){
					 sdk.clearLoginItem();
					 sdk.setItem("gameId",gameId);
					 sdk.setItem("channelId",channelId);
				}
			}else{
				  sdk.setItem("gameId",gameId);
				  sdk.setItem("channelId",channelId);
			}
		}
	
	if(sdk.isNotNull(channelName)){
		var _channelName =  sdk.getItem("channelName");
		if(sdk.isNotNull(_channelName)){
			if(_channelName != channelName){
				sdk.setItem("channelName",channelName);
			}
		}else{
			sdk.setItem("channelName",channelName);
		}
	}else{
		sdk.setItem("channelName","");
	}
	
	if(sdk.isNotNull(edition)){
		var _edition =  sdk.getItem("edition");
		if(sdk.isNotNull(_edition)){
			if(_edition != edition){
				sdk.setItem("edition",edition);
			}
		}else{
			sdk.setItem("edition",edition);
		}
	}else{
		sdk.setItem("edition","");
	}
	
	
	if(!sdk.isNotNull(sdk.getItem("model"))){
		sdk.setItem("model","");
	}
};


sdk.isNotNull = function(str){
	 if(str != null && str != "null" && str != ""){ 
		  return true;
	}else{
		return false;
	}
};

sdk.init2 = function() { 
	 var gameId = sdk.getURLVar("gameId");
	 var channelId = sdk.getURLVar("channelId");
	 var uid = sdk.getURLVar("uid");
	 var sdkToken = sdk.getURLVar("sdkToken");
	 var openid = sdk.getURLVar("openid");
	 sdk.setItem("openid",openid);
	 
	 if(sdk.isNotNull(gameId)){ 
		 sdk.setItem("gameId",gameId);
	}
	if(sdk.isNotNull(channelId) ){ 
			sdk.setItem("channelId",channelId);
	}
	
	if(sdk.isNotNull(uid)){ 
		sdk.setItem("uid",sdk.getURLVar("uid"));
	}
	if(sdk.isNotNull(sdkToken)){ 
		sdk.setItem("sdkToken",sdk.getURLVar("sdkToken"));
	}
	
	if(!sdk.isNotNull(sdk.getItem("model"))){
		sdk.setItem("model","");
	}
	
};

sdk.log =function(title,data){
	if(sdk.debug){ 
		console.log("\n"+title+"\n"+JSON.stringify(data)+"\n");  
	}
};

//生成udid
sdk.getUdid = function(){ 
	var u = sdk.getItem("udid");
	if(!u){
		var gu = sdk.genUdid();
		sdk.setItem("udid",gu);
		return gu;
	}else{
		return u;
	}
};
sdk.s4 = function(){
	return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
sdk.genUdid = function(){ 
	return(sdk.s4() + sdk.s4()+ sdk.s4() + sdk.s4() + sdk.s4()+ sdk.s4() + sdk.s4() + sdk.s4());
};



//加载loading页
sdk.initLoading = function(callback){    
	$("#flash").show();  
	$("#flash").append(/*"<img src='"+sdk.host+"/images/pj_background_flash_logo.png'/>"*/);
			setTimeout(function () {
		    $("#flash").animate({opacity: 0}, 100, "swing", function () {
			$("#flash").remove();
			 callback(); 
		});
	}, 500);  

}; 


//获取游戏详细
sdk.getGameInfo = function(isLogin,callback) {
        
        var params={};
        params["gameId"] = sdk.getItem("gameId");
        params["appVersion"] =sdk.appVersion;
        params["os"] = sdk.platformType;
        params["channel"] = sdk.getItem("channelId");
        params["platformType"] = sdk.platformType;
        params["platformId"] = sdk.platformId;
        params["userId"] = 0;
        params["mac"] = "";
        params["uid"] = "";
        params["gameVersion"] = sdk.appVersion;
        params["imei"] = sdk.getItem("imei");
        params["sdkVersion"] = sdk.sdkVersion;
        params["tBrand"] = "h5";
        params["model"] = sdk.getItem("model");
        params["udid"] = sdk.getUdid();
        params["channelId"] = sdk.getItem("channelId");
        params["cid"] = sdk.getItem("channelId");
        params["edition"] = sdk.getItem("edition");
        
        sdk.api(params,"getGameInfo",function(retData){
        	if(retData.code != 1){
        		sdk.closeLoading(); 
   			 	sdk.confirmDialog(retData.msg);
        	}else{
        		sdk.setItem("appKey",retData.data.appKey);
        		sdk.setItem("mainUrl",retData.data.mainUrl);
    			callback(retData);
        	}
        	
        });
};

sdk.closeLoginBox = function(){
	$("#loginBox").remove(); 
};
//打开登录框
sdk.loadLoginBox = function(){
	var loginHtml = '<div id="loginBox" class="mask login-box">';
	loginHtml += '<div class="r5">';    
	loginHtml += '<div class="login-head"><img style="width: 220px;height:40px;" src="'+sdk.host+'images/titleIcon_yh_two.png" />&nbsp;</div>';
	loginHtml += '<div class="login-body">';
	loginHtml += '<div>';
	loginHtml += '<div id="userBox" class="flex"><i class="icod-user"></i><input class="flex-list" id="userName" type="text" value="" placeholder="请输入账号"></div>';
	loginHtml += '<div id="pwdBox" class="flex"><i class="icod-lock"></i><input class="flex-list" id="password" type="password" value="" placeholder="请填写密码"></div>';
	loginHtml += '</div>';   
	loginHtml += '<a href="javascript:;" style="background:#3997EE;width:50%;" class="btn" onclick="sdk.reg1()">一键注册</a><a href="javascript:;" style="width:50%;" class="btn" onclick="sdk.login()">登录</a>';
	
	loginHtml += '<div id="loginOption"   class="flex flex-x-between">'; 
	loginHtml += '<a href="javascript:;" onclick="sdk.showRegBox()" style="color:#999;">账号密码注册<a><a href="javascript:;" onclick="sdk.showFotPwdBox()" style="color:#999;">忘了密码?</a>';
	loginHtml += '</div>';      
	loginHtml += '</div>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	 
	$("body").append(loginHtml);
	
	if(sdk.isNotNull(sdk.getItem("userName"))){
		$("#userName").val(sdk.getItem("userName"));
	}
	if(sdk.isNotNull(sdk.getItem("password"))){
		$("#password").val(sdk.getItem("password"));
	}
	
};





//登录
sdk.login = function(){
	

	var userName = $("#userName").val();
	var password = $("#password").val();
	
	sdk.setItem("userName",userName);
	sdk.setItem("password",password);
	
	
	if(userName == ''){
		sdk.confirmDialog("请输入用户名");
		return ;
	}
	if(password == ''){
		sdk.confirmDialog("请输入密码");
		return ;
	}

	var params = {}; 
	params["channelSYID"]=sdk.getItem("channelName");
	params["gameVersionCode"]="1";
	params["appID"]=sdk.getItem("gameId");
	params["gameId"]=sdk.getItem("gameId");
	params["imei"]=sdk.getItem("imei");
	params["checkUpdate"]=0;
	params["model"] = sdk.getItem("model");
	params["udid"]=sdk.getUdid();
	params["mac"]="";
	params["channelID"]=sdk.getItem("channelId");
	params["cid"]=sdk.getItem("channelId"); 
	params["sdkVersionCode"] = 1;
	params["ip"]=sdk.getItem("ip");
	params["userName"] = userName;
	params["password"] = password;
	
	
	sdk.showLoading(); 
	sdk.getToken(params);
};

//自动登录
sdk.autoLogin = function(){
	 
	 //微信使用微信自动登录
	
		 	var sdkToken = sdk.getItem("sdkToken");
			if(sdkToken != null && sdkToken != "null" && sdkToken != ""){
				var params={};
				params["extension"]= sdkToken;
				params["channelSYID"]="";
				params["gameVersionCode"]="1";
				params["appID"]=sdk.getItem("gameId");
				params["imei"]=sdk.getItem("imei");
				params["checkUpdate"]=0;
				params["model"] = sdk.getItem("model");
				params["udid"]=sdk.getUdid();
				params["mac"]="";
				params["channelID"]=sdk.getItem("channelId"); 
				params["sdkVersionCode"] = 1;
				params["ip"]=sdk.getItem("ip");
				sdk.getToken(params);
			}else{
				 sdk.loadLoginBox();
			}
	
		
};


//退出登录
sdk.logout = function(){
	var param={};
	param["channelId"] = sdk.getItem("channelId");
	param["gameId"] = sdk.getItem("gameId");
	var url = sdk.buildURL(sdk.loginUrl,param);  
	
	sdk.removeItem("channelId");
	sdk.removeItem("gameId");
	sdk.removeItem("sdkToken");
	sdk.removeItem("uid");
	window.location.href= url;
};



//退出登录2
sdk.clearLoginItem = function(){
	sdk.removeItem("channelId");
	sdk.removeItem("gameId");
	sdk.removeItem("sdkToken");
	sdk.removeItem("uid");
};


//验证token
sdk.getToken = function(params){
	sdk.api(params,"getToken",function(retData){
		
		 if(retData.state == sdk.SUCCESS){ 
			 sdk.closeLoginBox();
			 var sdkUserID = retData.data.sdkUserID;
			 var token = retData.data.token;
			 var userID = retData.data.userID;
			 sdk.setItem("uid",userID);
			 sdk.setItem("sdkToken",token);
			 sdk.setItem("ucToken",retData.ucToken);
			 sdk.setItem("sdkUserID",sdkUserID);
			 window.location.href= sdk.mainUrl;
		 }else{
			 sdk.closeLoading(); 
			 sdk.confirmDialog(retData.msg); 
		 }

	}); 
};

//一键注册
sdk.reg1 = function(){
	var params = {};
	params["gameId"]=sdk.getItem("gameId");
	params["udid"] = sdk.getUdid(); 
	params["sdkVersion"]=sdk.sdkVersion;  
	params["channelId"]=sdk.getItem("channelId");
	params["channel"]=sdk.getItem("channelId");
	params["platformType"]=0;
	params["platformId"]=4;
	params["userId"]=0;
	params["mac"]="";
	params["uid"]="";
	params["ip"]=sdk.getItem("ip");
	params["gameVersion"]=sdk.appVersion;
	params["imei"]=sdk.getItem("imei");
	params["tBrand"]="";
	params["model"]= sdk.getItem("model");
	params["cid"]=sdk.getItem("channelId");
	params["os"]=sdk.platformType;
	sdk.showLoading(); 
	sdk.api(params,"random",function(retData){
		 if(retData.code == sdk.SUCCESS){
			 sdk.closeLoading();
			 sdk.showRegInfo(retData.data);
			  $("#userName").val(retData.data.userName);
			  $("#password").val(retData.data.password); 
			  sdk.setItem("userName",retData.data.userName);
			  sdk.setItem("password",retData.data.password);
			  sdk.setItem("sdkToken",retData.data.token); 
		 }else{
			 sdk.closeLoading();
			 sdk.confirmDialog(retData.msg);
		 }
	});
};


sdk.closeRegInfo = function(){
	$("#showRegInfo").remove();
};
//显示注册账号信息
sdk.showRegInfo = function(retData){  
	var loginHtml = '<div id="showRegInfo" class="mask login-box">';
	loginHtml += '<div class="r5">';   
	loginHtml += '<div class="login-head" style="text-align: right;"><span style="color:#d70c19">恭喜你注册成功！</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon-cancel" onclick="sdk.closeRegInfo()"></i></span></div>';  
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
	loginHtml += '<a href="javascript:;" style="width:50%;" class="btn" onclick="sdk.sendUserInfo()">发送</a>'; 
	loginHtml += '</div>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	 
	$("body").append(loginHtml);
	
};

sdk.checkMobile =function(phone){
	
	if (!/^1[3|4|5|7|8]\d{9}$/.test(phone) && phone !== undefined) {
        sdk.confirmDialog("请填入有效的手机号码！");
        return false;  
    } 
	return true;
	
};

//发送短信验证码 
sdk.sendUserInfo = function(){
	var phone =  $("#phone").val(); 
	
	var ret =  sdk.checkMobile(phone);
	if(!ret){
		return false;
	 }
	 
    var params =  {};
    params["userName"]= $("#h_userName").val();
    params["password"]= $("#h_password").val();
    params["uid"]= $("#h_uid").val();
    params["mobile"]= phone;
    params["udid"]= sdk.getUdid();
    params["gameId"]=sdk.getItem("gameId");
    sdk.showLoading();
	sdk.api(params,"sendUserInfo",function(retData){
		if(retData.code == sdk.SUCCESS){
				 sdk.closeRegInfo();
				 sdk.closeLoading();
				 sdk.confirmDialog(retData.msg);
		}else{
				 sdk.closeLoading();
				 sdk.confirmDialog(retData.msg);
		}
		});
     
};


//打开账号注册页面
sdk.closeRegBox = function(){
	$("#showRegBox").remove();
};
sdk.showRegBox = function(){   
	var loginHtml = '<div id="showRegBox" class="mask login-box">';
	loginHtml += '<div class="r5">';        
	loginHtml += '<div class="login-head" style="text-align: right;"><img style="width: 220px;height:40px;" src="'+sdk.host+'/images/titleIcon_yh_two.png" />&nbsp;<span><i class="icon-cancel" onclick="sdk.closeRegBox()"></i></span></div>';
	loginHtml += '<div class="login-body">';
	loginHtml += '<div>'; 
	loginHtml += '<div  class="flex"><i class="icod-user"></i><input class="flex-list" id="r_userName" type="text" value="" placeholder="请输入账号"></div>';
	loginHtml += '<div  class="flex"><i class="icod-lock"></i><input class="flex-list" id="r_password" type="password" value="" placeholder="请填写密码"></div>';
	loginHtml += '<div  class="flex"><i class="icod-lock"></i><input class="flex-list" id="r1_password" type="password" value="" placeholder="请确认密码"></div>';
	  
	loginHtml += '<div  class="flex" style="border:none"><input type="checkbox" id="agreeCk" style="-webkit-appearance:checkbox;height:21px;" checked="checked" />&nbsp;<font style="color:#999">我已阅读并接受</font>&nbsp;<font style="color:#3997EE"> <a href="javascript:;" onclick="sdk.showXieYi()" style="line-height:0px;">>>用户服务协议</a></font></div>';
	
	loginHtml += '</div>';   
	loginHtml += '<a href="javascript:;" class="btn" onclick="sdk.reg2()">注册</a>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	
	$("body").append(loginHtml);
	
};

sdk.closeXieYi = function(){
	$("#showXieYi").remove();
};
sdk.showXieYi =function(){
	var loginHtml = '<div id="showXieYi" style="top:0px;" class="mask2 login-box2">'; 
	loginHtml += '<div class="r5" style="margin:0 auto;top:0px;-webkit-border-radius:0px;border-radius:0px;">';          
	loginHtml += '<div class="login-head2" style="text-align: right;"><span><i class="icon-cancel" onclick="sdk.closeXieYi()"></i></span></div>';   
	loginHtml += '<div class="login-body">';    
	loginHtml += '<iframe width="100%" frameborder="no" border="0px"  height="'+($(window).height()-60)+'px" src="'+sdk.xieYiUrl+'"></iframe>';   
	loginHtml += '</div>';     
	loginHtml += '</div>';  
	loginHtml += '</div>';
	$("body").append(loginHtml); 
};


//账号密码注册
sdk.reg2 = function(){
	var r_userName = $("#r_userName").val();
	var r_password = $("#r_password").val();
	var r1_password = $("#r1_password").val();

	
	var isChecked = $('#agreeCk').is(":checked"); 
	if(!isChecked){
		 sdk.confirmDialog("必须接受用户协议"); 
		 return false;
	}
	
	if(r_userName == ''){
		 sdk.confirmDialog("请输入用户名");
		 return false;
	}
	if(r_password == '' || r1_password == ''){
		 sdk.confirmDialog("请输入密码");
		 return false;
	}
	if(r_password != r1_password){
		 sdk.confirmDialog("两次输入的密码不一致");
		 return false;
	}

	var params = {};	
	params["gameId"]=sdk.getItem("gameId");
	params["appVersion"]=sdk.appVersion;
	params["os"]=sdk.platformType;
	params["channel"]=sdk.getItem("channelId");
	params["platformType"]=0;
	params["platformId"]=4;
	params["userName"]= r_userName; 
	params["userId"]=0;
	params["mac"]="";
	params["uid"]="";
	params["password"]= r_password;
	params["ip"]=sdk.getItem("ip");
	params["gameVersion"]=sdk.appVersion;
	params["imei"]=sdk.getItem("imei");
	params["sdkVersion"]=sdk.sdkVersion; 
	params["tBrand"] = sdk.platformType;
	params["model"]= sdk.getItem("model");
	params["udid"] = sdk.getUdid();
	params["channelId"]=sdk.getItem("channelId");
	params["platformId"]=sdk.platformId;
	params["cid"]=sdk.getItem("channelId");
	
	 sdk.showLoading();
	 sdk.api(params,"reg",function(retData){
		 if(retData.code == sdk.SUCCESS){
			  sdk.closeRegBox();  
			  sdk.closeLoading();
			  sdk.confirmDialog(retData.msg);
			  $("#userName").val(r_userName);
			  $("#password").val(r_password);
			  sdk.setItem("sdkToken",retData.data.token); 
		 }else{
			 sdk.closeLoading();
			 sdk.confirmDialog(retData.msg);  
		 }
	});
	
};


//关闭忘记密码页面
sdk.closeFotPwdBox =function(){
	$("#showFotPwdBox").remove();
};
sdk.showFotPwdBox =function(){ 	
	var loginHtml = '<div id="showFotPwdBox" class="mask2 login-box2">';  
	loginHtml += '<div class="r5" style="width: 16rem;margin:0 auto;">';                   
	loginHtml += '<div class="login-head" style="text-align: right;"><span><i class="icon-cancel" onclick="sdk.closeFotPwdBox()"></i></span></div>';   
	loginHtml += '<div class="login-body">';       
	loginHtml += '<iframe style="width: 16rem !important" frameborder="no" border="0px" height="300px" src="'+sdk.findPwdUrl+'"></iframe>'; 
	loginHtml += '</div>'; 
	loginHtml += '</div>';  
	loginHtml += '</div>';
	$("body").append(loginHtml);  	

};

sdk.closePayBox = function() {
    $("#payBox").remove();
};

//打开选择支付
sdk.loadPayBox = function(params) {
	
		$("#payBox").remove();
		/*sdk.showLoading(); */
		params["appKey"]=sdk.getItem("appKey"); 
		params["userID"]=sdk.getItem("uid");
	   //获取支付配置 
	   sdk.api(params,"getOrderUrl",function(retData){
		   if(retData.state == 1){
			   var data = retData.data;
	 		   sdk.closeLoading(); 
	 		 var width =  $(window).width();
	 		 var loginHtml = '<div id="payBox" class="mask2 login-box2">';  
				loginHtml += '<div class="r5" style="width: '+ parseFloat(width) * 0.8 +'px;margin:0 auto;">';                   
				loginHtml += '<div class="login-head" style="text-align: right;"><span><i class="icon-cancel" onclick="sdk.closePayBox()"></i></span></div>';   
				loginHtml += '<div class="login-body">';       
				loginHtml += '<iframe style="width: '+ parseFloat(width) * 0.8 +'px !important" frameborder="no" border="0px" height="300px" src="'+data.url+'"></iframe>'; 
				loginHtml += '</div>'; 
				loginHtml += '</div>';  
				loginHtml += '</div>';
				$("body").append(loginHtml);  
	 	   }else{ 
	 		  sdk.confirmDialog("获取支付配置失败！");
	 		/* sdk.closeLoading();*/
	 	   }
		   
		});

	   
};


//实名认证
sdk.closeRealNameBox = function(params){
	$("#showRealNameBox").remove();
	if(params  != 2){
		  $("#payBox").show(); 
	}
};
sdk.showRealNameBox = function(params){
	var loginHtml = '<div id="showRealNameBox" class="mask login-box">';
	loginHtml += '<div class="r5">';  
	if(params.realNameAuthType == 2){ //强制开启实名认证，没有关闭按钮，无法关闭
		loginHtml += '<div class="login-head" style="text-align: right;"></div>';   
	}else{
		loginHtml += '<div class="login-head" style="text-align: right;"><span><i class="icon-cancel" onclick="sdk.closeRealNameBox('+params.realNameAuthType+')"></i></span></div>';   
	}
	
	loginHtml += '<div class="login-head" style="padding:0px;line-height:20px;font-size:14px;text-align: left; text-indent:20px;">根据文化部《互联网文化管理暂行规定》和《网络游戏管理暂行办法》的相关规定，未完成实名认证的用户将不能在游戏中进行支付。</div>';   
	loginHtml += '<div class="login-body">';        
	loginHtml += '<div>';  
	loginHtml += '<div  class="flex"><i class="icod-user"></i><input class="flex-list" id="r_name" type="text" value="" placeholder="请输入姓名"></div>';
	loginHtml += '<div  class="flex"><i class="icod-lock"></i><input class="flex-list" id="r_idcard" type="text" value="" placeholder="请输入身份证号"></div>';
	
	loginHtml += '</div>';   
	loginHtml += '<a href="javascript:;" class="btn" onclick="sdk.doRealName()">确定</a>';
	loginHtml += '</div>';
	loginHtml += '</div>';
	$("body").append(loginHtml);
};

sdk.doRealName = function(){
	
	var  r_name = $("#r_name").val();
	var  r_idcard = $("#r_idcard").val(); 
	if(r_name == ''){
		 sdk.confirmDialog("请输入姓名！");
		 return false;
	}
	if(r_idcard == ''){
		 sdk.confirmDialog("请输入身份证号！");
		 return false;
	}
	
	sdk.showLoading(); 
	var params={};
	params["realName"] = r_name;
	params["idcard"] = r_idcard;
	params["uid"] = sdk.getItem("uid");
	params["gameId"] = sdk.getItem("gameId");
	
	  sdk.api(params,"doRealName",function(retData){
		    if(retData.code == 1){
		        sdk.confirmDialog(retData.msg,null,null,null,function(){
		        	  sdk.closeRealNameBox();
		        	  sdk.closeLoading();
		        	  $("#payBox").show(); 
		    	});  
		    	
		    }else{
		    	 sdk.closeLoading();
		    	sdk.confirmDialog(retData.msg);
		    }
		   
	  });
};


//跳转支付
sdk.pay = function(params) {
	if(sdk.isWeixin()){
		params["isWeixin"] = "1";
		params["openid"] =  sdk.getItem("openid");
	}else{
		params["isWeixin"] = "0";
	}
	
	   sdk.api(params,"pay",function(retData){
		   if(retData.code == "1"){   
			   
			   if(params.payType == 1){//支付宝支付
				var  url  =    retData.data.ret;
				
				 if(url.indexOf("alipaysubmit") >= 0){//支付宝官方
					$("body").html(retData.data.ret);    
				  }else{
				 	  window.location.href= retData.data.ret;
				  }
				 
			   }else if(params.payType == 2){//微信支付
				    window.location.href= retData.data.ret;
			   }else if(params.payType == 0){//泡椒币支付
				    sdk.confirmDialog(retData.data.ret);
			   }
			   
			   sdk.closeLoading();
			   
			  }else{
				  sdk.confirmDialog(retData.msg);
				  sdk.closeLoading(); 
			  }
	      
	   });
	    
}; 


//上报玩家信息
sdk.reportRoleInfo = function (params){
	params["gameId"]= sdk.getItem("gameId");
	params["channelId"]= sdk.getItem("channelId");
	sdk.api(params,"reportRoleInfo",function(data){
		var p={};
		p["method"]="rriCallBack";
		p["code"]=data.code;
		p["msg"]=data.msg;
		window.frames["gameFrame"].postMessage(p,"*");
	});
}; 




function touchstart(e){
	var touches = e.touches[0]; 
	sdk.oW = touches.clientX -  sdk.shortcut.offsetLeft;
	sdk.oW = touches.clientY -  sdk.shortcut.offsetTop;
	document.addEventListener("touchmove", defaultEvent, false);
	 
}
function touchmove(e){
	var touches = e.touches[0];
	var oLeft = touches.clientX - sdk.oW;
	var oTop = touches.clientY - sdk.oW;
		
if(oLeft < 0) {
		oLeft = 0;
	}
	if(oTop <0 ){
		oTop = 0; 
	}
	
	var rLeft = document.documentElement.clientWidth - sdk.shortcut.offsetWidth;
	if(oLeft > rLeft){
		oLeft = rLeft; 
	}
	
	var htop = document.documentElement.clientHeight - sdk.shortcut.offsetHeight;
	if(oTop > htop){
		oTop = htop; 
	}

	sdk.shortcut.style.left = oLeft + "px";
	sdk.shortcut.style.top = oTop + "px";
	
}

function touchend(e){
	
	
	document.removeEventListener("touchmove", defaultEvent, false);
	
	var touches = e.changedTouches[0];
	
	var oLeft = touches.clientX - sdk.oW;
	var oTop = touches.clientY - sdk.oW;
	
	if(oLeft > (document.documentElement.clientWidth/2)){
		sdk.shortcut.style.right =  "-10px"; 
		sdk.shortcut.style.left ="auto";
		$("#shortcut").css("opacity","0.4");
		$("#shortcut").css("filter","alpha(opacity=40)");
     }else{ 
    	 sdk.shortcut.style.left = "-10px";
    	 $("#shortcut").css("opacity","0.4");
 		$("#shortcut").css("filter","alpha(opacity=40)");
     }


}
function defaultEvent(e) {
	e.preventDefault();

}

sdk.bindTouchEvent = function(){
	sdk.shortcut = document.getElementById("shortcut");
	sdk.shortcut.addEventListener("touchstart", touchstart, false)
	sdk.shortcut.addEventListener("touchmove", touchmove, false); 
	sdk.shortcut.addEventListener("touchend", touchend, false);
};

//移除touch事件
sdk.unbindTouchEvent = function(){
	sdk.shortcut.removeEventListener("touchmove", touchmove, false);
	sdk.shortcut.removeEventListener("touchstart", touchstart, false);
	sdk.shortcut.removeEventListener("touchend", touchend, false);
};






//启动悬浮窗
sdk.enableFloatBox = function() {
		$("#shortcut").remove();
        var t = '<div id="shortcut"  style="width: 50px;height:50px;left: -10px;opacity:0.4;filter:alpha(opacity=70);"  class="shortcut">';
        t += '<div class="flex" onclick="sdk.showNav()" id="iconDiv" style="width: 50px;height:50px;float:left;">';
        t += '<div id="ic-menu" class="r50" style="width: 50px;height:50px;"><span style="width: 50px;height:50px;" class="r50"></span></div>';
        t += "</div>";
        t += '<div  id="navDiv" style="display:none;width: 50px;height:50px;border: 3px solid #232529;border-radius:25px;background-color:#44474e;float:left;text-align: center;">';

        t += "</div>";
        t += "</div>";
        $("body").append(t);
        
        //绑定touch事件
        sdk.bindTouchEvent();
		
		//初始化悬浮球菜单
		sdk.initFloatBox();
		
		window.setInterval(function(){
			 if( !$("#showUcBox").length > 0  && !$("#payBox").length > 0 ){
				$("#gameFrame").focus();
			 }
			 
		},1000);
			
		
		
};

//初始化悬浮球
sdk.initFloatBox = function(){
	
    var params={};
  
   
    params["gameId"] = sdk.getItem("gameId");
    params["appVersion"] = sdk.appVersion;
    params["os"] = sdk.platformType;
    params["channel"] = sdk.getItem("channelId");
    params["platformType"] = sdk.platformType;
    params["platformId"] = sdk.platformId;
    params["mac"] = "";
    params["userId"] = sdk.getItem("sdkUserID");
    params["uid"] = "";
    params["gameVersion"] = sdk.appVersion;
    params["tBrand"] = "h5";
    params["model"] = sdk.getItem("model");
    params["sdkVersion"] = sdk.sdkVersion;
    params["channelId"] = sdk.getItem("channelId");
    params["cid"] = sdk.getItem("channelId");
    params["udid"] = sdk.getUdid();
    params["lang"] = "zh_CN";
    params["token"] = sdk.getItem("ucToken");
    params["sign"] = sdk.md5(params,sdk.getItem("appKey"));  
    
	var url = sdk.buildURL(sdk.apiUrl+"openGame",params); 
	 sdk.httpGet(url, function(retData) {
		 if(retData.code == sdk.SUCCESS){
			
			 var data = retData.data;
			 var html="";
			 for (var i = 1; i < parseInt(data.menuSize)+1; i++) {
				 	var obj = data.menu["sort"+i];
				    html += '<div style="margin:0 9px;">';   
				  
				    html +='<div style="width: 25px;height:25px;float:left; position: relative;left:'+(i-1)*6+'px" onclick="sdk.showUcBox(\''+obj.menuUrl+'\')">';
			        html += '<div  style="background:url('+obj.image+') no-repeat;width: 25px;height:25px;background-size: 100% auto;"></div>';
			        html +='<div style="width: 25px;height:25px;color:white;font-size:12px;">'+obj.menuName+'</div>';
			        html +='</div>';
			        html +='</div>';
			 };
			 	//切换账号
			 	html += '<div style="margin:0 9px;">';
			 	html +='<div style="width: 25px;height:25px;float:left; position: relative;left:'+parseInt(data.menuSize)*6+'px"" onclick="sdk.checkUcUser()">';
			 	html += '<div style="background:url(https://cdntf.infoxgame.com/uc.png) no-repeat;width: 25px;height:25px;background-size: 100% auto;"></div>';
			 	html +='<div style="width: 25px;height:25px;color:white;font-size:12px;">切换</div>';
			 	html +='</div>';
			 	html +='</div>';
			 $("#navDiv").css("width",(parseInt(data.menuSize+1) * 38)+"px");    
			 $("#navDiv").append(html);
		 }else{
			  sdk.confirmDialog(retData.msg);
		 }
	  }, "json"); 
};

//显示悬浮菜单
sdk.showNav =function(){
	var r =   $("#navDiv").css("display");
	
	if(r =="none"){  
		
		sdk.unbindTouchEvent();
		
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
		 
		sdk.bindTouchEvent();
	}
	 $("#shortcut").css("opacity","1");
	 $("#shortcut").css("filter","alpha(opacity=100)");

}
//切换用户，返回登录页
sdk.checkUcUser = function(){
	sdk.setItem("sdkToken","null");
	window.location.href = sdk.host + "login.html?gameId="+sdk.getItem("gameId")+"&channelId="+sdk.getItem("channelId")+"&edition="+sdk.getItem("edition");
}

//打开用户中心
sdk.closeUcBox = function(){  
	$("#showUcBox").remove();	
};
sdk.showUcBox = function(ucurl){  
	
	$("#iconDiv").trigger("click");
	
	var loginHtml = '<div id="showUcBox" style="top:0px;" class="mask2 login-box2">'; 
	loginHtml += '<div class="r5" style="margin:0 auto;top:0px;-webkit-border-radius:0px;border-radius:0px;">';         
	loginHtml += '<div class="login-head2"  style="text-align: right;"><span><i class="icon-cancel" onclick="sdk.closeUcBox()"></i></span></div>';   
	loginHtml += '<div class="login-body" style="height:'+($(window).height()-40)+'px !important;-webkit-overflow-scrolling: touch; overflow-y: scroll;">';                   
	loginHtml += '<iframe  width="'+$(window).width()+'px !important" frameborder="no" scrolling="yes" border="0px" height="100%"   src="'+ucurl+'"></iframe>';   
	loginHtml += '</div>';
	loginHtml += '</div>';       
	loginHtml += '</div>';  
	$("body").append(loginHtml);
	
};


//第三方登录
sdk.thirdLogin = function(type){ 
switch (type) {
	case 1: {//微信登录
		sdk.wxLogin();
		break;
    }
	case 2: {//QQ登录
		sdk.qqLogin();
		break;
    }
	case 3: {//新浪微博登录
		sdk.wbLogin();
		break;
    }
}
};

//微信登录
sdk.wxLogin = function(){
	var param ={};
	param["gameId"]=sdk.getItem("gameId");
	param["channelId"]=sdk.getItem("channelId");
	param["udid"]=sdk.getUdid(); 
	var url = "";
	if(sdk.isWeixin()){ 
		 url = sdk.buildURL(sdk.thirdLoginUrl+"client",param);
	}else{
		 url = sdk.buildURL(sdk.thirdLoginUrl+"page",param);
	}
	window.location.href = url;
};

//qq登录
sdk.qqLogin = function(){
	var param ={};
	param["gameId"]=sdk.getItem("gameId");
	param["channelId"]=sdk.getItem("channelId");
	param["udid"]=sdk.getUdid(); 
	var url = sdk.buildURL(sdk.thirdLoginUrl+"qqLogin",param);  
	window.location.href = url;
};

//微博登录
sdk.wbLogin = function(){
	var param ={};
	param["gameId"]=sdk.getItem("gameId");
	param["channelId"]=sdk.getItem("channelId");
	param["udid"]=sdk.getUdid(); 
	var url = sdk.buildURL(sdk.thirdLoginUrl+"wbLogin",param); 
	window.location.href = url;
};




sdk.confirmDialog = function(txt, oklabel, cancellabel, okcallback, cancelcallback, title, callback) {
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


sdk.closeLoading = function() {
    $("#loadingBox").remove();
};
//加载loading动画
sdk.showLoading = function() {
    if (!$("#loadingBox").length) {
        var html = '<div id="loadingBox" class="mask loading"><div><div></div><div></div><div></div><div></div><div></div></div></div>';
        $("body").append(html);
    }
};


sdk.api = function(param,apiName,callback){
	
  var url = sdk.genSignUrl(param,apiName);
  sdk.httpGet(url, function(retData) {
	  callback(retData);
  }, "json"); 
	
};



sdk.md5 = function(data,key){ 
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


sdk.genSignUrl = function(param,apiName){
	var key = sdk.getItem("appKey");
	var url = sdk.buildURL(sdk.apiUrl+apiName,param); 
	var sign = "";
	// console.log("======0===========>>" + url);
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
   // console.log("======3===========>>" + url);
	return url;
};



sdk.httpGet = function(url, callback, type) {
	
	  $.ajax({
          type: "GET",
          url: url,
          dataType: type,
          success: function(data){
        	  sdk.log(url,data);
        	  callback(data);
           },
           error:function(e){ 
        	   console.log(e);
        	   sdk.closeLoading();
        	   sdk.confirmDialog("网络错误，请重试！");
           }
      });
 };
 
 sdk.httpGet2 = function(url,callback) {
		
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
 
		
 
sdk.getURLVar = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null
};

sdk.setURLVar = function(url, key, value) {
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

sdk.buildURL = function(url, args) {
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


sdk.isMobile = function() { 
    var userAgent = navigator.userAgent.toLowerCase();
    var agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
    for (var v = 0; v < agents.length; v++) {
        if (userAgent.indexOf(agents[v]) > 0) {
            return true;
        }
    } 
    return false;
};

sdk.isWeixin = function() {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
};

sdk.isiOS = function() {
	return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
};

sdk.setItem = function(key, value) {
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
sdk.getItem = function(key) {
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
sdk.removeItem = function(key) {
    if (window.localStorage) {
        window.localStorage.removeItem("pj_" + key);
    } else {
        var exp = new Date;
        exp.setTime(exp.getTime() - 1);
        var cval = sdk.getItem(key);
        if (cval != null) {
            document.cookie = "pj_" + key + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
};
sdk.setSession = function(key, value) {
    if (window.sessionStorage) {
        window.sessionStorage.setItem("pj_" + key, value);
    }
};
sdk.getSession = function(key) {
    if (window.sessionStorage) {
        return window.sessionStorage.getItem("pj_" + key);
    }
    return null
};
sdk.removeSession = function(key) {
    if (window.sessionStorage) {
        window.sessionStorage.removeItem("pj_" + key);
    }
};


window.PJ_SDK = sdk;