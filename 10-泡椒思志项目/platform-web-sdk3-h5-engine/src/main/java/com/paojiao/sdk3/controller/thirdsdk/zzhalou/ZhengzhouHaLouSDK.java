package com.paojiao.sdk3.controller.thirdsdk.zzhalou;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
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
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 类描述：郑州哈喽 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/11/10 15:57
 */
public class ZhengzhouHaLouSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(ZhengzhouHaLouSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("ZhengzhouHaLouSDK-verify  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("ZhengzhouHaLouSDK-verify 客户端登录返回为空");
                callback.onFailed("ZhengzhouHaLouSDK-verify failed: " + " 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String code = json.getString("code");
            if (StringUtils.isEmpty(code)) {
                log.info("ZhengzhouHaLouSDK-verify:code为空");
                callback.onFailed("ZhengzhouHaLouSDK-verify failed: code为空");
                return;
            }

            //将参数加密,并将加密后的结果请求到渠道
            StringBuffer sf = new StringBuffer();
            sf.append(channelGame.getSignKey()).append(code);
            String newSign = HmacSHA256Secure.encryptionSign(sf.toString(), channelGame.getPayKey());
            if (StringUtils.isEmpty(newSign)) {
                log.info("ZhengzhouHaLouSDK-verify-加密结果NULL");
            }
            //请求渠道需要的参数
            Map<String, String> mapParams = new HashMap<>();
            mapParams.put("appid", channelGame.getSignKey());
            mapParams.put("code", code);
            mapParams.put("sign", newSign);
            String url = sdkChannel.getAuthUrl();
            String requestJson = JSONObject.toJSONString(mapParams);
            log.info("ZhengzhouHaLouSDK-getOrderNo:获取订单请求参数：" + requestJson);
            HttpAgents.post_str(url, requestJson, new HttpFutureCallback() {
                @Override
                public void completed(String content) {
                    log.info("ZhengzhouHaLouSDK-verify:验证登录返回参数：" + content);
                    JSONObject json = JSONObject.parseObject(content);
                    if (json.get("code").toString().equals("0")) {
                        String uid = json.getJSONObject("data").getString("uid");
                        callback.onSuccess(new SDKVerifyResult(true, uid, "", null, ""));
                        return;
                    } else {
                        callback.onFailed(sdkChannel.getSdkCode() + " ZhengzhouHaLouSDK-verify failed：" + json.get("msg").toString());
                        return;
                    }

                }

                @Override
                public void failed(String err) {
                    callback.onFailed(sdkChannel.getSdkCode() + " ZhengzhouHaLouSDK-verify failed：验证签名错误");
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
        log.info("ZhengzhouHaLouSDK.orderCallBack:" + JsonKit.toJson(params));
        JSONObject paramsJson = null;
        //解析request 对象中的json数据
        try {
            BufferedReader br = request.getReader();
            String str, wholeStr = "";
            while ((str = br.readLine()) != null) {
                wholeStr += str;
            }
            log.info("ZhengzhouHaLouSDK.orderCallBack-request:" + wholeStr);
            if (StringUtils.isNotEmpty(wholeStr)) {
                paramsJson = JSONObject.parseObject(wholeStr);
            }
        } catch (Exception e) {
            e.getMessage();
        }

        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));
            String sign = paramsJson.getString("sign");
            try {
                if (!paramsJson.getString("tradeStatus").equals("SUCCESS")) {
                    log.info("ZhengzhouHaLouSDK---" + paramsJson.getString("notifyTime") + "---订单号状态为:" + paramsJson.getString("tradeStatus"));
                }
                StringBuffer sf = new StringBuffer();
                sf.append(paramsJson.getString("amount")).
                        append(paramsJson.getString("appid")).
                        append(paramsJson.getString("notifyTime")).
                        append(paramsJson.getString("orderId")).
                        append(paramsJson.getString("outTradeNo")).
                        append(paramsJson.getString("tradeStatus"));
                log.info("ZhengZhouHaLou-SDK.orderCallBack:参数：" + sf.toString());
                String newSign = HmacSHA256Secure.encryptionSign(sf.toString(), channelGame.getPayKey());
                if (!sign.equals(newSign)) {
                    log.error("ZhengzhouHaLouSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = URLDecoder.decode(paramsJson.getString("outTradeNo"));
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ZhengzhouHaLouSDK.orderCallBack ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("ZhengzhouHaLouSDK.orderCallBack 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("success");
                    callback.onSuccess(vs);
                    return;
                }
                // 真实收款
                Double amount = Double.valueOf(URLDecoder.decode(paramsJson.getString("amount")));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("ZhengzhouHaLouSDK.orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                log.info("+++++++++ZhengzhouHaLouSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        URLDecoder.decode(paramsJson.getString("orderId")));
            } catch (Exception e) {
                log.error("ZhengzhouHaLouSDK.orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("fail");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("success");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("fail");
            callback.onSuccess(vs);
            log.error("ZhengzhouHaLouSDK.orderCallBack 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
        try {
            SDKVerifyResult result = new SDKVerifyResult();
            //加密参数
            StringBuffer sf = new StringBuffer();
            sf.append(order.getMoney().intValue()).
                    append(channelGame.getSignKey()).
                    append(order.getGoodsName()).
                    append(order.getOrderNumber());
            log.info("ZhengZhouHaLou-SDK-getOrderNo:参数：" + sf.toString());
            //加密结果
            String sign = HmacSHA256Secure.encryptionSign(sf.toString(), channelGame.getPayKey());
            if (StringUtils.isEmpty(sign)) {
                log.info("ZhengZhouHaLou-SDK-getOrderNo:Sign为Null");
            }
            Map<String, String> pramsMap = new HashMap<>();
            pramsMap.put("appid", channelGame.getSignKey());
            pramsMap.put("uid", order.getSdkUserId());
            pramsMap.put("outTradeNo", order.getOrderNumber());
            pramsMap.put("amount", String.valueOf(order.getMoney().intValue()));
            pramsMap.put("goodsName", order.getGoodsName());
            pramsMap.put("notifyUrl", channelGame.getCpServerUrl());
            pramsMap.put("sign", sign);

            String requestJson = JSONObject.toJSONString(pramsMap);
            log.info(requestJson);
            Map<String, String> headersMap = new HashMap<>();
            headersMap.put("Content-Type", "application/json");
            String payUrl = sdkChannel.getVkey();
            log.info("ZhengZhouHaLou-getOrderNo:获取订单请求参数：" + requestJson + ",请求链接：" + payUrl);
            String resultParams = HttpAgents.post(payUrl, headersMap, requestJson);

            log.info("ZhengZhouHaLou-SDK 调用支付付款返回参数:" + resultParams);
            if (StringUtils.isNotEmpty(resultParams)) {
                JSONObject jsonObject = JSONObject.parseObject(resultParams);
                Integer code = jsonObject.getInteger("code");
                if (code == 0) {
                    log.info("ZhengZhouHaLou-SDK 支付付款成功，订单号为:" + jsonObject.getJSONObject("data").getString("orderId"));
                    result.setExtension(jsonObject.getJSONObject("data").getString("orderId"));
                }
            }
            callback.onSuccess(result);
        } catch (Exception e) {
            e.getMessage();
        }
    }

    public static void main(String[] args) {
      /*  StringBuffer sf = new StringBuffer();
        sf.append("642592177067655168").append("C_79d57e2014424362a5fcac090023f2a2");
       String sign =  HmacSHA256Secure.encryptionSign(sf.toString(),"1927845b453a42998804186d2413bcff");
        Map<String,String> map = new HashMap<>();
        map.put("appid","642592177067655168");
        map.put("code","C_79d57e2014424362a5fcac090023f2a2");
        map.put("sign",sign);
        //设置请求头格式
        String requestJson = JSONObject.toJSONString(map);
        log.info(requestJson);
        Map<String, String> headersMap = new HashMap<>();
        headersMap.put("Content-Type", "application/json");
        log.info("OppoSDK-getOrderNo:获取订单请求参数：" + requestJson);
        String resultJson = HttpAgents.post("https://douwancps.hellobike.com/game/login", headersMap, requestJson);
        log.info("OppoSDK-getOrderNo:结果：" + resultJson);
*/
     /*   Map<String, String> pramsMap = new HashMap<>();
        pramsMap.put("appid", "1");
        pramsMap.put("uid", "2");
        pramsMap.put("outTradeNo", "3");
        pramsMap.put("amount", "4");
        pramsMap.put("goodsName", "5");
        pramsMap.put("notifyUrl","6");
        log.info(SignUtil2.sortParam2(pramsMap));*/
    }


}
