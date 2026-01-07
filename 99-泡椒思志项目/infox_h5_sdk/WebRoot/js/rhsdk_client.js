var pjsdk = window.PJ_SDK_CLIENT || {};
pjsdk.uid=null; 
pjsdk.channelGameId = null;
pjsdk.channel= null;
pjsdk.sdkToken= null;

//初始化
pjsdk.initSdk = function(p) {
	pjsdk.uid = p["uid"]; 
	pjsdk.sdkToken = p["sdkToken"];
};

//支付
pjsdk.loadPayBox = function(p) {
    pjsdk.sendMsg(p,"loadPayBox");
};

pjsdk.closeIframe = function(p){
	pjsdk.sendMsg(p,"closeIframe");
};
//实名认证
pjsdk.loadAuthentication = function(p){
    pjsdk.sendMsg(p,"loadAuthentication");
};




//上报玩家信息
pjsdk.reportRoleInfo = function(p,callback){
	 pjsdk.sendMsg(p,"reportRoleInfo"); 
	  
	 function _reportCallback(event) {
		 if(event.data.method=="rriCallBack"){
			  window.removeEventListener("message", _reportCallback, false);
			  callback(event.data);
		 }
	   }
	 
	  window.addEventListener("message", _reportCallback, false);


};



pjsdk.sendMsg = function(_param,_method){
	console.log("====>> send msg "+JSON.stringify(_param));
	 var p = {
				method:_method,
			    param:_param
			 } 
	 parent.postMessage(p,"*");
};

pjsdk.getURLVar = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null
};




window.PJ_SDK_CLIENT = pjsdk;

