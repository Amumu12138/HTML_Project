package com.paojiao.sdk3.controller.thirdsdk.xiaomi;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.HmacSHA1Encryption;
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
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 类描述：小米 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/6/5 10:21
 */
public class XiaoMiSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(XiaoMiSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("XiaoMiSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("XiaoMiSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "XiaoMiSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String userName = json.getString("userName");
            final String userImage = json.getString("userImage");
            final String appAccountId = json.getString("appAccountId");
            final String session = json.getString("session");

            if (StringUtils.isEmpty(userName)) {
                log.info("XiaoMiSDK-verify userName为空");
                callback.onFailed(" verify failed：XiaoMiSDK:userName为空");
                return;
            }
            if (StringUtils.isEmpty(appAccountId)) {
                log.info("XiaoMiSDK-verify appAccountId为空");
                callback.onFailed(" verify failed：XiaoMiSDK:appAccountId为空");
                return;
            }
            if (StringUtils.isEmpty(session)) {
                log.info("XiaoMiSDK-verify session为空");
                callback.onFailed(" verify failed：XiaoMiSDK:session为空");
                return;
            }
            Map<String, String> params = new HashMap<String, String>();

            params.put("appId", channelGame.getSdkAppId());//渠道ID
            params.put("session", session);//用户session
            params.put("uid", appAccountId);//用户uid

            StringBuilder sb = new StringBuilder();
            sb.append("appId=").append(channelGame.getSdkAppId()).append("&")
                    .append("session=").append(session).append("&")
                    .append("uid=").append(appAccountId);
            log.info("XiaoMiSDK-verify  参数加密前: " + sb.toString());
            String signature = HmacSHA1Encryption.HmacSHA1Encrypt(sb.toString(), channelGame.getPayKey());
            params.put("signature", signature);//用户session
            log.info("XiaoMiSDK-verify  参数加密结果: " + signature);
            HttpAgent.getInstance().post(sdkChannel.getAuthUrl(), params, new HttpFutureCallback() {
                @Override
                public void completed(String result) {
                    if (StringUtils.isBlank(result)) {
                        callback.onFailed("XiaoMiSDK-verify: result is null.");
                        return;
                    }
                    //errcode	必须	状态码200=验证正确 1515=appId错误 1516=uid错误 1520=session错误 1525=signature错误
                    log.info("XiaoMiSDK-verify: result: " + result);//返回结果为json数据
                    JSONObject js = JSONObject.parseObject(result);
                    String errcode = js.getString("errcode");
                    if (null != errcode && errcode.equals("200")) {
                        callback.onSuccess(new SDKVerifyResult(true, appAccountId, userName, null));
                        return;
                    }
                }

                @Override
                public void failed(String err) {
                    callback.onFailed(sdkChannel.getSdkCode() + " verify failed. " + err);

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
        log.info("XiaoMiSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            String sign = params.get("signature");

            try {
                StringBuilder sb = new StringBuilder();
                sb.append("appId=").append(channelGame.getSdkAppId()).append("&")
                        .append("cpOrderId=").append(params.get("cpOrderId")).append("&");
                if (!StringUtils.isEmpty(params.get("cpOrderId"))) {
                    sb.append("cpUserInfo=").append(params.get("cpOrderId")).append("&");
                }

                sb.append("orderId=").append(params.get("orderId")).append("&");
                sb.append("orderStatus=").append(params.get("orderStatus")).append("&");
                if (!StringUtils.isEmpty(params.get("partnerGiftConsume"))) {
                    sb.append("partnerGiftConsume=").append(params.get("partnerGiftConsume")).append("&");
                }
                sb.append("payFee=").append(params.get("payFee")).append("&")
                        .append("payTime=").append(params.get("payTime")).append("&")
                        .append("productCode=").append(params.get("productCode")).append("&")
                        .append("productCount=").append(params.get("productCount")).append("&")
                        .append("productName=").append(params.get("productName")).append("&")
                        .append("uid=").append(params.get("uid"));
                log.info("XiaoMiSDK.orderCallBack: 加密前字符串：" + sb.toString() + ", 密钥：" + channelGame.getSignKey());
                String vCode = HmacSHA1Encryption.HmacSHA1Encrypt(sb.toString(), channelGame.getSignKey());
                log.info("XiaoMiSDK.orderCallBack: 加密后签名：" + vCode + ", 传参签名：" + sign);
                if (!sign.equals(vCode)) {
                    log.error("XiaoMiSDK ERROR Invalid sign original string:" + vCode + " your sign:" + sign);
                    vs.setReturnMsg("{\"errcode\":1525,\"errMsg\":\"签名验证失败\"}");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("cpOrderId");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("{\"errcode\":200,\"errMsg\":\"订单已完成\"}");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(Integer.parseInt(params.get("money")) / 100);
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("XiaoMiSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    vs.setReturnMsg("{\"errcode\":0001,\"errMsg\":\"订单金额不一致\"}");
                    callback.onSuccess(vs);
                    return;
                    //iod.setMoney(amount.floatValue());
                    //orderService.updateOrder(iod);
                }
                log.info("+++++++++XiaoMiSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("orderId"));

            } catch (Exception e) {
                log.error("XiaoMiSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("{\"errcode\":0001,\"errMsg\":\"充值回调请求异常\"}");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("{\"errcode\":200,\"errMsg\":\"成功\"}");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("{\"errcode\":0001,\"errMsg\":\"充值回调请求异常\"}");
            callback.onSuccess(vs);
            log.error("XiaoMiSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
        SDKVerifyResult result = new SDKVerifyResult();
        //转换成平台币
        float money = order.getMoney() * 100;
        StringBuffer sb = new StringBuffer();
        sb.append("appAccountId=").append(params.get("appAccountId")).append("&").
                append("appId=").append(channelGame.getSdkAppId()).append("&").
                append("cpOrderId=").append(order.getOrderNumber()).append("&").
                append("cpUserInfo=").append(order.getOrderNumber()).append("&").
                append("displayName=").append(order.getGoodsName()).append("&").
                append("feeValue=").append((int) money).append("&").
                append("session=").append(params.get("session"));

        log.info("XiaoMiSDK: 加密前字符串：" + sb.toString() + ", 密钥：" + channelGame.getSignKey());
        String sign = null;
        try {
            sign = HmacSHA1Encryption.HmacSHA1Encrypt(sb.toString(), channelGame.getSignKey());
        } catch (Exception e) {
            e.printStackTrace();
        }
        log.info("XiaoMiSDK: 加密后签名：" + sign);
        StringBuffer sf = new StringBuffer(sign);
        sf.append("_").append(sign).append("_").append(channelGame.getSdkAppId());
        result.setExtension(sf.toString());
        callback.onSuccess(result);
    }

    public static void main(String[] args) {
        Double amount = Double.valueOf(Integer.parseInt("100") / 100);
        log.info(amount);
    }
}
