package com.paojiao.sdk3.controller.thirdsdk.oppo;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.DateUtil;
import com.paojiao.sdk3.common.util.EncryptUtils;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil2;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.*;
import com.paojiao.sdk3.controller.thirdsdk.qutoutiao.QuTouTiaoSign;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkChannelGameService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.utils.DateUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.*;

/**
 * @description: oppo-sdk
 * @author: jiangkun
 * @date: 2020/8/7
 */
public class OppoSDK implements ItfSdk {

    private static final Logger log = Logger.getLogger(OppoSDK.class);

    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);

    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);


    /**
     * SDK用户登录验证接口
     */
    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken,
                       ISDKVerifyListener callback) {
        log.info("OppoSDK verify客户端返回sdkToken: " + sdkToken);
        if (StringUtils.isBlank(sdkToken)) {
            log.info("OppoSDK-客户端登录返回为空");
            callback.onFailed("OppoSDK verify failed. " + "OppoSDK客户端登录返回为空");
            return;
        }
        try {
            JSONObject obj = JSONObject.parseObject(sdkToken);
            final String pkgName = sdkChannel.getVkey();
            if (StringUtils.isEmpty(pkgName)) {
                log.info("OppoSDK:pkgName为空！");
                callback.onFailed(" verify failed. " + "OppoSDK:pkgName为空！");
                return;
            }
            final String token = obj.getString("token");
            if (StringUtils.isEmpty(token)) {
                log.info("OppoSDK:token为空！");
                callback.onFailed(" verify failed. " + "OppoSDK:token为空！");
                return;
            }

            final String timeStamp = String.valueOf(new Date().getTime());
            if (StringUtils.isEmpty(timeStamp)) {
                log.info("OppoSDK:timeStamp为空！");
                callback.onFailed(" verify failed. " + "OppoSDK:timeStamp为空！");
                return;
            }

            Map<String, String> Values = new HashMap<>();
            Values.put("appKey", channelGame.getSignKey());
            Values.put("appSecret", channelGame.getPayKey());
            Values.put("pkgName", pkgName);
            Values.put("timeStamp", timeStamp);
            Values.put("token", token);
            String sb = SignUtil2.sortParam2(Values);
            log.info("OppoSDK:MD5加密待加密字符串:" + sb);
            String sign = EncryptUtils.md5(sb);
            log.info("OppoSDK:MD5加密结果:" + sign.toUpperCase());
            SortedMap<String, String> params = new TreeMap<>();
            params.put("pkgName", pkgName);
            params.put("timeStamp", timeStamp);
            params.put("token", token);
            params.put("sign", sign.toUpperCase());
            String url = sdkChannel.getAuthUrl();
            //验证登录
            HttpAgents.get(url, params, new HttpFutureCallback() {
                @Override
                public void completed(String result) {
                    log.info("OppoSDK登录验证结果:" + result);
                    if (StringUtils.isEmpty(result)) {
                        log.info("OppoSDK:登录验证结果为空！");
                        callback.onFailed(sdkChannel.getSdkCode() + " verify failed. " + "OppoSDK:登录验证结果为空！");
                        return;
                    }

                    JSONObject jsonObject = JSONObject.parseObject(result);
                    int errorcode = jsonObject.getInteger("errorcode");
                    JSONObject userInfo = jsonObject.getJSONObject("userInfo");
                    String userId = userInfo.getString("userId");
                    String userName = userInfo.getString("userName");
                    if (errorcode == 200) {
                        callback.onSuccess(new SDKVerifyResult(true, userId, userName, userName));
                        return;
                    }
                    callback.onFailed(sdkChannel.getSdkCode() + " verify failed. ");
                    return;
                }

                @Override
                public void failed(String err) {
                    callback.onFailed(sdkChannel.getSdkCode() + " verify failed. " + err);
                }

            });
        } catch (Exception e) {
            log.error("OppoSDK-verify: verify error!", e);
        }

    }

    /**
     * SDK订单回调接口
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("OppoSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            //PjThirdSdkChannel channel =channelService.findChannelById(channelGame.getSdkChannelId());
            try {

                String notifyId = request.getParameter("notifyId");          //回调通知ID
                String partnerOrder = request.getParameter("partnerOrder");       //开发者订单号
                String productName = request.getParameter("productName");         //商品名称
                String productDesc = request.getParameter("productDesc");     //商品描述
                String price = request.getParameter("price");             //商品价格
                String count = request.getParameter("count");             //商品数量（默认1）
                String attach = request.getParameter("attach");            //开发者在下单时候传递的附件描述信息
                String paymentWay = request.getParameter("paymentWay");     //支付方式
                String payResult = request.getParameter("payResult");       //支付结果
                String sign = request.getParameter("sign");
                if (sign.isEmpty()) {
                    log.error("OppoSDK orderCallBack ERROR: sign is Null");
                    vs.setReturnMsg("result=FAIL&resultMsg=sign参数为空");
                    callback.onSuccess(vs);
                    return;
                }
                if (notifyId.isEmpty()) {
                    log.error("OppoSDK orderCallBack ERROR: notifyId is Null");
                    vs.setReturnMsg("result=FAIL&resultMsg=notifyId参数为空");
                    callback.onSuccess(vs);
                    return;
                }
                if (partnerOrder.isEmpty()) {
                    log.error("OppoSDK orderCallBack ERROR: partnerOrder is Null");
                    vs.setReturnMsg("result=FAIL&resultMsg=partnerOrder参数为空");
                    callback.onSuccess(vs);
                    return;
                }
                if (productName.isEmpty()) {
                    log.error("OppoSDK orderCallBack ERROR: productName is Null");
                    vs.setReturnMsg("result=FAIL&resultMsg=productName参数为空");
                    callback.onSuccess(vs);
                    return;
                }
                if (productDesc.isEmpty()) {
                    log.error("OppoSDK orderCallBack ERROR: productDesc is Null");
                    vs.setReturnMsg("result=FAIL&resultMsg=productDesc参数为空");
                    callback.onSuccess(vs);
                    return;
                }
                if (price.isEmpty()) {
                    log.error("OppoSDK orderCallBack ERROR: price is Null");
                    vs.setReturnMsg("result=FAIL&resultMsg=price参数为空");
                    callback.onSuccess(vs);
                    return;
                }
                if (count.isEmpty()) {
                    log.error("OppoSDK orderCallBack ERROR: count is Null");
                    vs.setReturnMsg("result=FAIL&resultMsg=count参数为空");
                    callback.onSuccess(vs);
                    return;
                }

                TreeMap<String, String> treeMap = new TreeMap<>();
                treeMap.put("notifyId", notifyId);
                treeMap.put("partnerOrder", partnerOrder);
                treeMap.put("productName", productName);
                treeMap.put("productDesc", productDesc == null ? StringUtils.EMPTY : productDesc);
                treeMap.put("price", price);
                treeMap.put("count", count);
                treeMap.put("attach", attach == null ? StringUtils.EMPTY : attach);
                treeMap.put("paymentWay", paymentWay == null ? StringUtils.EMPTY : paymentWay);
                treeMap.put("payResult", payResult == null ? StringUtils.EMPTY : payResult);
                Set<String> keys = treeMap.keySet();
                StringBuilder sb = new StringBuilder();
                Iterator<String> iterator = keys.iterator();
                while (iterator.hasNext()) {
                    String key = iterator.next();
                    sb.append(key).append("=").append(treeMap.get(key)).append("&");
                }
                String content = sb.toString().substring(0, sb.length() - 1);
                log.info("OppoSDK orderCallBack::加密串为:" + content);
                //oppo支付公钥 channelGame.getCpServerUrl()
                boolean isFlag = OppoUtils.doCheck(content, sign, channelGame.getCpServerUrl());
                if (!isFlag) {
                    log.info("OppoSDK orderCallBack:验证签名出错");
                    vs.setReturnMsg("result=FAIL&resultMsg=验证签名出错");
                    callback.onSuccess(vs);
                    return;
                }

                String cporder = partnerOrder;
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("OppoSDK orderCallBack  ERROR:orer not found,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("result=FAIL&resultMsg=订单不存在");
                    callback.onSuccess(vs);
                    return;
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("OppoSDK orderCallBack  重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("result=OK&resultMsg=订单已完成");
                    callback.onSuccess(vs);
                    return;
                }
                // 真实收款
                Double money = Double.valueOf(Double.valueOf(price) / 100);
                // 实际收款金额不一致
                if (iod.getMoney() != money.floatValue()) {
                    log.error("OppoSDK orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + money);
                    // 更新订单金额
                    iod.setMoney(money.floatValue());
                    orderService.updateOrder(iod);
                }
                log.info("+++++++++OppoSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        notifyId);

            } catch (Exception e) {
                log.error("OppoSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("result=FAIL&resultMsg=系统错误");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("result=OK&resultMsg=订单完成");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("result=FAIL&resultMsg=系统错误");
            callback.onSuccess(vs);
            log.error("OppoSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }

    }

    /**
     * 获取订单接口
     */
    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order,
                           PjMap<String, String> params, ISDKVerifyListener callback) {
        String timestamp = String.valueOf(new Date().getTime());
        Float money = order.getMoney() * 100;
        Map<String, String> orderMap = new HashMap<>();
        orderMap.put("appId", sdkChannel.getSdkCode());
        orderMap.put("openId", params.get("sdkUserId"));
        orderMap.put("timestamp", timestamp);
        orderMap.put("productName", order.getGoodsName());
        orderMap.put("productDesc", order.getGoodsName());
        orderMap.put("count", "1");
        orderMap.put("price", String.valueOf(money.intValue()));
        orderMap.put("currency", "CNY");
        orderMap.put("callBackUrl", channelGame.getCpServerId());
        orderMap.put("cpOrderId", order.getOrderNumber());
        orderMap.put("appVersion", order.getAppVersion());
        orderMap.put("engineVersion", order.getAppVersion());
        String orderStr = SignUtil2.sortParam2(orderMap);

        log.info("OppoSDK-getOrderNo:获取订单号待加密参数：" + orderStr);
        String orderSign = OppoUtils.sign(orderStr, channelGame.getSdkAppKey());
        log.info("OppoSDK-getOrderNo:orderSign加密结果为：" + orderSign);
        orderMap.put("sign", orderSign);
        //设置请求头格式
        String requestJson = JSONObject.toJSONString(orderMap);
        log.info(requestJson);
        Map<String, String> headersMap = new HashMap<>();
        headersMap.put("Content-Type", "application/json");
        log.info("OppoSDK-getOrderNo:获取订单请求参数：" + requestJson);
        String resultJson = HttpAgents.post(channelGame.getCpServerPort(), headersMap, requestJson);
        log.info("OppoSDK-getOrderNo:获取订单返回结果：" + resultJson);
        if (StringUtils.isEmpty(resultJson)) {
            log.info("OppoSDK-getOrderNo:获取订单返回结果为空！");
            return;
        }
        JSONObject jsonObject = JSONObject.parseObject(resultJson);

        String code = jsonObject.getString("code");
        String msg = jsonObject.getString("msg");
        if (code.equals("200")) {
            log.info("OppoSDK-getOrderNo:获取订单信息code：" + code + ",msg:" + msg);
        }
        String orderNo = jsonObject.getJSONObject("data").getString("orderNo");

        SDKVerifyResult result = new SDKVerifyResult();
        TreeMap<String, String> treeMap = new TreeMap<>();
        treeMap.put("appKey", channelGame.getSignKey());
        treeMap.put("timestamp", timestamp);
        treeMap.put("orderNo", orderNo);

        Set<String> keys = treeMap.keySet();
        StringBuilder sb = new StringBuilder();
        Iterator<String> iterator = keys.iterator();
        while (iterator.hasNext()) {
            String key = iterator.next();
            sb.append(key).append("=").append(treeMap.get(key)).append("&");
        }
        String signContent = sb.toString().substring(0, sb.length() - 1);
        log.info("OppoSDK-getOrderNo:待签名参数：" + signContent + channelGame.getSdkAppKey());
        String sign = OppoUtils.sign(signContent, channelGame.getSdkAppKey());
        log.info("OppoSDK-getOrderNo:签名结果：" + sign);
        StringBuffer sf = new StringBuffer();
        sf.append(sdkChannel.getSdkCode()).append("__")
                .append(timestamp).append("__")
                .append(orderNo).append("__")
                .append(sign);
        log.info("OppoSDK-getOrderNo:返回前端数据：" + sf.toString());
        result.setExtension(sf.toString());
        callback.onSuccess(result);
    }


    public static void main(String[] args) {
       /* String time = String.valueOf(new Date().getTime());
        Map<String, String> Values = new HashMap<>();
        Values.put("appKey", "1ebpqK9q430KGSSC4KCsOkGG");
        Values.put("appSecret", "fE8bed2390C89fd2CA980c1fe6CDdD2e");
        Values.put("pkgName", "com.xdhmy.xy.nearme.gamecenter");
        Values.put("timeStamp", time);
        Values.put("token", "TN_Z0VYcElCUytVL1NheWpqQzB3b1h5ajhkRzNqOGs5T0srUlI3ZkFrMVhiNGlyWWdXV1QrZUoyMktpc1F3Q1BTVg");
        String sb = SignUtil2.sortParam2(Values);
        log.info("OppoSDK:MD5加密待加密字符串:" + sb);
        String sign = EncryptUtils.md5(sb);
        log.info("OppoSDK:MD5加密结果:" + sign.toUpperCase());

        SortedMap<String, String> params = new TreeMap<>();
        params.put("pkgName", "com.xdhmy.xy.nearme.gamecenter");
        params.put("timeStamp", time);
        params.put("token", "TN_Z0VYcElCUytVL1NheWpqQzB3b1h5ajhkRzNqOGs5T0srUlI3ZkFrMVhiNGlyWWdXV1QrZUoyMktpc1F3Q1BTVg");
        params.put("sign", sign);
        String url = "https://play.open.oppomobile.com/instant-game-open/userInfo";


        String requestJson = com.alibaba.fastjson.JSONObject.toJSONString(params);
        HttpAgents.newInstance().get(url, params, new HttpFutureCallback() {

            @Override
            public void completed(String content) {
                log.info("成功返回参数：" + content);
            }

            @Override
            public void failed(String err) {
                log.info(err);
            }
        });*/
      /* String time = String.valueOf(new Date().getTime());
        log.info("加密结果111："+time);
        String  str2= "appKey=1ebpqK9q430KGSSC4KCsOkGG&orderNo=GC202008111937075110100180000&timestamp=1597145827377";
        String key = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMopd5WBGc6+661J7iDkofYwllW58MVKGn4QjCKNpYXH6CQ//EmJH78LfjnfwmK6YijZ+lAXjYbTYX0oHpeslggiwmGVKD1iyUaImmNMBJHdUB1oQDNME/jGlxkpUQXjtKSksfgjsoqZdrwc2wXjqgDaSNfy4JnCTDUah3WiaEMzAgMBAAECgYBACpzYXppnVTHhpm7qOqNYExI8u/ea+BumXeWWuJp749UVTrPEM807vw9QlCLHFdYsrMjQAHYUBPh4JnJyh/jKr+4exndZSJFX/33Vx/y0vhjOBlI4t+rZP+Z0DuVAFOjIBF9EOip2F8n7KK6tBsxeG0+XEX4n47jBncspyrT16QJBAP7xApRJQ5IJsgzppFAbvL/VkluKDyRJn/GvHhcUoCh/9H4YHS37XhVIqNHYmg3TKB2+eRVZcdQmcRzZACgS7t8CQQDLAFrqJ/cKwdE25hxE0MptQJY7bg4IQOfcH5S1d6jYjgm+nJwqfsgqQ0XN3bdLReYrMEoP7v0xdBY0vcQ8gnotAkEAoqV6IsaXAE2FNW298YmwoqaLyDDNNjZuf09coBb9krkHb4bM3vAWdvezFKXequFDH67MKw20bEfWNDRRQD/L+wJBAIYVvfdcXnjkfGReqd1qa8quFo06rFoXRQ7IbVlPqF8hsp4Mo7oN8/i2Zq0L/b3idZ2hT8omeWbo3qIHlk7BgCECQDKnDzoT7LvfypISWw5L7b4iFucZI4a+EjHdFrSxC4HMnfSXY+Sjx4ceZtE+Wa8JgVY2+NtwI6B9gLqDz6dh7iY=";
       String sign2 =  OppoUtils.sign(str2,key);
       log.info("加密结果："+sign2);*/
        /*String url= "https://jits.open.oppomobile.com/jitsopen/api/pay/v1.0/preOrder";
        Map<String,String> orderMap = new HashMap<>();
        orderMap.put("appId","30311920");
        orderMap.put("openId","TN_Z0VYcElCUytVL1NheWpqQzB3b1h5cWdQNEoxTjREMHllaXFKcU84R0F3L0UwMWtrcUxWaVRhMlBEVmVrNStGSg");
        orderMap.put("timestamp","1597136339461");
        orderMap.put("productName","10元宝");
        orderMap.put("productDesc","10元宝");
        orderMap.put("count","1");
        orderMap.put("price","1000");
        orderMap.put("currency","CNY");
        orderMap.put("cpOrderId","H5_15971363352103040");
        orderMap.put("appVersion","1.0.0");
        orderMap.put("engineVersion","1.0.0");
        orderMap.put("sign","ShsUd0Rh9fH8rfNr/UDuk3W9C3BAkwJkf1RAwIO/+/MAVBzBl8XGKe1xDHM0/JRUVYs6oXCNTLs9+8yt/b2IziS0srV75il1hZVB2RX3KSXCf5pvRHWLFuv0WF1moEIGDAxXHfQBfIUro2lW0YKrupMpGABvoNdNQ1NXnywU9BA=");
        //设置请求头格式
        String requestJson = JSONObject.toJSONString(orderMap);
        log.info(requestJson);
        Map<String, String> headersMap = new HashMap<>();
        headersMap.put("Content-Type", "application/json");
        String aa =HttpAgents.post(url,headersMap,requestJson);
        log.info(aa);*/
    }


}
