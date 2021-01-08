<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>

    <title>支付</title>


    <link rel="stylesheet" type="text/css" href="${ctxStatic}/css/themes.css">
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/css/pay.css">
    <script type="text/javascript" src="${ctxStatic}/js/jq.js"></script>
    <script type="text/javascript" src="${ctxStatic}/js/banner.js"></script>
    <script type="text/javascript" src="${ctxStatic}/js/pj.androidutil.js"></script>


    <style>
        .title_id_card {z-index: 2;width:100%; text-align: center;font-size:18px;color:#222;height:56px;line-height:56px; background: #fff; position:fixed;top:0px;z-index: 2;border-bottom:1px solid #E5E5E5;}
        .title_id_card .close22 {position:fixed;top:18px;left:20px;width:20px;height:20px;}
        .title_id_card .close22 img {width:100%;}
    </style>
</head>

<body>

<div class="title_id_card">
    <div class="close22" onclick="backGame()" ><img src="/static/sdk2/img/close.png"></div>
</div>

<!--顶部样式-->
<div class="pay_result"><img src="${ctxStatic}/img/error_gray.png"><br/>
    ${not empty msg.msg ?msg.msg:''} ${not empty errorMsg ?errorMsg:''}
</div>

</body>


</html>
