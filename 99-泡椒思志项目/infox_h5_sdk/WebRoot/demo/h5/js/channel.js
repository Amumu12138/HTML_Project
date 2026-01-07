var channelSDK = {};
channelSDK.SUCCESS = 1;

channelSDK.init = function(isTest,host,gameId,channelID){
	
	/*$("body").css({
		 "width" : $(window).width() +'px',
		 "height": $(window).height() + 'px'
	});*/
	
	channelSDK["isTest"] = isTest;
	channelSDK["host"] = host;
	channelSDK["gameId"] = gameId;
	channelSDK["channelID"] = channelID;
	channelSDK["imei"] = "";
	channelSDK["udid"] = "";
	channelSDK["ip"] = "";
	channelSDK["model"] = "H5";
	channelSDK["appVersion"] = "1.0.0";
}

channelSDK.getCpToken = function(extension,callback){
	
	var params={};
	params["extension"]= extension;
	params["channelSYID"]= "";
	params["gameVersionCode"]= channelSDK.appVersion;
	params["appID"]= channelSDK.gameId;
	params["imei"]= channelSDK.imei;
	params["checkUpdate"]=0;
	params["model"] = channelSDK.model;
	params["udid"]= channelSDK.udid;
	params["mac"]="";
	params["channelID"]= channelSDK.channelID;
	params["sdkVersionCode"] = 1;
	params["isTest"] = channelSDK.isTest; 
	
	httpGet(channelSDK.host + "getCptoKen",params,function(data){
		callback(data);			
	});
}


//开始消息监听
channelSDK.startEventListener = function(){
	window.addEventListener("message", receiveMessage, false);
}

function httpGet(hosturl,params,callback) {
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
 
 
 function httpPost(hosturl,params,callback) {
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
 
 channelSDK.getURLParams = function(){
	 var param = location.search.substr(1).split("&");
		var params = {};
		for(var i = 0 ; i < param.length ;i ++){
			var split = param[i].split("=");
			params[""+split[0]] = split[1];
		}
	return params;
 }
 
 
 channelSDK.getOrderUrl = function(params,url){
	 url += '?';
	 for(var i in params){
		 var _t = i + '=' + params[i] + '&';
		 url += _t;
	 }
	 url = url.substring(0,url.length-1);
	 return url;
 }