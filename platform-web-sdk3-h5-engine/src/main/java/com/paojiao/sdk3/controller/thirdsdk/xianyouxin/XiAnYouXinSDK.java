package com.paojiao.sdk3.controller.thirdsdk.xianyouxin;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.DateUtil;
import com.paojiao.sdk3.common.util.HmacSHA1Encryption;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil2;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.*;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkChannelGameService;
import com.paojiao.sdk3.service.PjThirdSdkChannelService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @description: 西安游心-SDK
 * @author: jiangkun
 * @date: 2020/8/26
 */
public class XiAnYouXinSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(XiAnYouXinSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("XiAnYouXinSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("XiAnYouXinSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "XiAnYouXinSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String channelExt = json.getString("channelExt");
            final String email = json.getString("email");
            final String loginPlatform2cp = json.getString("loginplatform2cp");
            final String userId = json.getString("user_id");
            final String sdkLoginDomain = json.getString("sdklogindomain");
            final String sdkLoginModel = json.getString("sdkloginmodel");
            final String sign = json.getString("sign");
            final String gameAppId = channelGame.getSignKey();
            final String newTime = json.getString("new_time");

            if (StringUtils.isEmpty(channelExt)) {
                log.info("XiAnYouXinSDK-verify channelExt为空");
                callback.onFailed(" verify failed：XiAnYouXinSDK:channelExt为空");
                return;
            }
            if (StringUtils.isEmpty(userId)) {
                log.info("XiAnYouXinSDK-verify userId为空");
                callback.onFailed(" verify failed：XiAnYouXinSDK:userId为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("XiAnYouXinSDK-verify sign为空");
                callback.onFailed(" verify failed：XiAnYouXinSDK:sign为空");
                return;
            }
            Map<String, String> paramsMap = new HashMap<>();
            paramsMap.put("channelExt", channelExt);
            paramsMap.put("email", email);
            paramsMap.put("game_appid", gameAppId);
            paramsMap.put("new_time", newTime);
            paramsMap.put("loginplatform2cp", loginPlatform2cp);
            paramsMap.put("user_id", userId);
            paramsMap.put("sdklogindomain", sdkLoginDomain);
            paramsMap.put("sdkloginmodel", sdkLoginModel);
            String requestParams = SignUtil2.sortParam2(paramsMap);
            log.info("XiAnYouXinSDK-verify  参数加密前参数: " + requestParams + channelGame.getPayKey());
            String signature = SignUtil2.md5(requestParams + channelGame.getPayKey());
            log.info("XiAnYouXinSDK-verify  参数加密结果: " + signature);
            if (sign.equals(signature)) {
                callback.onSuccess(new SDKVerifyResult(true, userId, null, null));
                return;
            } else {
                callback.onFailed(sdkChannel.getSdkCode() + " verify failed,验签失败！");
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
            callback.onFailed(sdkChannel.getSdkCode()
                    + " verify execute failed. the exception is "
                    + e.getMessage());
        }
    }

    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("XiAnYouXinSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            String sign = params.get("sign");

            try {
                Map<String, String> callbackMap = new HashMap<>();
                callbackMap.put("amount", params.get("amount"));
                callbackMap.put("channel_source", params.get("channel_source"));
                callbackMap.put("game_appid", params.get("game_appid"));
                callbackMap.put("out_trade_no", params.get("out_trade_no"));
                callbackMap.put("payplatform2cp", params.get("payplatform2cp"));
                callbackMap.put("trade_no", params.get("trade_no"));
                String signParams = SignUtil2.sortParam2(callbackMap);
                log.info("XiAnYouXinSDK.orderCallBack: 加密前字符串：" + signParams + ", 密钥：" + channelGame.getPayKey());
                String newSign = SignUtil2.md5(signParams + channelGame.getPayKey());
                log.info("XiAnYouXinSDK.orderCallBack: 加密后签名：" + newSign + ", 传参签名：" + sign);
                if (!sign.equals(newSign)) {
                    log.error("XiAnYouXinSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("{\"status\":\"fail\"}");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("trade_no");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("{\"status\":\"success\"}");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(Integer.parseInt(params.get("amount")) / 100);
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("XiAnYouXinSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    vs.setReturnMsg("{\"status\":\"fail\"}");
                    callback.onSuccess(vs);
                    return;
                    //iod.setMoney(amount.floatValue());
                    //orderService.updateOrder(iod);
                }
                log.info("+++++++++XiAnYouXinSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("out_trade_no"));

            } catch (Exception e) {
                log.error("XiAnYouXinSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("{\"status\":\"fail\"}");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("{\"status\":\"success\"}");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("{\"status\":\"fail\"}");
            callback.onSuccess(vs);
            log.error("XiAnYouXinSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
        SDKVerifyResult result = new SDKVerifyResult();
        //转换成平台币
        Float money = order.getMoney() * 100;
        Map<String, String> orderMap = new HashMap<>();
        orderMap.put("amount", String.valueOf(money.intValue()));
        orderMap.put("channelExt", params.get("channelExt"));
        orderMap.put("game_appid", channelGame.getSignKey());
        orderMap.put("props_name", order.getGoodsName());
        orderMap.put("trade_no", order.getOrderNumber());
        orderMap.put("user_id", order.getSdkUserId());
        orderMap.put("sdkloginmodel", params.get("sdkloginmodel"));
        String requestParams = SignUtil2.sortParam2(orderMap);
        log.info("XiAnYouXinSDK-getOrderNo-参数加密前参数: " + requestParams + channelGame.getPayKey());
        String signature = SignUtil2.md5(requestParams + channelGame.getPayKey());
        log.info("XiAnYouXinSDK-getOrderNo-参数加密结果: " + signature);
        result.setExtension(signature);
        callback.onSuccess(result);
    }
}
