$(function () {

    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    function isSafari() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
            ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
            ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
            return true;
        } else {
            return false;
        }
    }


    function fmtMoney(x) {
        var val = Number(x)
        if(!isNaN(parseFloat(val))) {
            val = val.toFixed(2);
        }
        return val;
    }

    function showGoldPay(allDeductMoney,actualPrice){
        //底部左侧提示
        $("#leftTopTxt").html("0.00");
        $("#leftBotTxt").html("已节省"+fmtMoney(allDeductMoney)+"元");
        //底部右侧提示
        //消耗游币，向上取整
        $("#rightTxt").html("将消耗"+Math.ceil(actualPrice*10)+"游币");
    }

    function showOtherPay(allDeductMoney,actualPrice){
        //底部左侧提示
        $("#leftTopTxt").html(""+fmtMoney(actualPrice));
        $("#leftBotTxt").html("已节省"+fmtMoney(allDeductMoney)+"元");
        //底部右侧提示
        $("#rightTxt").html("支付后可得"+parseInt(actualPrice)+"积分");
    }


    //代金券选择完成处理
    function selectVoucher() {

        let deductMoney = $('.coupon_li.active:last').attr("data-deductMoney");
        let voucherId = $('.coupon_li.active:last').attr("data-voucherId");
        let payType = $("#payType").val();
        let userGold = parseInt($("#userGold").val());
        let discountPrice = $("#discountPrice").val();
        let orderPirce = $("#orderPirce").val();//订单金额
        console.log("订单金额:" + orderPirce);
        console.log("代金券金额:" + deductMoney);
        console.log("CID折扣金额:" + discountPrice);
        console.log("支付方式:" + payType);
        console.log("用户游币数量:" + userGold);


        if (deductMoney != undefined) {//选中了代金券
            //更新优惠券金额
            $("#deductMoney").html("￥ -" + deductMoney);
            $("#canUseSizeSpan").hide();

            $("#voucherId").val(voucherId);
            $("#voucherPrice").val(deductMoney);

            //更新实际支付金额
            let allDeductMoney = parseFloat(deductMoney) + parseFloat(discountPrice);
            console.log("总优惠金额:" + fmtMoney(allDeductMoney));

            let actualPrice = parseFloat(orderPirce)  - allDeductMoney;
            if (actualPrice < 0) {
                actualPrice = 0;
            }
            console.log("实际支付金额:" + actualPrice);


            if (payType == 3) {//钱包支付
                let actualPayGold = Math.ceil(actualPrice * 10);
                //判断用户游币数量
                if (userGold < actualPayGold) {
                    console.log("游币不足3");
                    return;
                }

                console.log("实际支付游币:" + actualPayGold);
                //显示游币支付文字
                showGoldPay(allDeductMoney,actualPrice);

            } else {
                //显示其他支付
                showOtherPay(allDeductMoney,actualPrice);
            }
        } else {
            $("#deductMoney").html("");
            $("#canUseSizeSpan").show();
            $("#voucherId").val("");
            $("#voucherPrice").val(0);

            //更新实际支付金额
            let allDeductMoney = parseFloat(discountPrice);
            console.log("总优惠金额:" + fmtMoney(allDeductMoney));

            let actualPrice = parseFloat(orderPirce)  - allDeductMoney;
            if (actualPrice < 0) {
                actualPrice = 0;
            }
            console.log("实际支付金额:" + actualPrice);


            if (payType == 3) {//钱包支付
                let actualPayGold = Math.ceil(actualPrice * 10);
                console.log("实际支付游币:" + actualPayGold);
                //显示游币支付文字
                showGoldPay(allDeductMoney,actualPrice);
            } else {
                //显示其他支付
                showOtherPay(allDeductMoney,actualPrice);
            }

        }
    }

    //选择支付方式
    $('.pay_li ul').on('click', function () {
        let payConfigId = $(this).find(".payType").attr("data-payConfigId");
        let payType =$(this).find(".payType").attr("data-payType");
        if (payType == undefined || payConfigId == undefined) {
            return;
        }
        let orderPirce = parseInt($("#orderPirce").val());//订单金额
        let voucherPrice = parseInt($("#voucherPrice").val());//优惠券金额
        let userGold = parseInt($("#userGold").val());
        let discountPrice = parseFloat($("#discountPrice").val());

        console.log("订单金额:" + orderPirce);
        console.log("代金券金额:" + voucherPrice);
        console.log("CID折扣金额:" + discountPrice);
        console.log("支付方式:" + payType);
        console.log("用户游币数量:" + userGold);

        //更新实际支付金额
        let allDeductMoney = parseFloat(voucherPrice) + parseFloat(discountPrice);
        console.log("总优惠金额:" + fmtMoney(allDeductMoney));

        let actualPrice = parseFloat(orderPirce)  - allDeductMoney;
        if (actualPrice < 0) {
            actualPrice = 0;
        }
        console.log("实际支付金额:" + actualPrice);

        if (payType == 3) {
            let actualPayGold = Math.ceil(actualPrice * 10);
            //判断用户游币数量
            if (userGold < actualPayGold) {
                console.log("选择支付方式-游币不足");
                return;
            }
            console.log("实际支付游币:" + actualPayGold);
            //显示游币支付文字
            showGoldPay(allDeductMoney,actualPrice);
        } else {
            //显示其他支付文字
            showOtherPay(allDeductMoney,actualPrice);
        }

        $('.pay_li ul').removeClass("active");
        $(this).addClass("active");
        $("#payType").val(payType);
        $("#payConfigId").val(payConfigId);

    });


    $('.out').on('click', function () {
        /*  //微信浏览器和Safari浏览器内放弃支付，直接跳转返回游戏链接
          if (isWeiXin() || isSafari()) {
              let returnUrl = $("#returnUrl").val();
              if (returnUrl != null && returnUrl != '' ) {
                  top.location.href = returnUrl;
              }
          }else{
              backGame();
          }*/
        $("#isLoadShow").css("display", "none");
    });

    //关闭支付页面
    $('.close').on('click', function () {
        $(".div3").show();
        $(".notSelect").addClass("active");
        $(".div1,.div2").hide();
    });

    function closePayView(){
        //关闭支付框页面
        $("#isLoadShow").css("display", "none");
    }

    //显示代金券页面
    $('.goto').on('click', function () {
        let canUseSize = $(this).attr("data-canUseSize");
        if (canUseSize == 0) {
            return;
        }
        $(".div2").show();//显示代金券页面
        $(".div1").hide();//关闭支付页面
    });

    //选择代金券
    $('.coupon_li').on('click', function () {
        //不可用代金券,无法选中
        if ($(this).attr("data-canUse") == "false") {
            return;
        }
        //放弃支付代金券，不能取消选中
        if ($(this).attr("data-isMaxDeductVoucher") == "1") {
            return;
        }

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $('.coupon_li').removeClass("active");
            $(this).addClass("active");
        }
    });

    //选择代金券页面，返回
    $('.back1').on('click', function () {
        $(".div2").hide();//关闭代金券页面
        $(".div1").show();//显示支付页面
    });

    //继续支付
    $('.goto_pay').on('click', function () {
        $(".div1").show();
        $(".div3,.div2").hide();
        selectVoucher();
    });

    //代金券选择完成
    $('.red_button').on('click', function () {
        $(".div2").hide();//关闭代金券页面
        $(".div1").show();//显示支付页面
        selectVoucher();
    });
    //关闭支付二维码
    $("#closePayCode-btn").click(function () {
        $("#loadPayCode").css("display", "none");
    });

    $("#payBtn").click(function () {
        console.log("立即付款");
        let payConfigId = $("#payConfigId").val();
        if (payConfigId == "" || payConfigId == undefined) {
            open_box("请选择支付方式！");
            return;
        }

        let payType = $("#payType").val();
        if (payType == 3) {//游币支付,判断游币金额
            let orderPirce = parseInt($("#orderPirce").val());//订单金额
            let voucherPrice = parseInt($("#voucherPrice").val());//优惠券金额
            let discountPrice = parseFloat($("#discountPrice").val());//cid折扣金额
            let userGold = parseInt($("#userGold").val());
            let actualPrice = orderPirce - voucherPrice;
            if (actualPrice < 0) {
                actualPrice = 0;
            }
            //判断用户游币数量
            if (userGold < (actualPrice * 10)) {
                console.log("游币不足2");
                open_box("游币不足，请先充值再进行支付");
                showGoldPay(actualPrice);
                return;
            }
        }

        var payParams = {};
        payParams["orderPirce"] = $("#orderPirce").val();//商品金额
        payParams["voucherPrice"] = $("#voucherPrice").val();//优惠券金额
        payParams["voucherId"] = $("#voucherId").val(); //优惠券ID
        payParams["payType"] = payType; //支付类型1.支付宝 2.微信 3.钱包
        payParams["payConfigId"] = payConfigId;//支付方式id,支付回调的时候使用
        payParams["puid"] = $("#puid").val();//公共平台ID
        payParams["uid"] = $("#uid").val();//业务平台ID
        payParams["orderNumber"] = $("#orderNumber").val();//H5订单
        payParams["userGold"] = $("#userGold").val();//用户游币数量
        payParams["returnUrl"] = $("#returnUrl").val();//回调地址
        payParams["wxOpenId"] = $("#wxOpenId").val();//微信openid
        payParams["cidDiscountMoney"] = $("#discountPrice").val();//cid折扣金额
        console.info(payParams);
        $.ajax({
            type: "POST",
            data: payParams,
            async: false,
            //url: "http://172.27.35.1:8096/pay/getPayUrl",
            //url: "http://10.11.181.200:8080/pay/getPayUrl",
            url: "https://h5.paojiao.cn/pay/getPayUrl",
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    console.info("跳转支付:" + data);
                    //关闭支付框页面
                    $("#isLoadShow").css("display", "none");
                    //获取支付方式
                    let payType = $('#payType').val();//1:支付宝 2:微信 3：钱包
                    if (payType == 1) {//支付宝
                        if (data.data.indexOf("data:image") > -1) {//扫码支付
                            $("#loadPayCode").css("display", "block");
                            $("#loadPayCode").css("z-index", "3");
                            $("#payCodeImg").attr("src", data.data);
                            $("#markedWords span").css("color", "#2DD5FF");
                            $("#closePayCode button").css("background-color", "#2DD5FF");
                            return;
                        }
                        window.location.href = data.data;
                    } else if (payType == 2) {
                        if (isWeiXin()) {//微信浏览器使用公众号支付
                            let payObj = eval("(" + data.data + ")");
                            callWxPay(payObj);
                        } else if (data.data.indexOf("data:image") > -1) {//扫码支付
                            $("#loadPayCode").css("display", "block");
                            $("#markedWords span").css("color", "#0cad41");
                            $("#closePayCode button").css("background-color", "#0cad41");
                            $("#loadPayCode").css("z-index", "3");
                            $("#payCodeImg").attr("src", data.data);
                            return;
                        } else {//微信H5支付
                            window.location.href = data.data;
                        }
                    } else if (payType == 3) {//钱包支付
                        open_box("支付成功");
                    }

                } else if (data.code == 40) {
                    $("#isLoadShow").css("display", "none");
                    var realParams = {};
                    realParams["uid"] = $("#uid").val();//业务平台ID
                    realParams["gameId"] = $("#gameId").val();//业务平台ID
                    realParams["channel"] = $("#channel").val();//业务平台ID
                    showRealNameAuth(realParams);

                } else {
                    open_box(data.msg);
                }
            }
        });

    });

    function goToPayShow(url) {
        $("#goToUrl").attr("href", url);
        document.getElementById("goToUrl").click();
    }

    function showRealNameAuth(realParams) {
        $.ajax({
            type: "POST",
            data: realParams,
            async: false,
            //url: "http://172.27.35.1:8096/pay/getPayUrl",
            //url: "http://10.11.181.200:8080/api/getRealNameAuthUrl",
            url: "https://h5.paojiao.cn/api/getRealNameAuthUrl",
            dataType: "json",
            success: function (retData) {
                closeRealNameBox();
                if (retData.code == 1) {
                    var url = retData.data;
                    var realNameAuth = '<div id="showRealNameBox" style="top:0px;" class="mask2 login-box2">';
                    realNameAuth += '<div class="r5" style="margin:0 auto;top:0px;-webkit-border-radius:0px;border-radius:0px;">';
                    realNameAuth += '<div class="login-head2"  style="text-align: right;"><span><i class="icon-cancel" onclick="closeRealNameBox()"></i></span></div>';
                    realNameAuth += '<div class="login-body" style="height:' + ($(window).height() - 40) + 'px !important;-webkit-overflow-scrolling: touch; overflow-y: scroll;">';
                    realNameAuth += '<iframe  width="' + $(window).width() + 'px !important" frameborder="no" scrolling="yes" border="0px" height="400px;"   src="' + url + '"></iframe>';
                    realNameAuth += '</div>';
                    realNameAuth += '</div>';
                    realNameAuth += '</div>';
                    $("body").append(realNameAuth);
                } else {
                    open_box(retData.msg);
                    closeRealNameBox();
                }
            }
        });
    }


    //点击充值，关闭当前支付框，打开sdk游币充值页面
    $("#goldRecharge").click(function (event) {
        closePayView();//关闭当前支付框
        var goldRechargeUrl = $("#goldRechargeUrl").val();
        sdk.loadOpenUc(goldRechargeUrl);
    });

    //点击领券，关闭当前支付框，打开sdk代金券页面
    $("#receiveVoucher").click(function (event) {
        closePayView();//关闭当前支付框
        var voucherUrl = $("#voucherUrl").val();
        console.info("当前领劵连接："+voucherUrl);
        sdk.loadOpenUc(voucherUrl);
    });

    function onBridgeReady(payObj) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": payObj.appId,
                "timeStamp": payObj.timeStamp,
                "nonceStr": payObj.nonceStr,
                "package": payObj.package,
                "signType": payObj.signType,
                "paySign": payObj.paySign
            },
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    open_box("支付成功");
                } else {
                    open_box("支付失败");
                }
            });
    }

    //拉起微信公众号支付
    function callWxPay(payObj) {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady(payObj));
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(payObj));
            }
        } else {
            onBridgeReady(payObj);
        }
    }


});
