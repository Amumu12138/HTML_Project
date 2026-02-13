package com.paojiao.sdk3.controller.thirdsdk.xunyou;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil;
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
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 类描述：迅游 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/08/31 17:32
 */
public class XunYouSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(XunYouSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("XunYouSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("XunYouSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "XunYouSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String userId = json.getString("userid");
            final String token = json.getString("token");

            if (StringUtils.isEmpty(userId)) {
                log.info("XunYouSDK-verify userId为空");
                callback.onFailed(" verify failed：XunYouSDK:userId为空");
                return;
            }
            if (StringUtils.isEmpty(token)) {
                log.info("XunYouSDK-verify token为空");
                callback.onFailed(" verify failed：XunYouSDK:token为空");
                return;
            }

            Map<String, String> params = new HashMap<String, String>();
            params.put("userid", userId); //用户id
            params.put("token", token);   //sdk登录得到的登录令牌
            String url = sdkChannel.getAuthUrl();
            HttpAgent.newInstance().post(url, params, new HttpFutureCallback() {
                @Override
                public void completed(String content) {
                    log.info("XunYouSDK-verify:登录验证返回参数：" + content);
                    if (StringUtils.isEmpty(content)) {
                        log.info("XunYouSDK-verify:登录验证返回参数为空！");
                        return;
                    }
                    JSONObject jsonObject = JSONObject.parseObject(content);
                    Integer code = jsonObject.getInteger("code");
                    if (code == 1) {
                        callback.onSuccess(new SDKVerifyResult(true, userId, null, null));
                        return;
                    } else {
                        callback.onFailed("XunYouSDK-verify:登录验证失败,错误信息:" + jsonObject.getString("msg"));
                        return;
                    }
                }

                @Override
                public void failed(String err) {
                    callback.onFailed(sdkChannel.getSdkCode() + " verify failed. ");
                    return;
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
            callback.onFailed(sdkChannel.getSdkCode()
                    + " verify execute failed. the exception is "
                    + e.getMessage());
        }
    }

    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("XunYouSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            String sign = params.get("sign");
            try {
                Map<String, String> paramsMap = new LinkedHashMap<>();
                paramsMap.put("orderid", params.get("orderid"));
                paramsMap.put("username", params.get("username"));
                paramsMap.put("appid", params.get("appid"));
                paramsMap.put("roleid", params.get("roleid"));
                paramsMap.put("serverid", params.get("serverid"));
                paramsMap.put("amount", params.get("amount"));
                paramsMap.put("paytime", params.get("paytime"));
                paramsMap.put("attach", params.get("attach"));
                paramsMap.put("productname",URLEncoder.encode(params.get("productname")));
                paramsMap.put("appkey", channelGame.getPayKey());
                String signStr = SignUtil2.sortParam3(paramsMap);
                log.info("XunYouSDK.orderCallBack: 加密前字符串：" + signStr);
                String newSign = SignUtil.md5(signStr).toLowerCase();

                log.info("XunYouSDK.orderCallBack: 加密后签名：" + newSign + ", 传参签名：" + sign);
                if (!sign.equals(newSign)) {
                    log.error("XunYouSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("error");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("attach");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("success");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("amount"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("XunYouSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    vs.setReturnMsg("error");
                    callback.onSuccess(vs);
                    return;
                   /* iod.setMoney(amount.floatValue());
                    orderService.updateOrder(iod);*/
                }
                log.info("+++++++++XunYouSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("orderid"));

            } catch (Exception e) {
                log.error("XunYouSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("error");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("success");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("error");
            callback.onSuccess(vs);
            log.error("XunYouSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
    }
}
