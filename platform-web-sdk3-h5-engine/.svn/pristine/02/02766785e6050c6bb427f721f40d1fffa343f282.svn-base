package com.paojiao.sdk3.controller.thirdsdk.tudou;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.EncryptUtils;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.*;
import com.paojiao.sdk3.controller.thirdsdk.qutoutiao.QuTouTiaoSign;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkChannelGameService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @author jiangkun
 * @Description:TDH5（土豆SDK）
 * @date 2020年6月17日
 */
public class TuDouSDK implements ItfSdk {

    private static final Logger log = Logger.getLogger(TuDouSDK.class);

    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);

    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);


    /**
     * SDK用户登录验证接口
     */
    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken,
                       ISDKVerifyListener callback) {
        log.info("TuDouSDK verify客户端返回sdkToken: " + sdkToken);
        if (StringUtils.isBlank(sdkToken)) {
            log.info("TuDouSDK-客户端登录返回为空");
            callback.onFailed("TuDouSDK verify failed. " + "TuDouSDK客户端登录返回为空");
            return;
        }
        try {
            JSONObject obj = JSONObject.parseObject(sdkToken);
            final String userId = obj.getString("userId");
            if (StringUtils.isBlank(userId)) {
                log.info("QuickSD-verify: userId is null");
                callback.onFailed("TuDouSDK-verify: userId is null.");
                return;
            }
            final String token = obj.getString("token");
            if (StringUtils.isBlank(token)) {
                log.info("TuDouSDK-verify: token is null");
                callback.onFailed("TuDouSDK-verify: token is null.");
                return;
            }
            //加密参数
            HashMap<String, String> params = new HashMap<>();
            params.put("userID", userId);
            params.put("token", token);
            String newSign = TuDouSign.signEncode(params, channelGame.getPayKey());
            //加密的结果
            log.info("TuDouSDK:MD5加密后:" + newSign);
            //请求土豆需要的参数
            Map<String, String> requestParams = new HashMap<String, String>();
            requestParams.put("userID", userId);
            requestParams.put("token", token);
            requestParams.put("sign", newSign);
            String url = sdkChannel.getAuthUrl();
            log.info("TuDouSDK-verify:请求地址："+url+",请求参数: " + requestParams.toString());
            //验证登录
            HttpAgent.getInstance().post(url, requestParams, new HttpFutureCallback() {
                @Override
                public void completed(String result) {
                    //返回结果为json数据
                    log.info("TuDouSDK-verify: result: " + result);
                    if (StringUtils.isBlank(result)) {
                        callback.onFailed("TuDouSDK-verify: result is null.");
                        return;
                    }
                    JSONObject js = JSONObject.parseObject(result);
                    int code = js.getInteger("code");
                    JSONObject data = js.getJSONObject("data");
                    String userId = data.getString("userID");
                    if (code == 200) {
                        callback.onSuccess(new SDKVerifyResult(true, userId, "", null));
                        return;
                    }
                }

                @Override
                public void failed(String err) {
                    callback.onFailed(sdkChannel.getSdkCode() + " verify failed. " + err);
                }

            });
        } catch (Exception e) {
            log.error("TuDouSDK-verify: verify error!", e);
        }

    }

    /**
     * SDK订单回调接口
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("TuDouSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));
            String sign = params.get("sign");
            try {
                //参数
                HashMap<String, String> callbackParams = new HashMap<>();
                callbackParams.put("appKey", params.get("appKey"));
                callbackParams.put("userID", params.get("userID"));
                callbackParams.put("appID", params.get("appID"));
                callbackParams.put("channelID", params.get("channelID"));
                callbackParams.put("cpOrderNo", params.get("cpOrderNo"));
                callbackParams.put("orderNo", params.get("orderNo"));
                callbackParams.put("money", params.get("money"));
                callbackParams.put("productID", params.get("productID"));
                callbackParams.put("productName", params.get("productName"));
                callbackParams.put("roleID", params.get("roleID"));
                callbackParams.put("roleName", params.get("roleName"));
                callbackParams.put("serverID", params.get("serverID"));
                callbackParams.put("serverName", params.get("serverName"));
                callbackParams.put("extension", params.get("extension"));
                callbackParams.put("sign", sign);

                String newSign = TuDouSign.signEncode(callbackParams, channelGame.getPayKey());
                log.info("TuDouSDK orderCallBack-----加密结果:" + newSign);
                if (!sign.equals(newSign)) {
                    log.error("TuDouSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("cpOrderNo");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("TuDouSDK orderCallBack  ERROR:orer not found,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("TuDouSDK orderCallBack  重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("success");
                    callback.onSuccess(vs);
                    return;
                }
                // 真实收款
                Double money = Double.valueOf(params.get("money"));
                // 实际收款金额不一致
                if (iod.getMoney() != money.floatValue()) {
                    log.error("TuDouSDK orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + money);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                log.info("+++++++++TuDouSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("orderNo"));

            } catch (Exception e) {
                log.error("TuDouSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("fail");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("success");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("fail");
            callback.onSuccess(vs);
            log.error("TuDouSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }

    }

    /**
     * 获取订单接口
     */
    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order,
                           PjMap<String, String> params, ISDKVerifyListener callback) {
    }

    public static void main(String[] args) {
       /* String aa = "{\"userId\":2,\"status\":true,\"token\":\"d3234fe0aa5edc4fd1aa4d01477f4cc0\"}";
        StringBuffer sf = new StringBuffer();
        //sf.append();
        String signStr = " 10c2c2cfef7c3466ef7fcf031e183b1etokend3234fe0aa5edc4fd1aa4d01477f4cc0userID210c2c2cfef7c3466ef7fcf031e183b1e";
        log.info(SignUtil.md5(signStr).toUpperCase());*/
        //验证登录
        //加密参数
        for (int i = 0; i < 20; i++) {
       String  userID = "2";
       String  token = "b6955d5a2bffa5ea1db9434a8567c69b";
        HashMap<String, String> params = new HashMap<>();
        params.put("userID", userID);
        params.put("token", token);
        String newSign = TuDouSign.signEncode(params, "7ee67978e03e67a8d6e3f75453b733e7");
        //加密的结果
        log.info("TuDouSDK:MD5加密后:" + newSign);
        //请求土豆需要的参数
        Map<String, String> requestParams = new HashMap<String, String>();
        requestParams.put("userID", userID);
        requestParams.put("token", token);
        requestParams.put("sign", newSign);
        String url = "https://api-rh.8688games.com/user/verify";
        log.info("TuDouSDK-verify: result: " + requestParams.toString());
        HttpAgent.getInstance().post(url, requestParams, new HttpFutureCallback() {
            @Override
            public void completed(String result) {
                if (StringUtils.isBlank(result)) {
                    return;
                }
                //返回结果为json数据
                log.info("TuDouSDK-verify: result: " + result);
            }
            @Override
            public void failed(String err) {
            }
        });

        }
    }
}
