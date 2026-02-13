package com.paojiao.sdk3.controller.thirdsdk.game360;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil;
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
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * 类描述：360游戏 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/06/09 10:57
 */
public class Game360SDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(Game360SDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("Game360SDK-verify  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("Game360SDK-verify 客户端登录返回为空");
                callback.onFailed("Game360SDK-verify failed: " + " 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String qid = json.getString("qid");
            final String serverId = json.getString("server_id");
            final String isAdult = json.getString("isAdult");
            final String time = json.getString("time");
            final String sign = json.getString("sign");

            if (StringUtils.isEmpty(qid)) {
                log.info("Game360SDK qid为空");
                callback.onFailed("Game360SDK-verify failed: qid为空");
                return;
            }
            if (StringUtils.isEmpty(time)) {
                log.info("Game360SDK time为空");
                callback.onFailed("Game360SDK-verify failed: time为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("Game360SDK sign为空");
                callback.onFailed("Game360SDK-verify failed: sign为空");
                return;
            }
            StringBuffer sf = new StringBuffer();
            sf.append("qid=").append(qid).append("&")
                    .append("time=").append(time).append("&")
                    .append("server_id=").append(serverId)
                    .append(channelGame.getSignKey());
            log.info("Game360SDK-verify  参数加密前: " + sf.toString());
            String newSign = SignUtil.md5(sf.toString());
            log.info("Game360SDK-verify  参数加密后: " + newSign);
            if (!sign.equals(newSign)) {
                callback.onFailed(sdkChannel.getSdkCode() + " Game360SDK-verify failed：验证签名错误");
                return;
            } else {
                log.info("Game360SDK 验证sign成功");
                callback.onSuccess(new SDKVerifyResult(true, qid, "", null, ""));
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
        log.info("Game360SDK.orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            String sign = params.get("sign");
            //解密获取下单时加密传入的exts参数
            String exts = params.get("exts");
            byte[] extsParams = Base64.decodeBase64(exts);
            String extsStr = new String(extsParams);
            log.info("Game360SDK.orderCallBack exts解密参数：" + extsStr);
            JSONObject jsonObject = JSONObject.parseObject(extsStr);
            //获取订单号 我方订单号
            String cpOrderId = jsonObject.getString("item_id");
            try {
                StringBuffer sf = new StringBuffer();
                sf.append(params.get("qid"))
                        .append(params.get("order_amount"))
                        .append(params.get("order_id"))
                        .append(params.get("server_id"))
                        .append(exts)
                        .append(channelGame.getPayKey());
                log.info("Game360SDK.orderCallBack 加密前参数：" + sf.toString());
                String newSign = SignUtil.md5(sf.toString());
                log.info("Game360SDK.orderCallBack 加密结果为：" + newSign);
                if (!sign.equals(newSign)) {
                    log.error("Game360SDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("0");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = cpOrderId;
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("Game360SDK.orderCallBack ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("Game360SDK.orderCallBack 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("2");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("order_amount"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("Game360SDK.orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    vs.setReturnMsg("0");
                    callback.onSuccess(vs);
                    return;
                }
                log.info("+++++++++Game360SDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("order_id"));

            } catch (Exception e) {
                log.error("Game360SDK.orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("0");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("1");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("0");
            callback.onSuccess(vs);
            log.error("Game360SDK.orderCallBack 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
        int idx = order.getMoney().toString().lastIndexOf(".");//查找小数点的位置
        String money = order.getMoney().toString().substring(0,idx);//截取从字符串开始到小数点位置的字符串，就是整数部分

        String signStr = order.getOrderNumber() + money + params.get("sdkUserId");
        log.error("Game360SDK.getOrderNo sign加密前参数:" + signStr);
        String sign = SignUtil.md5(signStr);
        log.error("Game360SDK.getOrderNo sign加密结果:" + sign);

        Map<String,Object> map = new HashMap<>();
        map.put("item_id",order.getOrderNumber());
        map.put("amount",money);
        map.put("sign",sign);
        JSONObject jsonObj=new JSONObject(map);
        log.error("Game360SDK.getOrderNo exts加密参数:" + jsonObj.toString());
        String resultPara = Base64.encodeBase64String(jsonObj.toString().getBytes());
        log.error("Game360SDK.getOrderNo exts加密结果:" + resultPara);
        SDKVerifyResult result = new SDKVerifyResult();
        result.setExtension(resultPara);
        callback.onSuccess(result);
    }

    public static void main(String[] args) {
        Map<String,Object> map = new HashMap<>();
        map.put("item_id","H5_15919343244602870");
        map.put("amount","10");
        map.put("sign","64a9ba8c536558d9480a365c217650b0");
        JSONObject jsonObj=new JSONObject(map);
        System.out.println(jsonObj.toString());
        byte [] dd =  java.util.Base64.getEncoder().encode(jsonObj.toString().getBytes());
        byte [] bb= java.util.Base64.getDecoder().decode(dd);
    }
}
