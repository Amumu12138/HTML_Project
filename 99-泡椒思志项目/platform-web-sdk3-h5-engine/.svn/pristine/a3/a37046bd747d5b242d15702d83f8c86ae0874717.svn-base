package com.paojiao.sdk3.controller.thirdsdk.hainanqule;

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
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 类描述：海南趣乐 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/11/24 15:17
 */
public class HaiNanQuLeSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(HaiNanQuLeSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("HaiNanQuLeSDK-verify  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("HaiNanQuLeSDK-verify 客户端登录返回为空");
                callback.onFailed("HaiNanQuLeSDK-verify failed: " + " 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String userId = json.getString("user_id");
            final String time = json.getString("time");
            final String sign = json.getString("sign");
            if (StringUtils.isEmpty(userId)) {
                log.info("HaiNanQuLeSDK-verify: userId为空");
                callback.onFailed("HaiNanQuLeSDK-verify failed: userId为空");
                return;
            }
            if (StringUtils.isEmpty(time)) {
                log.info("HaiNanQuLeSDK-verify: time为空");
                callback.onFailed("HaiNanQuLeSDK-verify failed: time为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("HaiNanQuLeSDK-verify: sign为空");
                callback.onFailed("HaiNanQuLeSDK-verify failed: sign为空");
                return;
            }
            //将参数加密,并将加密后的结果请求到渠道
            StringBuffer sf = new StringBuffer();
            sf.append(userId).append(time).append(channelGame.getSignKey());

            log.info("HaiNanQuLeSDK-verify  参数加密前: " + sf.toString());
            String newSign = SignUtil.md5(sf.toString()).toUpperCase();
            log.info("HaiNanQuLeSDK-verify  参数加密后: " + newSign);
            if (sign.equals(newSign)) {
                callback.onSuccess(new SDKVerifyResult(true, userId, "", null, ""));
                return;
            } else {
                callback.onFailed(sdkChannel.getSdkCode() + " HaiNanQuLeSDK-verify failed：" + json.get("msg").toString());
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
        log.info("HaiNanQuLeSDK.orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));
            String sign = params.get("sign");
            if (!params.get("res_code").equals("0")){
                log.error("HaiNanQuLeSDK-orderCallBack 订单状态为："+params.get("res_code"));
                vs.setReturnMsg("ERROR");
                callback.onSuccess(vs);
                return;
            }
            try {
                StringBuffer sf = new StringBuffer();
                sf.append(params.get("out_trade_no"))       //平台的订单号
                        .append(params.get("trade_id"))      //我方订单号
                        .append(params.get("attach"))  //订单总金额
                        .append(params.get("total_fee"))  //订单总金额
                        .append(params.get("res_code"))         //支付状态
                        .append(params.get("nonce_str"))        //随机字符串
                        .append(channelGame.getPayKey());
                log.info("HaiNanQuLeSDK.orderCallBack 加密前参数：" + sf.toString());
                String newSign = SignUtil.md5(sf.toString()).toUpperCase();
                log.info("HaiNanQuLeSDK.orderCallBack 加密结果为：" + newSign);
                if (!sign.equals(newSign)) {
                    log.error("HaiNanQuLeSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("ERROR");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = URLDecoder.decode(params.get("trade_id"));
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("HaiNanQuLeSDK.orderCallBack ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("HaiNanQuLeSDK.orderCallBack 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("OK");
                    callback.onSuccess(vs);
                    return;
                }
                // 真实收款
                Double amount = Double.valueOf(URLDecoder.decode(params.get("total_fee")))/ 100;
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("HaiNanQuLeSDK.orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    vs.setReturnMsg("ERROR");
                    callback.onSuccess(vs);
                    return;
                }
                log.info("+++++++++HaiNanQuLeSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        URLDecoder.decode(params.get("out_trade_no")));
            } catch (Exception e) {
                log.error("HaiNanQuLeSDK.orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("ERROR");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("OK");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("ERROR");
            callback.onSuccess(vs);
            log.error("HaiNanQuLeSDK.orderCallBack 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
        SDKVerifyResult sdkVerifyResult = new SDKVerifyResult();
        try {
            StringBuffer sf = new StringBuffer();
            sf.append(sdkChannel.getVkey()).      //渠道分配 游戏ID
                    append(order.getOrderNumber()).     //游戏方订单号
                    append(order.getSdkUserId()).       //用户ID
                    append(order.getMoney().intValue()).    //金额 元
                    append(order.getOrderNumber()).     //随机数，传订单号
                    append(channelGame.getPayKey());    //渠道分配 KEY
            log.info("HaiNanQuLeSDK-getOrderNo:加密参数：" + sf.toString());
            String sign = SignUtil.md5(sf.toString()).toUpperCase(); //签名大写
            log.info("HaiNanQuLeSDK-getOrderNo:签名结果：" + sign);
            sdkVerifyResult.setExtension(sign);
            callback.onSuccess(sdkVerifyResult);
        } catch (Exception e) {
            log.info(e.getMessage());
        }

    }

}
