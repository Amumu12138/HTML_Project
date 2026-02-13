//泡椒h5sdk-服务器端
var sdk_pay = window.PJ_PAY_COMMON || {};

sdk_pay.loadPayBox = function () {

    <!--支付（原价）-->
    var loginHtml = ' <div class="div1">';
    loginHtml += '   <div class="title_id_card">';
    loginHtml += '   支付';
    loginHtml += '   <div class="close"><img src="/sdk2/img/close.png"></div>';
    loginHtml += '   </div>';
    loginHtml += '   <div class="height40"></div>';
    loginHtml += '    </div>';
    loginHtml += ' <div class="list_fff">';
    loginHtml += ' <ul><li class="left">充值6元</li>';
    loginHtml += ' <li class="right">';
    loginHtml += ' ￥6<formatNumber type="number" value="6" pattern="0.00" maxFractionDigits="0"/>';
    loginHtml += ' </li>';
    loginHtml += ' </ul>';
    loginHtml += ' <ul>';
    loginHtml += ' <li class="left">优惠券</li>';
    loginHtml += ' <li class="right goto" id="selectVoucher" data-canUseSize="1">';
    loginHtml += ' <span id="deductMoney"></span>';
    loginHtml += '<strong>1张可用</strong>';
    loginHtml += '  <img src="/sdk2/img/right_ico.png">';
    loginHtml += ' </li>';
    loginHtml += ' </ul>';
    loginHtml += ' </div>';

    /* var loginHtml = '<div id="loginBox" class="mask login-box">';
     loginHtml += '<div class="r5">';
     //<img style="width: 220px;height:40px;" src="/images/titleIcon.png" />&nbsp;
     loginHtml += '<div class="login-head"></div>';
     loginHtml += '<div class="login-body">';
     loginHtml += '<div>';
     loginHtml += '<div style="color:#03044b;" id="userBox" class="flex"><i style="background: #a4def09c;" class="icod-user"></i><input class="flex-list" id="userName" type="text" value="" placeholder="请输入账号"></div>';
     loginHtml += '<div style="color:#03044b;" id="pwdBox" class="flex"><i style="background: #a4def09c;" class="icod-lock"></i><input class="flex-list" id="password" type="password" value="" placeholder="请填写密码"></div>';
     loginHtml += '</div>';
     loginHtml += '<a href="javascript:;" style="background:#55d7ecd9;width:50%;" class="btn" onclick="sdk.reg1()">一键注册</a><a href="javascript:;" style="width:50%;background:#184979" class="btn" onclick="sdk.login()">登录</a>';

     loginHtml += '<div id="loginOption"   class="flex flex-x-between">';
     loginHtml += '<a href="javascript:;" onclick="sdk.showRegBoxToIp()" style="color:#999;">账号密码注册<a>';
     loginHtml += '</div>';

     loginHtml += '</div>';
     loginHtml += '<div class="login-mode">';
     loginHtml += '<ol class="flex active">';

     loginHtml += '</ol>';
     loginHtml += '</div>';
     loginHtml += '</div>';
     loginHtml += '</div>';*/

    $("body").append(loginHtml);

}


window.PJ_PAY_COMMON = sdk_pay;