var sdk = window.PJ_SDK || {}; 
sdk.platformId = 0;//安卓
sdk.platformType =0;
sdk.host = "https://h5.infoxgame.com/";
//sdk.host = "http://localhost/infox_h5_sdk/";
sdk.apiUrl = sdk.host+"api/"; 
sdk.loginUrl= sdk.host+'/login.html'; 
sdk.xieYiUrl="https://h5.paojiao.cn/xieyi.html";
sdk.mainUrl= sdkApi.host+'main.html'; 
sdk.findPwdUrl='http://sdkapi.infoxgame.com/wap/user/findPassword.do';
sdk.SUCCESS = 1;
sdk.appVersion= "1.0";
sdk.sdkVersion= "1.0"; 
sdk.openRealNameAuthUrl = "https://sdkapi.infoxgame.com//idcard/tobind.do";

sdk.init = function() {
	sdkApi.setItem("jumpUrl","main.html");
	sdkApi.setItem("loginUrl","login.html");
	sdkApi.init(sdk);
};

sdk.init2 = function() {
	sdkApi.setItem("jumpUrl","main.html");
	sdkApi.setItem("loginUrl","login.html");
	sdkApi.init2(sdk);
};

//登录
sdk.login = function(){
	var userName = $("#userName").val();
	var password = $("#password").val();
	sdkApi.setItem("userName",userName);
	sdkApi.setItem("password",password);
	if(userName == ''){
		sdkApi.confirmDialog("请输入用户名");
		return ;
	}
	if(password == ''){
		sdkApi.confirmDialog("请输入密码");
		return ;
	}
	var params = {}; 
	params["channelSYID"]=sdkApi.getItem("channelName");
	params["gameVersionCode"]="1";
	params["appID"]=sdkApi.getItem("gameId");
	params["gameId"]=sdkApi.getItem("gameId");
	params["imei"]=sdkApi.getItem("imei");
	params["checkUpdate"]=0;
	params["model"] = sdkApi.getItem("model");
	params["udid"]=sdkApi.getUdid();
	params["mac"]="";
	params["channelID"]=sdkApi.getItem("channelId");
	params["cid"]=sdkApi.getItem("channelId"); 
	params["sdkVersionCode"] = 1;
	params["ip"]=sdkApi.getItem("ip");
	params["userName"] = userName;
	params["password"] = password;
	sdkApi.showLoading(); 
	sdk.getToken(params);
};

//自动登录
sdk.autoLogin = function(){
	var sdkToken = sdkApi.getItem("sdkToken");
	if(sdkToken != null && sdkToken != "null" && sdkToken != ""){
		var params={};
		params["extension"]= sdkToken;
		params["channelSYID"]="";
		params["gameVersionCode"]="1";
		params["appID"]=sdkApi.getItem("gameId");
		params["imei"]=sdkApi.getItem("imei");
		params["checkUpdate"]=0;
		params["model"] = sdkApi.getItem("model");
		params["udid"]=sdkApi.getUdid();
		params["mac"]="";
		params["channelID"]=sdkApi.getItem("channelId"); 
		params["sdkVersionCode"] = 1;
		params["ip"]=sdkApi.getItem("ip");
		params["realNameAuthStatus"]= sdkApi.getItem("realNameAuthStatus");
		sdk.getToken(params);
	}else{
		sdkApi.loadLoginBox();
	}	
};

//验证token
sdk.getToken = function(params){
	sdkApi.api(params,"getToken",function(retData){
		 if(retData.state == sdk.SUCCESS){ 
			 sdkApi.closeLoginBox();
			 var sdkUserID = retData.data.sdkUserID;
			 var token = retData.data.token;
             var userID = retData.data.userID;
			 var paojiaoId = retData.data.suid;
             var openRealNameAuth = retData.data.openRealNameAuth;
             var realNameAuthStatus = retData.data.realNameAuthStatus;
			 sdkApi.setItem("uid",paojiaoId);
			 sdkApi.setItem("userID",userID);
			 sdkApi.setItem("sdkToken",token);
			 sdkApi.setItem("ucToken",retData.ucToken);
			 sdkApi.setItem("sdkUserID",sdkUserID);
			 sdkApi.setItem("openRealNameAuth",openRealNameAuth);
			 sdkApi.setItem("realNameAuthStatus",realNameAuthStatus);
			 //实名认证开启状态
			/* if (openRealNameAuth =="1" && realNameAuthStatus =="0"){
                 sdkApi.loadAuthentication();
             }else{

             }*/
             window.location.href= sdkApi.getItem("jumpUrl") + "?" + sdkApi.getItem("params");
		 }else{
			 sdkApi.closeLoading(); 
			 sdkApi.confirmDialog(retData.msg); 
		 }

	}); 
};

//打开选择支付
sdk.loadPayBox = function(params) {
	
		$("#payBox").remove();
		/*sdk.showLoading(); */
		params["appKey"]=sdkApi.getItem("appKey"); 
		params["userID"]=sdkApi.getItem("userID");
    	params["channelName"] =sdkApi.getItem("channelName");

	    //获取支付配置
		sdkApi.api(params,"getOrderUrl",function(retData){
		   if(retData.state == 1){  
			 sdkApi.closeLoading(); 
			 var data = retData.data;
	 		 var width =  $(window).width();
               var height =  $(window).height() ;
               var loginHtml = '<div id="payBox" class="mask2 login-box2">';
               loginHtml += '<div class="r5" style="height:100%;margin:0 auto;top: 0;">';
               loginHtml += '<div class="login-head" style="text-align: right;"><span><i class="icon-cancel" onclick="sdkApi.closePayBox()"></i></span></div>';
               loginHtml += '<div class="login-body">';
               loginHtml += '<iframe style="width: '+ width +'px !important;height: '+ height +'px !important; " frameborder="no" border="0px" src="'+data.url+' "></iframe>';
               loginHtml += '</div>';
               loginHtml += '</div>';
               loginHtml += '</div>';
               $("body").append(loginHtml);
	 	   }else{ 
	 		  sdkApi.confirmDialog("获取支付配置失败！");
	 	   }
		});
};

window.PJ_SDK = sdk;