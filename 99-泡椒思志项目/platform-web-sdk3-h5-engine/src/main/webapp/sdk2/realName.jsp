<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/sdk2/include/taglib.jsp" %>

<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <title>支付</title>
    <script>
        page = "home";
    </script>

    <link rel="stylesheet" type="text/css" href="${ctxStatic}/sdk2/css/sdk_themes.css?v=vs">
    <script type="text/javascript" src="${ctxStatic}/sdk2/js/jq4.js?v=d"></script>
    <script type="text/javascript" src="${ctxStatic}/sdk2/js/sdk_common.js?v=a1"></script>
    <script type="text/javascript" src="${ctxStatic}/sdk2/js/pj.androidutil.js"></script>

    <script type="text/javascript">
        $(function () {
            $("#card_button").click(function () {
                let name = $("#name").val();
                let idCard = $("#idCard").val();
                let puid = $("#puid").val()
                let callback = $("#callback").val();

                if(name ===''){
                    open_box("请输入姓名");
                    return false;
                }
                let id_cardRegx = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if(!id_cardRegx.test(idCard)) {
                    open_box("请输入正确完整的身份证号码");
                    return false;
                }

                $.post(ctx+"/pay/doRealName", {name:name,idCard:idCard,puid:puid},
                    function(data) {
                        if(data.code == 1){
                            open_box(data.msg);
                            if (callback != '' && callback != null) {
                                setTimeout(function () {
                                    window.location.href = callback;
                                }, 1000);
                            }
                        }else{
                            open_box(data.msg);
                        }
                    });
            });

        });
    </script>
</head>
<body>
<!--安卓低版本适配-->
<div id="az_js"></div>
<script type="text/javascript" src="${ctxStatic}/sdk2/js/az_js.js?v=a1"></script>
<!--end-->

<style>
    body {
        background: #fff;
    }
</style>
<div class="right_body">
    <input type="hidden" id="puid" value="${puid}">
    <input type="hidden" id="callback" value="${callback}">
    <div class="title_id_card">
        实名认证
        <div class="close" onclick="backGame()"><img src="${ctxStatic}/sdk2/img/close.png"></div>
    </div>
    <div class="get_id_card">
        <span class="ts2">根据国家有关规定，请您尽快完成实名认证！</span>
        <div class=""><input maxlength="6" type="text" id="name" placeholder="请输入姓名"></div>
        <div><input maxlength="30" type="text" id="idCard" placeholder="请输入身份证号码"></div>
        <span class="card_button"><input type="button" id="card_button" value="立即认证"></span>
    </div>
</div>
</div>
<!--对话框-->
<div class="open_box">
    <div class="box_font" id="box_font"></div>
</div>
<!--end 对话框-->

</body>
</html>
