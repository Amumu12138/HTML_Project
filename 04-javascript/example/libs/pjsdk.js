window.pjsdk = {};

(function (pjsdk) {
    'use strict';
    class CommonUtils {
        static getUdid() {
            var udid = window.localStorage.getItem("udid");
            if (!udid) {
                udid = CommonUtils.genUdid();
                window.localStorage.setItem("udid", udid);
            }
            return udid;
        }
        static s4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        //----生成uuid----
        static genUUID() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 8; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            var uuid = s.join("");
            return uuid;
        }

        static getUUID() {
            var _uuid = window.localStorage.getItem("_uuid");
            if (_uuid) {
                console.log("Amumu uuid:" + _uuid);
                return _uuid;
            } else {
                _uuid = CommonUtils.genUUID();
                window.localStorage.setItem("_uuid", _uuid);
            }
            return _uuid;
        }
        static hasUUID() {
            return window.localStorage.getItem("_uuid") ? true : false;
        }

        static genPassword() {
            var s = [];
            var hexDigits = "0123456789qwerty";
            for (var i = 0; i < 10; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            var uuid = s.join("");
            return uuid;
        }

        static getPassword() {
            var _passowrd = window.localStorage.getItem("_passowrd");
            if (_passowrd) {
                console.log("Amumu passowrd:" + _passowrd);
                return _passowrd;
            } else {
                _passowrd = CommonUtils.genPassword();
                window.localStorage.setItem("_passowrd", _passowrd);
            }
            return _passowrd;
        }

        static genUdid() {
            return (CommonUtils.s4() + CommonUtils.s4() + CommonUtils.s4() + CommonUtils.s4() +
                CommonUtils.s4() + CommonUtils.s4() + CommonUtils.s4() + CommonUtils.s4());
        };
        static checkMobile(phone) {
            if (!/^1[3|4|5|7|8]\d{9}$/.test(phone) && phone !== undefined) {
                return false;
            }
            return true;
        };
        static getItem(key) {
            if (window.localStorage) {
                return window.localStorage.getItem("pj_" + key);
            } else {
                var arr = document.cookie.match(new RegExp("(^| )pj_" + key + "=([^;]*)(;|$)"));
                if (arr != null) {
                    return unescape(arr[2]);
                }
            }
            return null;
        }
        static setItem(key, value) {
            if (window.localStorage) {
                try {
                    window.localStorage.setItem("pj_" + key, value);
                } catch (err) {}
            } else {
                var exp = new Date();
                exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1e3);
                document.cookie = "pj_" + key + "=" + escape(value) + ";expires=" + exp.toUTCString();
            }
        }
        static getURLVar(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            return r != null ? unescape(r[2]) : null;
        };
        static buildURL(url, args) {
            if (url) {
                var urlList = url.split("#");
                var params = {};
                var query = urlList[0].split("?")[1];
                var result = urlList[0].split("?")[0] + "?";
                if (query) {
                    query = query.split("&");
                    for (var i in query) {
                        var vars = query[i].split("=");
                        params[vars[0]] = vars[1];
                    }
                }
                for (var i in args) {
                    params[i] = args[i];
                }
                var first = true;
                for (var i in params) {
                    result += (first ? "" : "&") + i + "=" + (params[i] ? params[i] : "");
                    first = false;
                }
                return result + (urlList[1] ? "#" + urlList[1] : "");
            }
            return "";
        };
    }

    class HttpUtils {
        static httpUtilGet(url, response, error = null, process = null, timeout = null) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4 && (XMLHttpReq.status >= 200 && XMLHttpReq.status < 300)) {
                    var data = XMLHttpReq.responseText;
                    var json = JSON.parse(data);
                    if (response) {
                        response(data);
                    }
                }
            };
            xhr.timeout = 5000;
            xhr.ontimeout = function (e) {
                console.log("Amumu HttpUtils httpUtilGet timeout", e);
                if (timeout) {
                    timeout();
                }
            };
            xhr.onerror = function (e) {
                console.log("Amumu HttpUtils httpUtilGet onerror", e);
                if (error) {
                    error();
                }
            };
            xhr.send(null);
        }
        static httpUtilPost(url, params, response, error = null, process = null, timeout = null) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4 && (XMLHttpReq.status >= 200 && XMLHttpReq.status < 300)) {
                    var data = XMLHttpReq.responseText;
                    var json = JSON.parse(data);
                    if (response) {
                        response(data);
                    }
                }
            };
            xhr.timeout = 5000;
            xhr.ontimeout = function (e) {
                console.log("Amumu HttpUtils httpUtilPost timeout", e);
                if (timeout) {
                    timeout();
                }
            };
            xhr.onerror = function (e) {
                console.log("Amumu HttpUtils httpUtilPost onerror", e);
                if (error) {
                    error();
                }
            };
            xhr.send(params);
        }
        static httpUtilPostJson(url, json, response, error = null, process = null, timeout = null) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4 && (XMLHttpReq.status >= 200 && XMLHttpReq.status < 300)) {
                    var data = XMLHttpReq.responseText;
                    var json = JSON.parse(data);
                    if (response) {
                        response(data);
                    }
                }
            };
            xhr.timeout = 5000;
            xhr.ontimeout = function (e) {
                console.log("Amumu HttpUtils httpUtilPostJson timeout", e);
                if (timeout) {
                    timeout();
                }
            };
            xhr.send(json);
        }
    };

    class Event {
        constructor(type, data) {
            this.type = type;
            this.data = data;
        }
        stopImmediatePropagation() {
            this.isPropagationImmediateStopped = true;
        }
        clean() {
            this.data = this.target = null;
            this.isPropagationImmediateStopped = false;
        }
        static create(EventClass, type) {
            let eventPool;
            let hasEventPool = EventClass.hasOwnProperty("eventPool");
            if (hasEventPool) {
                eventPool = EventClass.eventPool;
            }
            if (!eventPool) {
                eventPool = EventClass.eventPool = [];
            }
            if (eventPool.length) {
                let event = eventPool.pop();
                event.type = type;
                return event;
            }
            return new EventClass(type);
        }
        static dispatchEvent(target, type, data) {
            let event = Event.create(Event, type);
            event.data = data;
            target.dispatchEvent(event);
            Event.release(event);
        }
        static release(event) {
            event.clean();
            let EventClass = Object.getPrototypeOf(event).constructor;
            EventClass.eventPool.push(event);
        }
    }

    class EventDispatcher {
        constructor() {
            this.dicEventListener = new Map();
            this.onceList = new Array();
        }
        on(type, listener, caller, priority, once) {
            let arr;
            if (this.hasEventListener(type)) {
                arr = this.dicEventListener.get(type);
            } else {
                arr = new Array();
                this.dicEventListener.set(type, arr);
            }
            this.insertEventBin(arr, type, listener, caller, priority, !!once);
            return this;
        }
        once(type, listener, caller, priority) {
            this.on(type, listener, caller, priority, true);
            return this;
        }
        off(type, listener, caller) {
            this.removeListener(type, listener, caller);
            return this;
        }
        offAll(type) {
            if (!!type && this.hasEventListener(type)) {
                this.dicEventListener.delete(type);
            } else {
                this.dicEventListener.clear();
            }
            return this;
        }
        offAllCaller(caller) {
            let arr = new Array();
            this.dicEventListener.forEach(v => {
                for (let i = 0; i < v.length; i++) {
                    let eventBin = v[i];
                    if (eventBin.thisObject == caller) {
                        arr.push(eventBin);
                    }
                }
            });
            for (let i = 0; i < arr.length; i++) {
                let e = arr[i];
                this.removeListener(e.type, e.listener, e.thisObject);
            }
            return this;
        }
        hasEventListener(type) {
            return this.dicEventListener.has(type);
        }
        dispatchEvent(ev) {
            ev.target = this;
            this.notifyListener(ev);
        }
        dispatchEventWith(type, data) {
            if (this.hasEventListener(type)) {
                let event = Event.create(Event, type);
                event.data = data;
                this.dispatchEvent(event);
                Event.release(event);
            }
            return true;
        }
        insertEventBin(list, type, listener, thisObject, priority, dispatchOnce) {
            priority = +priority | 0;
            let insertIndex = -1;
            let length = list.length;
            for (let i = 0; i < length; i++) {
                let bin = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
                    return false;
                }
                if (insertIndex == -1 && bin.priority < priority) {
                    insertIndex = i;
                }
            }
            let eventBin = {
                type: type,
                listener: listener,
                thisObject: thisObject,
                priority: priority,
                target: this,
                dispatchOnce: !!dispatchOnce
            };
            if (insertIndex !== -1) {
                list.splice(insertIndex, 0, eventBin);
            } else {
                list.push(eventBin);
            }
            return true;
        }
        removeListener(type, listener, caller) {
            if (this.hasEventListener(type)) {
                this.removeEventBin(this.dicEventListener.get(type), listener, caller);
            }
        }
        removeEventBin(list, listener, caller) {
            let length = list.length;
            for (let i = 0; i < length; i++) {
                let bin = list[i];
                if (bin.listener == listener && bin.thisObject == caller && bin.target == this) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
        notifyListener(event) {
            let list = this.dicEventListener.get(event.type);
            if (!list) {
                return;
            }
            let length = list.length;
            if (length == 0) {
                return;
            }
            for (let i = 0; i < list.length; i++) {
                let eventBin = list[i];
                if (eventBin == null) {
                    continue;
                }
                eventBin.listener.call(eventBin.thisObject, event);
                if (eventBin.dispatchOnce) {
                    this.onceList.push(eventBin);
                }
                if (event.isPropagationImmediateStopped) {
                    break;
                }
            }
            while (this.onceList.length) {
                let eventBin = this.onceList.pop();
                eventBin.target.off(eventBin.type, eventBin.listener, eventBin.thisObject);
            }
        }
    }

    class EventDef {}
    EventDef.INIT = "INIT";
    EventDef.LOGIN = "LOGIN";
    EventDef.LOGOUT = "LOGOUT";
    EventDef.REPORT_ROLE_INFO = "REPORT_ROLE_INFO";
    EventDef.LOAD_PAYBOX = "LOAD_PAYBOX";
    EventDef.MESSAGE = "MESSAGE";
    EventDef.RRI_CALLBACK = "RRI_CALLBACK";
    EventDef.SHARE = "SHARE";
    EventDef.RECORDER_START = "RECORDER_START";
    EventDef.RECORDER_STOP = "RECORDER_STOP";

    class EventHandleMgr extends EventDispatcher {
        constructor() {
            super();
        }
        static get Instance() {
            if (this._instance == null) {
                this._instance = new EventHandleMgr();
            }
            return this._instance;
        }
        init() {
            EventHandleMgr.Instance.on(EventDef.INIT, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.LOGIN, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.LOGOUT, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.LOAD_PAYBOX, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.REPORT_ROLE_INFO, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.MESSAGE, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.RRI_CALLBACK, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.SHARE, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.RECORDER_START, this.handleMsg, this, 0);
            EventHandleMgr.Instance.on(EventDef.RECORDER_STOP, this.handleMsg, this, 0);
        }
        handleMsg(event) {
            switch (event.type) {
                case EventDef.INIT:
                    console.log("Amumu EventHandleMgr init response data = ", event.data);
                    PLATSDK.getSDK().init();
                    break;
                case EventDef.LOGIN:
                    console.log("Amumu EventHandleMgr login response data = ", event.data);
                    PLATSDK.getSDK().login(event.data.callback);
                    break;
                case EventDef.LOGOUT:
                    console.log("Amumu EventHandleMgr logout response data = ", event.data);
                    break;
                case EventDef.LOAD_PAYBOX:
                    console.log("Amumu EventHandleMgr loadPaybox response data = ", event.data);

                    PLATSDK.getSDK().doPay(event.data);
                    break;
                case EventDef.REPORT_ROLE_INFO:
                    console.log("Amumu EventHandleMgr reportRoleInfo response data = ", event.data);

                    window.pjsdk.reportRoleInfoReq(event.data);
                    break;
                case EventDef.MESSAGE:
                    console.log("Amumu EventHandleMgr messgae response data = ", event.data);
                    break;
                case EventDef.RRI_CALLBACK:
                    console.log("Amumu EventHandleMgr rriCallBack response data = ", event.data);
                    break;
                case EventDef.SHARE:
                    console.log("Amumu EventHandleMgr share response data = ", event.data);
                    PLATSDK.getSDK().shareToFriend();
                    break;
                case EventDef.RECORDER_START:
                    console.log("Amumu EventHandleMgr recorderStart response data = ", event.data);
                    PLATSDK.getSDK().onGameRecorderStart(event.data.callback);
                    break;
                case EventDef.RECORDER_STOP:
                    console.log("Amumu EventHandleMgr recorderStop response data = ", event.data);
                    PLATSDK.getSDK().onGameRecorderStop(event.data.callback);
                    break;
                default:
                    break;
            }
        }
    }
    EventHandleMgr._instance = null;


    class BaseSDK {
        static getInstance() {
            if (!this._instance) {
                this._instance = new BaseSDK();
            }
            return this._instance;
        }
        init() {}
        login(callback = null) {}
        doPay(params) {}
        onGameRecorderManagerInit() {}
        onGameRecorderStart(callback = null) {}
        onGameRecorderStop(callback = null) {}
        shareToFriend() {}
    }

    class WXSDK extends BaseSDK {
        constructor() {
            super(...arguments);
            this.openid = "";
        }
        static getInstance() {
            if (!this._instance) {
                this._instance = new WXSDK();
            }
            return this._instance;
        }

        login(callback = null) {
            let self = this;
            wx.login({
                success(res) {
                    if (res.code) {
                        console.log("Amumu WXSDK res = ", res);
                        var sdkToken = JSON.stringify({
                            js_code: res.code
                        });
                        console.log("Amumu WXSDK login sdkToken", sdkToken);
                        wx.request({
                            url: pjsdk.hostUrl + '/api/getToken',
                            data: {
                                sdkToken: sdkToken,
                                sdkVersion: pjsdk.version,
                                udid: CommonUtils.getUdid(),
                                channel: pjsdk.initData.channel,
                                channelGameId: pjsdk.initData.channelGameId,
                                appVersion: pjsdk.initData.appVersion
                            },
                            success(res) {
                                console.log("Amumu WXSDK login success", res);
                                self.openid = res.openid;
                                if (callback)
                                    callback();
                            }
                        });
                    } else {
                        console.log('Amumu WXSDK login fail' + res.errMsg);
                    }
                }
            });
        }
        doPay(params) {
            wx.requestMidasPayment({
                mode: "game",
                env: 0,
                offerId: 0,
                currencyType: "CNY",
                platform: "android",
                buyQuantity: params.buyQuantity,
                success(res) {
                    console.log("Amumu WXSDK doPay success", res);
                },
                fail(error) {
                    console.log("Amumu WXSDK doPay fail", error);
                },
                complete(complete) {
                    console.log("Amumu WXSDK doPay complete", complete);
                }
            });
        }
    }
    WXSDK._instance = null;

    class QQSDK extends BaseSDK {
        static getInstance() {
            if (!this._instance) {
                this._instance = new QQSDK();
            }
            return this._instance;
        }
        init() {
            qq.getSystemInfo({
                success(res) {
                    console.log(`Amumu QQSDK init getSystemInfo res = `, JSON.stringify(res));
                }
            });
        }
        login(callback = null) {
            qq.login({
                success(res) {
                    if (res.code) {
                        qq.request({
                            url: '',
                            data: {
                                code: res.code
                            },
                            success(res) {
                                console.log(`Amumu QQSDK login success res = `, JSON.stringify(res));
                                if (callback)
                                    callback();
                            }
                        });
                    } else {
                        console.log('Amumu QQSDK login fail error = ', JSON.stringify(res));
                    }
                }
            });
        }
        doPay(params) {
            qq.requestMidasPayment({
                prepayId: params.prepayId,
                starCurrency: params.starCurrency,
                setEnv: params.setEnv,
                success(res) {
                    console.log("Amumu QQSDK doPay success", JSON.stringify(res));
                },
                fail(error) {
                    console.log("Amumu QQSDK doPay fail", JSON.stringify(error));
                },
                complete(complete) {
                    console.log("Amumu QQSDK doPay complete", complete);
                }
            });
        }
    }
    QQSDK._instance = null;

    class VivoSDK extends BaseSDK {
        static getInstance() {
            if (!this._instance) {
                this._instance = new VivoSDK();
            }
            return this._instance;
        }

        init() {
            let self = this;
            qg.getSystemInfo({
                success: function (data) {
                    console.log(`Amumu vivoSDK init getSystemInfo succes,data = ${JSON.stringify(data)}`);
                }
            });
        }
        login(callback = null) {
            if (qg.getSystemInfoSync().platformVersionCode >= 1053) {
                qg.login().then((res) => {
                    console.log(`Amumu vivoSDK login res = ${JSON.stringify(res)}`);
                    if (res.data.token) {}
                }, (err) => {
                    console.log('Amumu VivoSDk login fail' + JSON.stringify(err));
                });
            } else {
                qg.authorize({
                    type: "token",
                    success: function (obj) {
                        console.log("Amumu VivoSDK login success obj", JSON.stringify(obj));
                        qg.getProfile({
                            token: obj.accessToken,
                            success: function (data) {
                                console.log("Amumu VivoSDK getProfile success data", JSON.stringify(data));
                            },
                            fail: function (code) {
                                console.log("Amumu VivoSDK getProfile fail code", JSON.stringify(code));
                            }
                        });
                    },
                    fail: function (code) {
                        console.log("Amumu VivoSDK authorize fail code", JSON.stringify(code));
                    }
                });
            }
        }
        doPay(params) {
            if (qg.getSystemInfoSync().platformVersionCode < 1056) {
                qg.showToast({
                    message: '当前版本太低，请升级大于等于1056版本!'
                });
                return;
            }
            qg.pay({
                orderInfo: JSON.stringify(params),
                success: function (ret) {
                    console.log("Amumu VivoSDK doPay success ret = ", JSON.stringify(ret));
                },
                fail: function (errmsg, errcode) {
                    console.log("Amumu VivoSDK doPay fail errmsg = ", errmsg, " errcode = ", errcode);
                },
                complete: function () {
                    console.log("Amumu VivoSDK doPay complete");
                }
            });
        }
    }
    VivoSDK._instance = null;

    class OppoSDK extends BaseSDK {

        static getInstance() {
            if (!this._instance) {
                this._instance = new OppoSDK();
            }
            return this._instance;
        }

        init() {
            qg.getSystemInfo({
                success: function (data) {
                    console.log(`Amumu OppoSDK init getSystemInfo succes,data = ${JSON.stringify(data)}`);
                }
            });
        }
        login(callback = null) {
            var self = this;

            qg.login({
                success: function (res) {
                    console.log(`Amumu OppoSDK login success data = ${JSON.stringify(res)}`);
                    var extension = JSON.stringify({
                        "token": res.data.token
                    });

                    pjsdk.sdkToken = res.data.token;

                    pjsdk.getToken(extension, function (data) {
                        console.log("Amumu OPPOSDK login getToken data = ", data);
                        pjsdk.uid = data.data.userInfo.uid;
                        pjsdk.token = data.data.userInfo.token;
                        pjsdk.hasPlatLogin = true;
                        if (callback) callback(data);
                    });
                },
                fail: function (res) {
                    console.log(`Amumu OppoSDK login fail data = `, JSON.stringify(res));
                    pjsdk.hasPlatLogin = false;
                    if (callback) pjsdk.getReg(callback);
                }
            });
        }
        doPay(params) {
            var self = this;
            if (qg.getSystemInfoSync().platformVersion < 1040) {
                qg.showToast({
                    title: '当前版本太低，请升级大于等于1040版本!'
                });
                return;
            }

            if (!pjsdk.hasPlatLogin) {
                qg.showToast({
                    title: '无法调用支付,请先登录!'
                });
                return;
            }


            pjsdk.getOrderNo(params, function (data) {
                //appId__timestamp__orderNo__paySign
                var _d = data.data.extension.split("__");
                console.log(`Amumu OppoSDK doPay _d = `, JSON.stringify(_d));

                qg.pay({
                    appId: _d[0],
                    token: pjsdk.sdkToken,
                    timestamp: _d[1],
                    orderNo: _d[2],
                    paySign: _d[3],
                    success: function (res) {
                        console.log(`Amumu OppoSDK doPay success res = `, JSON.stringify(res));
                        if (params.callback) params.callback(1);
                    },
                    fail: function (res) {
                        console.log(`Amumu OppoSDK doPay fail res = `, JSON.stringify(res));
                        if (params.callback) params.callback(-1);
                    }
                });
            });
        }
    }
    OppoSDK._instance = null;

    class MiSDK extends BaseSDK {
        static getInstance() {
            if (!this._instance) {
                this._instance = new MiSDK();
            }
            return this._instance;
        }
        init() {}
        login(callback = null) {}
        doPay(params) {}
    }
    MiSDK._instance = null;

    class TTSDK extends BaseSDK {
        constructor() {
            super(...arguments);
            this.recorder = null;
            this.videoPath = null;
        }
        static getInstance() {
            if (!this._instance) {
                this._instance = new TTSDK();
            }
            return this._instance;
        }
        init() {
            this.onGameRecorderManagerInit();
        }
        login(callback = null) {
            tt.login({
                success(res) {
                    console.log(`Amumu login调用成功 code = ${res.code} ` + `anonymousCode = ${res.anonymousCode}`);
                },
                fail(res) {
                    console.log(`Amumu login调用失败 res = `, res);
                }
            });
        }
        doPay(params) {
            tt.pay({
                orderInfo: {
                    app_id: "800000040005",
                    sign_type: "MD5",
                    out_order_no: "MicroApp7075638135",
                    merchant_id: "1300000004",
                    timestamp: "1566720681",
                    product_code: "pay",
                    payment_type: "direct",
                    total_amount: 1,
                    trade_type: "H5",
                    uid: "800000040005",
                    version: "2.0",
                    currency: "CNY",
                    subject: "microapp test",
                    body: "microapp test",
                    trade_time: "1566720681",
                    valid_time: "300",
                    notify_url: "https://tp-pay.snssdk.com/paycallback",
                    wx_url: "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx25161122572189727ea14cfd1832451500&package=2746219290",
                    wx_type: "MWEB",
                    alipay_url: "alipay_sdk=alipay-sdk-java-3.4.27.ALL&app_id=2018061460417275&biz_content=%7B%22body%22%3A%22%E6%B5%8B%E8%AF%95%E8%AE%A2%E5%8D%95%22%2C%22extend_params%22%3A%7B%7D%2C%22out_trade_no%22%3A%2211908250000028453790%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22seller_id%22%3A%222088721387102560%22%2C%22subject%22%3A%22%E6%B5%8B%E8%AF%95%E8%AE%A2%E5%8D%95%22%2C%22timeout_express%22%3A%22599m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fapi-test-pcs.snssdk.com%2Fgateway%2Fpayment%2Fcallback%2Falipay%2Fnotify%2Fpay&sign=D2A6ua51os2aIzIH907ppK7Bd9Q2Kk5h7AtKPdudP%2Be%2BNTtAkp0Lfojtgl4BMOIQ3Z7cWyYMx6nk4qbntSx7aZnBhWAcImLbVVr1cmaYAedmrmJG%2B3f8G5TfAZu53ESzUgk02%2FhU1XV0iXRyE8TdEJ97ufmxwsUEc7K0EvwEFDIBCJg73meQtyCRFgCqYRWvmxetQgL7pwfKXpFXjAYsvFrRBas2YGYt689XpBS321g%2BZ8SZ0JOtLPWqhROzEs3dnAtWBW15y3NzRiSNi5rPzah4cWd4SgT0LZHmNf3eDQEHEcPmofoWfnA4ao75JmP95aLUxerMumzo9OwqhiYOUw%3D%3D&sign_type=RSA2&timestamp=2019-08-25+16%3A11%3A22&version=1.0",
                    sign: "15aa99cd80878661a4d442b7540bdf96",
                    risk_info: '{"ip":"127.0.0.1"}',
                },
                service: 1,
                payChannel: {
                    default_pay_channel: "alipay",
                },
                getOrderStatus(res) {
                    return new Promise(function (resolve, reject) {
                        tt.request({
                            url: "<your-backend-url>",
                            success(res) {
                                resolve({
                                    code: 0 | 1 | 2 | 3 | 9
                                });
                            },
                            fail(err) {
                                reject(err);
                            },
                        });
                    });
                },
                success(res) {
                    if (res.code == 0) {}
                },
                fail(res) {},
            });
        }
        onGameRecorderManagerInit() {
            var self = this;
            this.recorder = tt.getGameRecorderManager();

            console.log(`Amumu TTSDK onGameRecorderManagerInit recorder = `, this.recorder);

            this.recorder.onStart((res) => {
                console.log(`Amumu TTSDK recorder onStart`, res);
            });
            this.recorder.onPause(function (res) {
                console.log(`Amumu TTSDK recorder onPause`, res);
            });
            this.recorder.onResume(function (res) {
                console.log(`Amumu TTSDK recorder onResume`, res);
            });
            this.recorder.onStop((res) => {
                console.log(`Amumu TTSDK recorder onStop`, res);
                self.recorder.clipVideo({
                    path: res.videoPath,
                    timeRange: [10, 0],
                    success(res) {
                        console.log(`Amumu TTSDK recorder onStop success`, res.videoPath);
                        self.videoPath = res.videoPath;
                    },
                    fail(e) {
                        console.log(`Amumu TTSDK recorder onStop fail`, e);
                    }
                });

            });
            this.recorder.onError(function (error) {
                console.log(`Amumu TTSDK recorder onError`, error);
            });
        }
        onGameRecorderStart(callback = null) {
            this.recorder.start();
            if (callback) callback();
        }
        onGameRecorderStop(callback = null) {
            this.recorder.stop();
            if (callback) callback();
        }
        shareToFriend() {
            var self = this;
            tt.shareAppMessage({
                channel: "video",
                title: "",
                desc: "",
                imageUrl: "",
                templateId: "",
                query: "",
                extra: {
                    videoPath: self.videoPath,
                    videoTopics: [""],
                    hashtag_list: [""],
                    video_title: "",
                },
                success() {
                    console.log("Amumu TTSDK shareVideoToFriend success");
                },
                fail(e) {
                    console.log("Amumu TTSDK shareVideoToFriend fail error", e);
                },
            });
        }
    }
    TTSDK._instance = null;

    class ALI_YKSDK extends BaseSDK {
        static getInstance() {
            if (!this._instance) {
                this._instance = new ALI_YKSDK();
            }
            return this._instance;
        }
        init() {
            my.getSystemInfo({
                success: function (res) {
                    console.log('Amumu ALI_YKSDK my.getSystemInfo success res =' + JSON.stringify(res));
                },
                fail: function (res) {
                    console.log('Amumu ALI_YKSDK my.getSystemInfo fail res =' + JSON.stringify(res));
                },
                complete: function (complete) {
                    console.log('Amumu ALI_YKSDK my.getSystemInfo complete =' + JSON.stringify(complete));
                }
            });
        }
        login(callback = null) {
            my.getAuthCode({
                scopes: 'auth_base', // 主动授权：auth_user，静默授权：auth_base。或者其它scope
                success: (res) => {
                    console.log('Amumu ALI_YKSDK login res =' + JSON.stringify(res));
                    if (res.authCode) {
                        var sdkToken = JSON.stringify({
                            "auth_code": res.authCode
                        });
                        // 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
                        yhsdk.getToken(sdkToken, function (data) {
                            console.log('Amumu ALI_YKSDK getToken data =' + JSON.stringify(data));
                            pjsdk.token = data.token;
                            pjsdk.uid = data.userID;
                            if (callback) callback(data);
                        });
                    }
                },
                fail: (fail) => {
                    console.error('Amumu ALI_YKSDK login fail fail=' + JSON.stringify(fail));
                    my.alert({
                        content: "登录失败!",
                    });
                }
            });
        }


        doPay(params) {
            pjsdk.getOrderNo(params, function (data) {
                var _d = data.data.extension.splice("_");
                console.error('Amumu ALI_YKSDK doPay _d =' + JSON.stringify(_d));
                my.tradePay({
                    tradeNO: _d[0],
                    success: function (res) {
                        console.error('Amumu ALI_YKSDK doPay success res=' + JSON.stringify(res));
                        my.alert({
                            content: JSON.stringify(res),
                        });
                    },
                    fail: function (res) {
                        console.error('Amumu ALI_YKSDK doPay fail res=' + JSON.stringify(res));
                        my.alert({
                            content: JSON.stringify(res),
                        });
                    }
                });
            });
        }
    }
    ALI_YKSDK._instance = null;

    class WebSDK extends BaseSDK {
        static getInstance() {
            if (!this._instance) {
                this._instance = new WebSDK();
            }
            return this._instance;
        }
        init() {
            console.log('Amumu WebSDK init');
        }
        login(callback = null) {
            console.log('Amumu WebSDK login success');

            pjsdk.getReg(function () {
                if (callback) callback();
            });
        }
        doPay(params) {
            console.log('Amumu WebSDK doPay success params = ', params);

            pjsdk.getOrderNo(params, function (data) {
                //appId__timestamp__orderNo__paySign
                var _d = data.data.extension.split("__");
                console.log(`Amumu WebSDK doPay _d = `, _d);
            });
        }
        onGameRecorderManagerInit() {
            console.log(`Amumu WebSDK onGameRecorderManagerInit`);
        }
        onGameRecorderStart(callback = null) {
            console.log(`Amumu WebSDK onGameRecorderStart`);
            if (callback) callback();
        }
        onGameRecorderStop(callback = null) {
            console.log(`Amumu WebSDK onGameRecorderStop`);
            if (callback) callback();
        }
        shareToFriend() {
            console.log(`Amumu WebSDK  shareToFriend`);
        }
    }
    WebSDK._instance = null;

    class PLATSDK {
        static getSDK() {
            switch (Laya.Browser.window.pjsdk.platType) {
                case "web":
                    let webSDK = WebSDK.getInstance();
                    return webSDK;
                case "wx":
                    let wxSDK = WXSDK.getInstance();
                    return wxSDK;
                case "qq":
                    let qqSDK = QQSDK.getInstance();
                    return qqSDK;
                case "vivo":
                    let vivoSDK = VivoSDK.getInstance();
                    return vivoSDK;
                case "oppo":
                    let oppoSDK = OppoSDK.getInstance();
                    return oppoSDK;
                case "mi":
                    let miSDK = MiSDK.getInstance();
                    return miSDK;
                case "tt":
                    let ttSDK = TTSDK.getInstance();
                    return ttSDK;
                case "ali_yk":
                    let aLi_YKSDK = ALI_YKSDK.getInstance();
                    return aLi_YKSDK;
                default:
                    break;
            }
        }
    }



    //注册
    pjsdk.getReg = function (callback) {
        if (CommonUtils.hasUUID()) {
            pjsdk.getLogin(CommonUtils.getUUID(), CommonUtils.getPassword(), callback);
            return;
        }

        var params = {};
        params["channelGameId"] = pjsdk.initData.channelGameId;
        params["udid"] = CommonUtils.getUdid();
        params["a"] = "n";
        params["sdkVersion"] = pjsdk.version;
        params["channel"] = pjsdk.initData.channel;
        params["platformId"] = pjsdk.platformId;
        params["userName"] = CommonUtils.getUUID();
        params["password"] = CommonUtils.getPassword();

        var url = CommonUtils.buildURL(pjsdk.hostUrl + "/api/reg", params);
        console.log("Amumu getReg  url = ", url);
        HttpUtils.httpUtilGet(url, function (retData) {
            var jsonObj = new Object();
            jsonObj = JSON.parse(retData);
            console.log("Amumu getReg  jsonObj", jsonObj);
            if (jsonObj.code == 1) {
                pjsdk.getLogin(CommonUtils.getUUID(), CommonUtils.getPassword(), callback);
            }
        });
    }

    //登录
    pjsdk.getLogin = function (userName, password, callback = null) {
        var params = {};
        params["userName"] = userName;
        params["password"] = password;
        params["udid"] = CommonUtils.getUdid();
        params["channelGameId"] = pjsdk.initData.channelGameId;
        params["gameId"] = pjsdk.gameId;
        params["platformId"] = pjsdk.platformId;
        params["channel"] = pjsdk.initData.channelGameId;

        var url = CommonUtils.buildURL(pjsdk.hostUrl + "/api/login", params);
        console.log("Amumu getLogin url", url);
        HttpUtils.httpUtilGet(url, function (retData) {
            var jsonObj = new Object();
            jsonObj = JSON.parse(retData);
            console.log("Amumu getLogin jsonObj", jsonObj);
            if (jsonObj.code == 1) {
                //获取登录用户的token和uid
                pjsdk.token = jsonObj.data.token;
                pjsdk.uid = jsonObj.data.uid;

                if (callback) callback();
            }
        });
    }

    //验证渠道token
    pjsdk.getToken = function (sdkToken, callback) {
        var params = {};
        params["sdkToken"] = sdkToken;
        params["sdkVersion"] = pjsdk.version;
        params["udid"] = CommonUtils.getUdid();
        params["channel"] = pjsdk.initData.channel;
        params["channelGameId"] = pjsdk.initData.channelGameId;
        params["appVersion"] = pjsdk.initData.appVersion;

        var url = CommonUtils.buildURL(pjsdk.hostUrl + "/api/getToken", params);
        url = encodeURI(url);
        console.log("Amumu pjsdk getToken url = ", url);
        HttpUtils.httpUtilPost(url, null, function (data) {
            // console.log("Amumu PJSDK getToken data = ", data);
            var jsonObj = new Object();
            jsonObj = JSON.parse(data);
            if (jsonObj.code == 1) {
                if (callback)
                    callback(jsonObj);
            }
        });
    };

    pjsdk.getOrderNo = function (params, callback = null) {
        params["channelGameId"] = pjsdk.initData.channelGameId;
        params["appVersion"] = pjsdk.initData.appVersion;
        params["channel"] = pjsdk.initData.channel;
        params["sdkVersion"] = pjsdk.version;
        params["uid"] = pjsdk.uid;
        params["sdkUserId"] = pjsdk.sdkToken;

        var url = CommonUtils.buildURL(pjsdk.hostUrl + "/api/getOrderNo", params);
        url = encodeURI(url);
        console.log("Amumu pjsdk getOrderNo url = ", url);
        HttpUtils.httpUtilPost(url, null, function (data) {
            // console.log("Amumu PJSDK getOrderNo data = ", data);
            console.log("Amumu PJSDK getOrderNo 01");
            var jsonObj = new Object();
            jsonObj = JSON.parse(data);
            if (jsonObj.code == 1) {
                if (callback)
                    callback(jsonObj);
            } else {
                if (params.callback) params.callback(-1);
            }
        });
    }

    pjsdk.getGameInfo = function (callback) {
        var params = {};
        params["channelGameId"] = pjsdk.initData.channelGameId;
        params["channel"] = pjsdk.initData.channel;
        params["udid"] = CommonUtils.getUdid();
        params["isLogin"] = true;

        var url = CommonUtils.buildURL(pjsdk.hostUrl + "/api/getGameInfo", params);
        url = encodeURI(url);
        console.log("Amumu getGameInfo url = ", url);
        HttpUtils.httpUtilPost(url, null, function (data) {
            //  console.log("Amumu PJSDK getGameInfo data", data);
            if (callback) callback(data);
            var jsonObj = new Object();
            jsonObj = JSON.parse(data);
            pjsdk.gameId = jsonObj.data.gameId;
        });
    };

    pjsdk.reportRoleInfoReq = function (params) {
        params["channelGameId"] = pjsdk.initData.channelGameId;
        params["channel"] = pjsdk.initData.channel;

        var url = CommonUtils.buildURL(pjsdk.hostUrl + "/api/reportRoleInfo", params);
        url = encodeURI(url);
        console.log("Amumu reportRoleInfoReq url = ", url);
        HttpUtils.httpUtilPost(url, null, function (data) {
            // console.log("Amumu PJSDK reportRoleInfoReq data = ", data);

            var jsonObj = new Object();
            jsonObj = JSON.parse(data);
            if (jsonObj.code == 1) {
                var callParams = {};
                callParams["code"] = jsonObj.code;
                callParams["msg"] = jsonObj.msg;
                pjsdk.sendMsg(EventDef.RRI_CALLBACK, callParams);

                if (params.callback) params.callback();
            }
        });
    };

    pjsdk.init = function (channelGameId, channel, appVersion, callback = null) {
        pjsdk.initData["channelGameId"] = channelGameId;
        pjsdk.initData["channel"] = channel;
        pjsdk.initData["appVersion"] = appVersion;

        // PLATSDK.getSDK().init();
        pjsdk.sendMsg(EventDef.INIT, null);
        pjsdk.getGameInfo(callback);
    }

    pjsdk.initSDK = function (params) {
        pjsdk.uid = params["uid"];
        pjsdk.sdkToken = params["sdkToken"];
    }

    pjsdk.sendMsg = function (method, params) {
        EventHandleMgr.Instance.dispatchEventWith(method, params);
    }

    pjsdk.shareToFriend = function (params) {
        pjsdk.sendMsg(EventDef.SHARE, params);
        //PLATSDK.getSDK().shareToFriend();
    }

    pjsdk.recorderStart = function (callback = null) {
        var params = {};
        params["callback"] = callback;
        pjsdk.sendMsg(EventDef.RECORDER_START, params);
        //PLATSDK.getSDK().recorderStart(callback);
    }

    pjsdk.recorderStop = function (callback = null) {
        var params = {};
        params["callback"] = callback;
        pjsdk.sendMsg(EventDef.RECORDER_STOP, params);
        //PLATSDK.getSDK().recorderStart(callback);
    }

    pjsdk.loadPayBox = function (params, callback = null) {
        params["callback"] = callback;
        pjsdk.sendMsg(EventDef.LOAD_PAYBOX, params);
        //PLATSDK.getSDK().doPay(params);
    }

    pjsdk.login = function (callback = null) {
        var params = {};
        params["callback"] = callback;
        pjsdk.sendMsg(EventDef.LOGIN, params);
        // PLATSDK.getSDK().login(callback);
    }

    pjsdk.logout = function (params) {
        pjsdk.sendMsg(EventDef.LOGOUT, params);
    }

    pjsdk.reportRoleInfo = function (params, callback = null) {
        params["uid"] = pjsdk.uid;
        params["token"] = pjsdk.sdkToken;
        params["callback"] = callback;
        pjsdk.sendMsg(EventDef.REPORT_ROLE_INFO, params);
        //window.pjsdk.reportRoleInfoReq(params);
    }

    pjsdk.startEventListener = function () {
        EventHandleMgr.Instance.init();
    }

    pjsdk.hostUrl = "https://h5.paojiao.cn";
    pjsdk.version = "1.0.0";
    pjsdk.gameId = 1;
    pjsdk.platformId = 4;
    pjsdk.channelId = -1;
    pjsdk.hasPlatLogin = false;
    pjsdk.platformType = "h5";
    pjsdk.platType = "oppo";
    pjsdk.uid = "123";
    pjsdk.sdkToken = "123";
    pjsdk.token = "123";
    pjsdk.initData = {
        channelGameId: "",
        channel: "",
        appVersion: "1.0.0"
    };
})(pjsdk || (pjsdk = {}));