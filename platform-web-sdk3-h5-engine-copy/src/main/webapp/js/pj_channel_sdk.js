//泡椒h5sdk-渠道sdk
var pjChannelSdk = window.PJ_CHANNEL_SDK || {};

pjChannelSdk.host="https://h5.paojiao.cn";
pjChannelSdk.sdkVersion="1.0.0";

pjChannelSdk.initData = {};

//初始化参数
pjChannelSdk.init = function(channelGameId,channel,appVersion){
    pjChannelSdk.initData["channelGameId"] = channelGameId;
    pjChannelSdk.initData["channel"] = channel;
    pjChannelSdk.initData["appVersion"] = appVersion;
};

//验证渠道token
pjChannelSdk.getToken = function(sdkToken,callback){
    var params={};
    params["sdkToken"]= sdkToken;
    params["sdkVersion"]=pjChannelSdk.sdkVersion;
    params["udid"]= pjapi.getUdid();
    params["channel"]= pjChannelSdk.initData.channel;
    params["channelGameId"] = pjChannelSdk.initData.channelGameId;
    params["appVersion"]=  pjChannelSdk.initData.appVersion;
    pjapi.httpPost(pjChannelSdk.host+"/api/getToken",params,function(data){
        callback(data);
    });
};

//加载闪屏
/*pjChannelSdk.initLoading = function(callback){
    $("#flash").show();
    $("#flash").append("<img src='https://h5.infoxgame.com/images/duojiao_loading.png'/>");
    setTimeout(function () {
        $("#flash").animate({opacity: 0}, 500, "swing", function () {
            $("#flash").remove();
            callback();
        });
    }, 1000);
};*/

//获取游戏信息
pjChannelSdk.getGameInfo = function(callback){

    var params={};
    params["channelGameId"] = pjChannelSdk.initData.channelGameId;
    params["channel"] = pjChannelSdk.initData.channel;
    params["udid"] =  pjapi.getUdid();
    params["isLogin"] = true;

    pjapi.httpPost(pjChannelSdk.host+"/api/getGameInfo",params,function(data){
        callback(data);
    });
};

//生成融合sdk订单
pjChannelSdk.getOrderNo = function(params,callback){
    pjapi.httpPost(pjChannelSdk.host+"/api/getOrderNo",params,function(data){
        callback(data);
    });
};

pjChannelSdk.closePayBox =function(){
    $("#payBox").remove();
};

//开始消息监听
pjChannelSdk.startEventListener = function(){
    window.addEventListener("message", receiveMessage, false);
};

window.PJ_CHANNEL_SDK = pjChannelSdk;
