/**
 * 此js用于和sdk交互
 */

/**
 * 返回游戏
 */
function backGame(){
	console.log("返回游戏")
	try{
		//安卓返回游戏
		pjsdk.back2Game();
	}catch(err){
	}

	try{
		//ios返回游戏
		window.webkit.messageHandlers.back2Game.postMessage(null);
	}catch(err){
	}

	try{
		//h5返回游戏
		let jsonarray = {};
		jsonarray["method"] = "closePayBox";
		jsonarray["code"] = 1;
		console.log(jsonarray);
		top.postMessage(jsonarray, "*");
	}catch (err){
	}

};

/**
 * 支付成功
 */
function callPaySuccess(){
	try{
		console.log("支付完成")
		pjsdk.onPaymentSuccess('');

		//自动返回游戏
		// setTimeout(function(){
		//
		// 	pjsdk.back2Game();
		//
		// },1000);

	}catch(err){
	}
};

/**
 * 支付失败
 */
function callPayFailure(){
	try{
		pjsdk.onPaymentError(0,"","");
	}catch(err){

	}
};


$(function(){
	$(".back2game").click(backGame);
});

