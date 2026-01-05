package com.paojiao.sdk3.controller.thirdsdk.xingting;

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
 * 类描述：星庭 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/6/10 17:32
 */
public class XingTingSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(XingTingSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("XingTingSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("XingTingSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "XingTingSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String uid = json.getString("uid");
            final String gid = json.getString("gid");
            final String cid = json.getString("cid");
            final String platform = json.getString("platform");
            final String time = json.getString("time");
            final String sign = json.getString("sign");

            if (StringUtils.isEmpty(uid)) {
                log.info("XingTingSDK-verify uid为空");
                callback.onFailed(" verify failed：XingTingSDK:uid为空");
                return;
            }
            if (StringUtils.isEmpty(gid)) {
                log.info("XingTingSDK-verify gid为空");
                callback.onFailed(" verify failed：XingTingSDK:gid为空");
                return;
            }
            if (StringUtils.isEmpty(cid)) {
                log.info("XingTingSDK-verify cid为空");
                callback.onFailed(" verify failed：XingTingSDK:cid为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("XingTingSDK-verify sign为空");
                callback.onFailed(" verify failed：XingTingSDK:sign为空");
                return;
            }
            Map<String, String> params = new HashMap<String, String>();
            params.put("uid", uid);//渠道用户id
            params.put("gid", gid);                 //渠道游戏id
            params.put("cid", cid);            //渠道id
            params.put("platform", platform);            //平台标识
            params.put("time", time);            //平台标识
            String signStr = SignUtil.sortParam3(params);
            String signParams = signStr + channelGame.getPayKey();
            log.info("XingTingSDK-verify  参数加密前: " + signParams);
            String newSign = SignUtil.md5(signParams);
            log.info("XingTingSDK-verify  参数加密结果: " + newSign);
            if (sign.equals(newSign)) {
                callback.onSuccess(new SDKVerifyResult(true, uid, null, null));
                return;
            } else {
                callback.onFailed(sdkChannel.getSdkCode() + " verify failed. ");
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
        log.info("XingTingSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            String sign = params.get("sign");
            try {
                String signStr = SignUtil.sortParam3(params);
                String signParams = signStr + channelGame.getPayKey();
                log.info("XingTingSDK.orderCallBack: 加密前字符串：" + signParams);
                String newSign = SignUtil.md5(signParams);

                log.info("XingTingSDK.orderCallBack: 加密后签名：" + newSign + ", 传参签名：" + sign);
                if (!sign.equals(newSign)) {
                    log.error("XingTingSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("{\"code\":0,\"msg\":\"验签失败\"}");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("cpNo");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("{\"code\":1,\"msg\":\"成功\"}");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("money"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("XingTingSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    vs.setReturnMsg("{\"code\":0,\"msg\":\"金额不一致\"}");
                    callback.onSuccess(vs);
                    return;
                   /* iod.setMoney(amount.floatValue());
                    orderService.updateOrder(iod);*/
                }
                log.info("+++++++++XingTingSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("order_no"));

            } catch (Exception e) {
                log.error("XingTingSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("{\"code\":0,\"msg\":\"系统错误\"}");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("{\"code\":1,\"msg\":\"成功\"}");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("{\"code\":0,\"msg\":\"系统错误\"}");
            callback.onSuccess(vs);
            log.error("XingTingSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
    }

    public static void main(String[] args) {
    }
}
