window.DSSDK = (function (w, d) {
    var PARTNER_SDK = h5Sdk();
    var ua = navigator.userAgent;

    var PARTNER_CALLS = [];
    w.DKMGetParameter = function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return decodeURIComponent(r[2]);
        }else{
            return '';
        }
    };

    w.DKM_LOADING_SCRIPT = {};
    w.DKM_SCRIPT_LOAD_CALLBACKS = {};
    w.DKM_GAME_INFO = {};


    function run(method, data, callback) {
        (method in PARTNER_SDK) && PARTNER_SDK[method](data, callback);
    }


    var dsSdk = {
        //璋冪敤鐧诲綍锛忔敞鍐岀晫闈�
        login: function (callback) {
            run('login', '', callback);
        },

        //鐢ㄦ埛鐧诲嚭
        logout: function(callback){
            run('logout', '', callback);
        },

        //鏀粯
        pay: function(data, callback){
            //console.log("cp鍙戣捣鏀粯璇锋眰");
            //console.log(data);
            run('pay', data, callback);
        },

        //鎵撳紑瀹㈡湇绐楀彛
        openCsCenter: function () {
            run('openCsCenter');
        },


        //瑙掕壊鍒涘缓LOG
        logCreateRole: function (serverId, serverName, roleId, roleName, roleLevel) {
            var data = {
                server_id: serverId,
                server_name: serverName,
                role_id: roleId,
                role_name: roleName,
                role_lev: roleLevel
            };
            run('logCreateRole', data);
        },

        //杩涘叆娓告垙LOG
        logEnterGame: function (serverId, serverName, roleId, roleName, roleLevel) {
            var data = {
                server_id: serverId,
                server_name: serverName,
                role_id: roleId,
                role_name: roleName,
                role_lev: roleLevel
            };

            run('logEnterGame', data);
        },

        //瑙掕壊鍗囩骇LOG
        logRoleUpLevel: function (serverId, serverName, roleId, roleName, roleLevel) {
            var data = {
                server_id: serverId,
                server_name: serverName,
                role_id: roleId,
                role_name: roleName,
                role_lev: roleLevel
            };
            run('logRoleUpLevel', data);
        },

        //澶勭悊閫€鍑轰簨浠�
        onLogout: function(callback){
            run('onLogout', '', callback);
        },

        getSdkPartnerId: function () {
            return run('getSdkPartnerId');
        },
        logLoadingFinish:function(callback){
            run('logLoadingFinish','',callback);
        },
        openIdCheck:function(){
            run('openIdCheck');
        },
        verify:function(){
            run('verify');
        },
        inputLeave:function () {
            run('inputLeave');
        },
        bindPhone :function (callback) {
            run('bindPhone', '', callback);
        },
        realName : function (callback) {
            run('realName', '', callback);
        },
        share : function(data,callback){
            run('share',data,callback);
        },
        follow : function (data,callback) {
            run('follow',data,callback);
        }

    };


    //瀹樻柟鐨凥5
    function h5Sdk() {
        var callbacks = {};
        window.addEventListener("message", function (event) {
            //console.log('鏀跺埌鏁版嵁锛�');
            //console.log(event.data);

            //alert('鏀跺埌鏁版嵁锛�' + JSON.stringify(event));
            var action = event && event.data && event.data.action ? event.data.action : false;
            var result = event && event.data && event.data.data ? event.data.data : {};

            if(!action){
                return false;
            }
            switch(action){
                case 'login':
                    if(result.state){
                        callbacks['login'] && callbacks['login'](0, result.data);
                    }else{
                        callbacks['login'] && callbacks['login'](1);
                    }
                    break;
                case 'logout':
                    // if(result.state){
                    //     callbacks['logout'] && callbacks['logout'](0);
                    // }else{
                    //     callbacks['logout'] && callbacks['logout'](1);
                    // }
                    callbacks['logout'] && callbacks['logout'](result);
                    break;
                case 'pay':
                    // if(result.state){
                    //     callbacks['pay'] && callbacks['pay'](0, result.data);
                    // }else{
                    //     callbacks['pay'] && callbacks['pay'](1);
                    // }
                    callbacks['pay'] && callbacks['pay'](result);
                    break;
                case 'on_logout':
                    callbacks['on_logout'] && callbacks['on_logout']();
                    break;
                case 'createRole':
                    callbacks['logCreateRole'] && callbacks['logCreateRole'](0,result);
                    break;
                case 'enter':
                    callbacks['logEnterGame'] && callbacks['logEnterGame'](0,result);
                    break;
                case 'loadingFinish':
                    callbacks['logLoadingFinish'] && callbacks['logLoadingFinish'](0,result);
                    break;
                case 'openIdCheck' :
                    callbacks['openIdCheck'] && callbacks['openIdCheck'](0);
                    break;
                case 'verify' :
                    callbacks['verify'] && callbacks['verify'](0);
                    break;
                case 'inputLeave':
                    callbacks['inputLeave'] && callbacks['inputLeave']();
                    break;
                case 'realName':
                    callbacks['realName'] && callbacks['realName'](result);
                    break;
                case 'bindPhone':
                    callbacks['bindPhone'] && callbacks['bindPhone'](result);
                    break;
                case 'share':
                    if(result != '1'){
                        result = 0;
                    }
                    callbacks['share'] && callbacks['share'](result);
                    break;
                case 'follow':
                    if(result != '1'){
                        result = 0;
                    }
                    callbacks['follow'] && callbacks['follow'](result);
                    break;
            }
        }, false);
        return {
            //璋冪敤鐧诲綍锛忔敞鍐岀晫闈�
            login: function (data, callback) {
                var h5_uid = DKMGetParameter('h5_uid');
                var h5_token = DKMGetParameter('h5_token');
                var h5_token_timeout = DKMGetParameter('h5_token_timeout');

                var is_token_timeout = false;
                if(h5_token_timeout && (new Date()).getTime() >=  h5_token_timeout * 1000){
                    is_token_timeout = true;
                }

                if(h5_uid && h5_token && !is_token_timeout){//SDK鍏堢櫥褰�
                    callback({data:{user_id: h5_uid, account: h5_uid, token: h5_token}, code: 0, message: ''});
                }else{
                    callbacks['login'] = typeof callback == 'function' ? callback : null;
                    this.postTopMessage('login');
                }
            },

            //鐢ㄦ埛鐧诲嚭
            logout: function(data, callback){
                callbacks['logout'] = typeof callback == 'function' ? callback : null;
                this.postTopMessage('logout');
            },

            //鏀粯
            pay: function(data, callback){
                callbacks['pay'] = typeof callback == 'function' ? callback : null;
                this.postTopMessage('pay', data);
            },


            //瑙掕壊鍒涘缓LOG
            logCreateRole: function (data) {
                this.postTopMessage('createRole', data);
            },

            //杩涘叆娓告垙LOG
            logEnterGame: function (data) {
                this.postTopMessage('enter', data);
            },

            //瑙掕壊鍗囩骇LOG
            logRoleUpLevel: function (data) {
                this.postTopMessage('levelup', data);
            },
            //棣栨鐧诲綍鎴愬姛鍒板垱瑙掗〉闈�
            logLoadingFinish:function(data){
                this.postTopMessage('loadingFinish',data);
            },
            //棣栨鐧诲綍鎴愬姛鍒板垱瑙掗〉闈�
            openIdCheck:function(data){
                this.postTopMessage('openIdCheck',data);
            },
            verify:function (data) {
                this.postTopMessage('verify',data);
            },
            //澶勭悊閫€鍑轰簨浠�
            onLogout: function(data, callback){
                callbacks['on_logout'] = typeof callback == 'function' ? callback : null;
            },

            getSdkPartnerId: function () {
                return DKMGetParameter('dkm_partner_id') || DKMGetParameter('pf');
            },

            share: function (data,callback) {
                callbacks['share'] = typeof callback == 'function' ? callback : null;
                this.postTopMessage('share', data);
            },

            follow: function (data,callback) {
                callbacks['follow'] = typeof callback == 'function' ? callback : null;
                this.postTopMessage('follow', data);
            },
            download: function (data) {
                this.postTopMessage('download', data);
            },
            inputLeave : function (data) {
                this.postTopMessage('inputLeave',data);
            },
            realName : function (data, callback) {
                callbacks['realName'] = typeof callback == 'function' ? callback : null;
                this.postTopMessage('realName',data);
            },
            bindPhone : function (data,callback) {
                callbacks['bindPhone'] = typeof callback == 'function' ? callback : null;
                this.postTopMessage('bindPhone',data);
            },
            postTopMessage: function(action, args) {
                args = args || {};
                var data = {action: action, data: args};
                //console.log('鍙戦€佹暟鎹細');
                //console.log(data);
                //alert(JSON.stringify(data));
                //log(JSON.stringify(data));
                parent.postMessage(data, '*');
            }
        };
    }

    return dsSdk;
})(window, document);