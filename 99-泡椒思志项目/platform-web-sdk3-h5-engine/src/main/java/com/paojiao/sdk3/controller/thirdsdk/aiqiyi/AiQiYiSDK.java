package com.paojiao.sdk3.controller.thirdsdk.aiqiyi;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.HttpAgent;
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
import java.util.HashMap;
import java.util.Map;

/**
 * 类描述：爱奇艺 SDK
 *
 * @Author: jiangkun
 * @Date: 2020/07/07 10:00
 */
public class AiQiYiSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(AiQiYiSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("AiQiYiSDK-verify  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("AiQiYiSDK-verify 客户端登录返回为空");
                callback.onFailed("AiQiYiSDK-verify failed: " + " 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String userId = json.getString("user_id");
            final String agent = json.getString("agent");
            final String time = json.getString("time");
            final String sign = json.getString("sign");

            if (StringUtils.isEmpty(userId)) {
                log.info("AiQiYiSDK-verify userId为空");
                callback.onFailed("AiQiYiSDK-verify failed: userId为空");
                return;
            }
            if (StringUtils.isEmpty(agent)) {
                log.info("AiQiYiSDK-verify agent为空");
                callback.onFailed("AiQiYiSDK-verify failed: agent为空");
                return;
            }
            if (StringUtils.isEmpty(time)) {
                log.info("AiQiYiSDK-verify time为空");
                callback.onFailed("AiQiYiSDK-verify failed: time为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("AiQiYiSDK-verify sign为空");
                callback.onFailed("AiQiYiSDK-verify failed: sign为空");
                return;
            }
            StringBuffer sf = new StringBuffer();
            sf.append("user_id=").append(userId)
                    .append("&agent=").append(agent)
                    .append("&time=").append(time)
                    .append("&key=").append(channelGame.getSignKey());
            log.info("AiQiYiSDK-verify  参数加密前: " + sf.toString());
            String newSign = SignUtil.md5(sf.toString());
            log.info("AiQiYiSDK-verify  参数加密后: " + newSign);
            if (!sign.equals(newSign)) {
                log.error("AiQiYiSDK-verify ERROR:验证签名错误");
                callback.onFailed(sdkChannel.getSdkCode() + " AiQiYiSDK-verify failed：验证签名错误");
                return;
            } else {
                log.info("AiQiYiSDK 验证sign成功");
                callback.onSuccess(new SDKVerifyResult(true, userId, "", null, ""));
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
        log.info("AiQiYiSDK.orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));
            String sign = params.get("sign");
            try {
                params.remove("channelGameId");
                params.remove("ip");
                params.remove("ip2");
                params.remove("sign");
                String newSign = AiQiYiSign.sign(params,channelGame.getPayKey());
                log.info("AiQiYiSDK.orderCallBack 加密结果为：" + newSign);
                if (!sign.equals(newSign)) {
                    log.error("AiQiYiSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("{\"code\": 10002,\"msg\": \"签名错误\"}");
                    callback.onSuccess(vs);
                    return;
                }

                String cporder = params.get("extra_param");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("AiQiYiSDK.orderCallBack ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("AiQiYiSDK.orderCallBack 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("{\"code\": 10004,\"msg\": \"订单重复\"}");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("money")) / 100; //分转换成元
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("AiQiYiSDK.orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    vs.setReturnMsg("{\"code\": 10001,\"msg\": \"参数错误\"}");
                    callback.onSuccess(vs);
                    return;
                }

                log.info("+++++++++AiQiYiSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("order_id"));
            } catch (Exception e) {
                log.error("AiQiYiSDK.orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("{\"code\": 10006,\"msg\": \"其他错误\"}");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("{\"code\": 200,\"msg\": \"请求成功\"}");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("{\"code\": 10006,\"msg\": \"其他错误\"}");
            callback.onSuccess(vs);
            log.error("AiQiYiSDK.orderCallBack 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
    }

    public static void main(String[] args) {
        String secroyKey = "333ab5f65bc2b2829b5ad5ba1bb63a34";
        String params = "{\"server_order\":\"51\",\"ip\":\"106.38.213.88\",\"sign\":\"63a5d5cb3332d7a80e47a29a5ed6dd29\",\"version\":\"2.0\",\"channelGameId\":\"10970\",\"pay_time\":\"2020-07-08 15:47:53\",\"money\":\"1000\",\"user_id\":\"358417910735711\",\"role_id\":\"\",\"cp_order_id\":\"\",\"order_id\":\"2007081547013193201\",\"order_type\":\"ordinary\",\"extra_param\":\"H5_159419442928082\",\"ts\":\"1594194472\",\"game_id\":\"10309\"}";

        Map<String,String> map = new HashMap<>();
        map.put("server_order","51");
        map.put("version","2.0");
        map.put("pay_time","2020-07-08 15:47:53");
        map.put("money","1000");
        map.put("user_id","358417910735711");
        map.put("role_id","");
        map.put("cp_order_id","");
        map.put("order_id","2007081547013193201");
        map.put("order_type","ordinary");
        map.put("extra_param","H5_159419442928082");
        map.put("ts","1594194472");
        map.put("game_id","10309");
        map.put("sign","63a5d5cb3332d7a80e47a29a5ed6dd29");
        map.put("channelGameId","10970");
        map.put("ip","106.38.213.88");
        String resultParams =   HttpAgent.newInstance().post("http://h5.paojiao.cn/api/payCallBack/10970",map);
        //String sign =  AiQiYiSign.sign(map,secroyKey);
        log.info(resultParams);
    }
}
