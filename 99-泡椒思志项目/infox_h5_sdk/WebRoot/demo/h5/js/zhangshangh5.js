var play = {
    /// <summary>
    ///  版本
    /// </summary>
    version: "5.0.2.1",
    docs: '未经允许请勿修改',
    sdk: { init: function (_init, func) { play.init(_init, func); }, pay: function (_pay) { play.pay(_pay); } },
    data: {
        init: "init", pay: "pay", dev: "dev"
    }
}
/*
<!--game_files_start-->
*/
play.init = function (_init, func) {
    debugger;
    _init.action = play.data.init;
    var InitStr = JSON.stringify(_init);
    window.parent.postMessage(InitStr, "*");
    debugger;
    /*发送给提供支付平台*/play.protocol(func);/*接收返回信息*/ }
/*
<!--game_pay_start-->
*/
play.pay = function (_paydata) { _paydata.action = play.data.pay; var payStr = JSON.stringify(_paydata); window.parent.postMessage(payStr, "*"); }
/*
<!--game_dev_start-->
*/
play.dev = function (_dev, func) { _dev.action = play.data.dev; var _dev = JSON.stringify(_dev); window.parent.postMessage(_dev, "*"); play.protocol(func); }

play.protocol = function (func) { window.addEventListener("message", function (evt) { if (evt.source != window.parent) return; if (typeof func == 'function') { func(evt.data); } }, false); }


