//泡椒h5sdk-客户端
var pjsdk = window.YH_PJ_SDK_CLIENT || {};
pjsdk.uid = null;
pjsdk.channelGameId = null;
pjsdk.channel = null;
pjsdk.sdkToken = null;

//初始化
pjsdk.initSdk = function (p) {
	pjsdk.uid = p["uid"];
	pjsdk.sdkToken = p["sdkToken"];
};

//支付
pjsdk.loadPayBox = function (p) {
	p["uid"] = pjsdk.uid;
	p["token"] = pjsdk.sdkToken;
	pjsdk.sendMsg(p, "PJ_loadPayBox");
};


//支付
pjsdk.logout = function (p) {
	pjsdk.sendMsg(p, "PJ_logout");
};


//上报玩家信息
pjsdk.reportRoleInfo = function (p, callback) {
	p["uid"] = pjsdk.uid;
	p["token"] = pjsdk.sdkToken;
	pjsdk.sendMsg(p, "PJ_reportRoleInfo");

	function _reportCallback(event) {
		if (event.data.method == "rriCallBack") {
			window.removeEventListener("message", _reportCallback, false);
			callback(event.data);
		}
	}

	window.addEventListener("message", _reportCallback, false);


};

pjsdk.sendMsg = function (_param, _method) {
	var p = {
		method: _method,
		param: _param
	};
	window.postMessage(p, "*");
};

pjsdk.getURLVar = function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	return r != null ? unescape(r[2]) : null
};

window.YH_PJ_SDK_CLIENT = pjsdk;