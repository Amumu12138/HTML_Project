package com.paojiao.sdk3.controller.thirdsdk.youxikeji;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.DateUtil;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil;
import com.paojiao.sdk3.common.util.SignUtil2;
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
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 类描述：游禧科技 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/06/24 10:57
 */
public class YouXiKeJiSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(YouXiKeJiSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("YouXiKeJiSDK-verify  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("YouXiKeJiSDK-verify 客户端登录返回为空");
                callback.onFailed("YouXiKeJiSDK-verify failed: " + " 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String uid = json.getString("uid");
            final String userName = json.getString("username");
            final String serverId = json.getString("serverid");
            final String isAdult = json.getString("isadult");
            final String platform = json.getString("platform");
            final String time = json.getString("time");
            final String sign = json.getString("sign");

            if (StringUtils.isEmpty(uid)) {
                log.info("YouXiKeJiSDK uid为空");
                callback.onFailed("YouXiKeJiSDK-verify failed: uid为空");
                return;
            }
            if (StringUtils.isEmpty(time)) {
                log.info("YouXiKeJiSDK time为空");
                callback.onFailed("YouXiKeJiSDK-verify failed: time为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("YouXiKeJiSDK sign为空");
                callback.onFailed("YouXiKeJiSDK-verify failed: sign为空");
                return;
            }
            StringBuffer sf = new StringBuffer();
            sf.append(uid).append(userName)
                    .append(channelGame.getSignKey())
                    .append(serverId)
                    .append(isAdult)
                    .append(platform)
                    .append(time)
                    .append(channelGame.getPayKey());
            log.info("YouXiKeJiSDK-verify  参数加密前: " + sf.toString());
            String newSign = SignUtil.md5(sf.toString());
            log.info("YouXiKeJiSDK-verify  参数加密后: " + newSign);
            if (!sign.equals(newSign)) {
                callback.onFailed(sdkChannel.getSdkCode() + " YouXiKeJiSDK-verify failed：验证签名错误");
                return;
            } else {
                log.info("YouXiKeJiSDK 验证sign成功");
                callback.onSuccess(new SDKVerifyResult(true, uid, userName, null, ""));
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
        log.info("YouXiKeJiSDK.orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));
            String sign = params.get("sign");
            try {
                StringBuffer sf = new StringBuffer();
                sf.append(params.get("appid"))
                        .append(params.get("platform"))
                        .append(params.get("serverid"))
                        .append(params.get("uid"))
                        .append(params.get("username"))
                        .append(params.get("order_id"))
                        .append(params.get("money"))
                        .append(params.get("coin"))
                        .append(params.get("time"))
                        .append(params.get("out_orderid"))
                        .append(channelGame.getPayKey());
                log.info("YouXiKeJiSDK.orderCallBack 加密前参数：" + sf.toString());
                String newSign = SignUtil.md5(sf.toString());
                log.info("YouXiKeJiSDK.orderCallBack 加密结果为：" + newSign);
                if (!sign.equals(newSign)) {
                    log.error("YouXiKeJiSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("-1");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("out_orderid");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("YouXiKeJiSDK.orderCallBack ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("YouXiKeJiSDK.orderCallBack 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("1");
                    callback.onSuccess(vs);
                    return;
                }
                // 真实收款
                Double amount = Double.valueOf(params.get("money"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("YouXiKeJiSDK.orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    vs.setReturnMsg("-1");
                    callback.onSuccess(vs);
                    return;
                }
                log.info("+++++++++YouXiKeJiSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("order_id"));
            } catch (Exception e) {
                log.error("YouXiKeJiSDK.orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("-1");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("1");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("-1");
            callback.onSuccess(vs);
            log.error("YouXiKeJiSDK.orderCallBack 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
        String timeStamp = DateUtil.timeStamp();
        StringBuffer sf = new StringBuffer();
        sf.append(params.get("sdkUserId"))
                .append(params.get("sdkUserName"))
                .append(order.getMoney().intValue())
                .append(channelGame.getSignKey())
                .append("1")
                .append(sdkChannel.getSdkCode())
                .append(timeStamp)
                .append(order.getOrderNumber())
                .append(channelGame.getPayKey());
        log.error("YouXiKeJiSDK.getOrderNo 加密参数:" + sf.toString());
        String sign = SignUtil.md5(sf.toString());
        log.error("YouXiKeJiSDK.getOrderNo 加密结果:" + sign);
        SDKVerifyResult result = new SDKVerifyResult();
        result.setExtension(sign + "_" + timeStamp);
        callback.onSuccess(result);
    }


}
