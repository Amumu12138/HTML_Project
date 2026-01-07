package com.paojiao.sdk3.controller.thirdsdk.dongyouxi;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.util.*;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.ISDKVerifyListener;
import com.paojiao.sdk3.controller.thirdsdk.ItfSdk;
import com.paojiao.sdk3.controller.thirdsdk.SDKVerifyResult;
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
import java.util.*;

/**
 * 类描述：趣乐网SDK
 *
 * @Author: jiangkun
 * @Date: 2020/4/26 10:21
 */
public class DongYouXiSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(DongYouXiSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("DongYouXiSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("DongYouXiSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "DongYouXiSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String appId = json.getString("appid");
            final String uid = json.getString("uid");
            final String token = json.getString("token");
            final String time = json.getString("time");
            final String sign = json.getString("sign");
            if (StringUtils.isEmpty(appId)) {
                log.info("DongYouXiSDK appId为空");
                callback.onFailed(" verify failed：DongYouXiSDK:appId为空");
                return;
            }
            if (StringUtils.isEmpty(uid)) {
                log.info("DongYouXiSDK uid为空");
                callback.onFailed(" verify failed：DongYouXiSDK:uid为空");
                return;
            }
            if (StringUtils.isEmpty(time)) {
                log.info("DongYouXiSDK time为空");
                callback.onFailed(" verify failed：DongYouXiSDK:time为空");
                return;
            }
            if (StringUtils.isEmpty(token)) {
                log.info("DongYouXiSDK token为空");
                callback.onFailed(" verify failed：DongYouXiSDK:token为空");
                return;
            }
            int date = DateUtil.timeStampSubtract(time);
            if (date >= 300){
                log.info("DongYouXiSDK 请求超时");
                callback.onFailed("请求超时");
                return;
            }
            Map<String, String> params = new HashMap<>();
            params.put("appid", appId);
            params.put("time", time);
            params.put("token", token);
            params.put("uid", uid);
            log.info("DongYouXiSDK sign 加密参数 " + SignUtil.sortParam2(params) + channelGame.getPayKey());
            String signStr = SignUtil.sortParam2(params) + channelGame.getPayKey();
            if (!SignUtil.isSignOK(signStr, sign)) {
                callback.onFailed(sdkChannel.getSdkCode()
                        + " DongYouXiSDK verify failed：验证签名错误");
                return;
            } else {
                log.info("DongYouXiSDK 验证sign成功");
                callback.onSuccess(new SDKVerifyResult(true, uid, null, null, ""));
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
        log.info("DongYouXiSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            PjThirdSdkChannel channel = channelService.findChannelById(channelGame.getSdkChannelId());
            String sign = params.get("sign");
            try {
                 String md5before =SignUtil.sortParam3(params)+channelGame.getPayKey();
                log.info("DongYouXiSDK orderCallBack encryption params:" + md5before);
                if (StrKit.isBlank(sign) || !SignUtil.isSignOK(md5before, sign)) {
                    log.error("DongYouXiSDK ERROR Invalid sign original string:" + md5before + " your sign:" + sign);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("extra_orderno");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("succ");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("amount"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("DongYouXiSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    iod.setMoney(amount.floatValue());
                    orderService.updateOrder(iod);
                }
                log.info("+++++++++DongYouXiSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("order_id"));

            } catch (Exception e) {
                log.error("DongYouXiSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("fail");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("succ");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("fail");
            callback.onSuccess(vs);
            log.error("DongYouXiSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
               SDKVerifyResult result = new SDKVerifyResult();
                Map<String,String> map = new HashMap<>();
                String time = DateUtil.timeStamp();
                map.put("amount",order.getMoney()+"0");
                map.put("appid",channelGame.getSignKey());
                map.put("extra_orderno",order.getOrderNumber());
                map.put("serverid",order.getServerId());
                map.put("time", time);
                map.put("token",params.get("token"));
                map.put("uid",order.getSdkUserId());
                String signParams =  SignUtil.sortParam2(map);
                log.info("DongYouXiSDK 支付加密参数："+signParams);
                String sign = EncryptUtils.md5(signParams+channelGame.getPayKey());
                log.info("DongYouXiSDK 支付加密结果："+sign);
                result.setExtension(sign+"_"+time);
                callback.onSuccess(result);
    }

    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("bbb", "2");
        map.put("aaa", "1");
        map.put("ccc", "3");
        map.put("ddd", "4");
        String sign = SignUtil.sortParam2(map);

        System.out.println(sign + "asldoqwjdoqhwdoa");
        System.out.println(DateUtil.timeStamp());
       int money =  Integer.parseInt("10");
        System.out.println(money);

        String str ="6176b240d06e6f2993d977c3db7961f4_1590550037";
       String [] a=  str.split("_");
        System.out.println("0----------"+a[0]);
        System.out.println("1----------"+a[1]);
    }
}
