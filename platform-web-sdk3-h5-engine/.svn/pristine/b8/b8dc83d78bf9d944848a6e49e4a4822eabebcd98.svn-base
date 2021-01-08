package com.paojiao.sdk3.controller.thirdsdk.jifengwang;

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
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;

/**
 * 类描述：机锋网 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/07/02 10:11
 */
public class JiFengWangSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(JiFengWangSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("JiFengWangSDK-verify  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("JiFengWangSDK-verify 客户端登录返回为空");
                callback.onFailed("JiFengWangSDK-verify failed: " + " 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String gameId = json.getString("game_id");
            final String gameAppId = json.getString("game_appid");
            final String timeStamp = json.getString("time_stamp");
            final String userId = json.getString("user_id");
            final String nickName = json.getString("nickname");
            final String sign = json.getString("sign");

            if (StringUtils.isEmpty(gameId)) {
                log.info("JiFengWangSDK-verify gameId为空");
                callback.onFailed("JiFengWangSDK-verify failed: gameId为空");
                return;
            }
            if (StringUtils.isEmpty(userId)) {
                log.info("JiFengWangSDK-verify userId为空");
                callback.onFailed("JiFengWangSDK-verify failed: userId为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("JiFengWangSDK-verify sign为空");
                callback.onFailed("JiFengWangSDK-verify failed: sign为空");
                return;
            }
            StringBuffer sf = new StringBuffer();
            sf.append(gameId).append(gameAppId)
                    .append(timeStamp)
                    .append(userId)
                    .append(channelGame.getSignKey());
            log.info("JiFengWangSDK-verify  参数加密前: " + sf.toString());
            String newSign = SignUtil.md5(sf.toString());
            log.info("JiFengWangSDK-verify  参数加密后: " + newSign);
            if (!sign.equals(newSign)) {
                callback.onFailed(sdkChannel.getSdkCode() + " JiFengWangSDK-verify failed：验证签名错误");
                return;
            } else {
                log.info("JiFengWangSDK 验证sign成功");
                callback.onSuccess(new SDKVerifyResult(true, userId, nickName, null, ""));
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
        log.info("JiFengWangSDK.orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));
            String sign = params.get("sign");
            try {
                StringBuffer sf = new StringBuffer();
                sf.append(params.get("out_trade_no"))
                        .append(params.get("price"))
                        .append(params.get("pay_status"))
                        .append(params.get("extend"))
                        .append(channelGame.getSignKey());
                log.info("JiFengWangSDK.orderCallBack 加密前参数：" + sf.toString());
                String newSign = SignUtil.md5(sf.toString());
                log.info("JiFengWangSDK.orderCallBack 加密结果为：" + newSign);
                if (!sign.equals(newSign)) {
                    log.error("JiFengWangSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("extend");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("JiFengWangSDK.orderCallBack ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("JiFengWangSDK.orderCallBack 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("success");
                    callback.onSuccess(vs);
                    return;
                }
                // 真实收款
                Double amount = Double.valueOf(params.get("price")) / 100; //分转换成元
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("JiFengWangSDK.orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                log.info("+++++++++JiFengWangSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("out_trade_no"));
            } catch (Exception e) {
                log.error("JiFengWangSDK.orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("fail");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("success");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("fail");
            callback.onSuccess(vs);
            log.error("JiFengWangSDK.orderCallBack 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
    }

}
