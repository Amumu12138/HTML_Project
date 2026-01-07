var sdk = window.PJ_SDK || {};
sdk.platformId = 1;//安卓
sdk.platformType =1;
sdk.host = "https://h5.infoxgame.com/";
//sdk.host = "http://localhost/infox_h5_sdk/";
sdk.apiUrl = sdk.host+"ios/";
sdk.loginUrl= sdk.host+'/login.html';
sdk.xieYiUrl="https://h5.paojiao.cn/xieyi.html";
sdk.mainUrl= sdk.host+'main.html';
sdk.findPwdUrl='http://sdkapi.infoxgame.com/wap/user/findPassword.do';
sdk.SUCCESS = 1;
sdk.appVersion= "1.0";
sdk.sdkVersion= "1.0";


sdk.init = function() {
	sdkApi.setItem("jumpUrl","iosmain.html");
	sdkApi.setItem("loginUrl","ioslogin.html");
	sdkApi.init(sdk);
};

sdk.init2 = function() {
	sdkApi.setItem("jumpUrl","iosmain.html");
	sdkApi.setItem("loginUrl","ioslogin.html");
	sdkApi.init2(sdk);
};

sdk.init3 = function() {
    sdkApi.setItem("jumpUrl","newiosmain.html");
    sdkApi.setItem("loginUrl","newioslogin.html");
    sdkApi.init3(sdk);
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
	sdkApi.api(params,"login",function(retData){

		 if(retData.code == sdk.SUCCESS){
			 sdkApi.closeLoginBox();
			 var token = retData.data.token;
			 var userID = retData.data.userId;
			 sdkApi.setItem("uid",userID);
			 sdkApi.setItem("sdkToken",token);
			 sdkApi.setItem("ucToken",token);
			 sdkApi.setItem("sdkUserID",userID);
			 window.location.href= sdkApi.getItem("jumpUrl")+ "?" + sdkApi.getItem("params");
		 }else{
			 sdkApi.closeLoading();
			 sdkApi.confirmDialog(retData.msg);
		 }

	});
};

//自动登录
sdk.autoLogin = function(){
	var sdkToken = sdkApi.getItem("sdkToken");
	if(sdkToken != null && sdkToken != "null" && sdkToken != ""){
		var params={};
		params["token"]= sdkToken;
		params["gameId"]=sdkApi.getItem("gameId");
		params["cid"]=sdkApi.getItem("channelId");
		params["udid"]=sdkApi.getUdid();
		params["model"] = sdkApi.getItem("model");
		params["imei"]=sdkApi.getItem("imei");
		params["mac"]="";
		params["platformType"]="1";
		params["ip"]=sdkApi.getItem("ip");
		sdkApi.api(params,"userToken",function(retData){
			 if(retData.code == sdk.SUCCESS){
				 sdkApi.closeLoginBox();
				 var token = retData.data.token;
				 var userID = retData.data.userId;
				 sdkApi.setItem("uid",userID);
				 sdkApi.setItem("sdkToken",token);
				 window.location.href= sdkApi.getItem("jumpUrl") + "?" + sdkApi.getItem("params");
			 }else{
				 sdkApi.closeLoading();
				 sdkApi.confirmDialog(retData.msg);
				 setTimeout(function(){sdkApi.loadLoginBox();},1000);

			 }

		});
	}else{
		sdkApi.loadLoginBox();
	}
};






//打开选择支付
sdk.loadPayBox = function(params) {

		$("#payBox").remove();
		params["userID"]=sdkApi.getItem("uid");
		params["gameId"] = sdkApi.getItem("gameId");
		params["cpOrderID"] = params.extension;
		params["cid"] = sdkApi.getItem("channelId");
		params["gameVersion"] = sdkApi.getItem("appVersion");
		params["token"] = sdkApi.getItem("sdkToken");
		sdkApi.httpPost("ios/getOrder",params,function(retData){
			 if(retData.code == 1){
				 sdkApi.closeLoading();
				 var data = retData.data;
				 if(data.checkY == 'r' && data.flag == "0xff15S1"){

					 var iosPay = {};
					 iosPay["uid"] = data.userID;
					 iosPay["price"] = params.money;
					 iosPay["orderNo"] = data.orderID;
					 iosPay["roleID"] = params.roleID;
					 iosPay["roleName"] = params.roleName;
					 iosPay["serverID"] = params.serverID;
					 iosPay["serverName"] = params.serverName;
					 iosPay["channel"] = params.cid;
					 iosPay["appVrsion"] = sdkApi.getItem("appVersion");
					 iosPay["productID"] = retData.productID;
					 iosPay["payInfo"] = params.productDesc;
					 iosPayParams(iosPay);
				 }else{
				 	 var width =  $(window).width() ;
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
				 }
		 	   }else{
		 		  sdkApi.confirmDialog("获取支付配置失败！");
		 	   }
		});
};

//获取设备号
sdk.getDeviceMumber = function(){
    var params = {};
    params["gameId"]=sdkApi.getItem("gameId");
    params["imei"]=sdkApi.getItem("imei");
    params["model"] = sdkApi.getItem("model");
    params["udid"]=sdkApi.getItem("udid");
    params["mac"]="";
    params["cid"]=sdkApi.getItem("channelId");
    params["ip"]=sdkApi.getItem("ip");
    if (params["ip"] !=""){
        var nowIp = params["ip"].substring(0,2);
        if (nowIp == "17" ){
            $.ajax({
                url: "https://h5.infoxgame.com/ios/saveDevice",
                type:'POST',
                async:false,
                data:params,
                dataType:'json',
                success:function(data){
                    callback("成功："+data);
                }
        });
	  }
	}
    //window.webkit.messageHandlers.sendGoodsInfo.postMessage("++++++设备号信息++++++："+JSON.stringify(params));

};





function iosPayParams(iosPay) {
	window.webkit.messageHandlers.sendGoodsInfo.postMessage(iosPay);
}


window.PJ_SDK = sdk;
