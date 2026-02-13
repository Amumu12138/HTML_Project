package com.paojiao.sdk3.controller.thirdsdk.lequwang;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
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
import java.util.*;

/**
 * 类描述：趣乐网SDK
 *
 * @Author: jiangkun
 * @Date: 2020/4/26 10:21
 */
public class LeQuWangSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(LeQuWangSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("LeQuWangSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("LeQuWangSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "LeQuWangSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String gameId = json.getString("gameid");
            final String serverId = json.getString("serverid");
            final String uid = json.getString("uid");
            final String fcm = json.getString("fcm");
            final String time = json.getString("time");
            final String sign = json.getString("sign");
            if (StringUtils.isEmpty(gameId)) {
                log.info("LeQuWangSDK gameId为空");
                callback.onFailed(" verify failed：LeQuWangSDK:gameId为空");
                return;
            }
            if (StringUtils.isEmpty(uid)) {
                log.info("LeQuWangSDK uid为空");
                callback.onFailed(" verify failed：LeQuWangSDK:uid为空");
                return;
            }
            Map<String, String> params = new HashMap<>();
            params.put("gameid", gameId);
            params.put("serverid", serverId);
            params.put("uid", uid);
            params.put("platform", "lequ");
            params.put("fcm", fcm);
            params.put("time", time);
            log.info("LeQuWangSDK sign 加密参数 " + SignUtil2.sortParam2(params) + "&"+channelGame.getSdkAppKey());
            String signStr = SignUtil.sortParam2(params) + "&"+channelGame.getSdkAppKey();
           if(!SignUtil.isSignOK(signStr, sign)){
               callback.onFailed(sdkChannel.getSdkCode()
                       + " verify failed. the two signatures are inconsistent ");
               return;
            }else{
               log.info("LeQuWangSDK 验证sign成功");
               callback.onSuccess(new SDKVerifyResult(true, uid,null, null,fcm));
               return;
           }

        /*    Map<String, String> paramsStr = new HashMap<>();
            paramsStr.put("gameid", gameId);
            paramsStr.put("serverid", serverId);
            paramsStr.put("uid", uid);
            paramsStr.put("platform", "lequ");
            paramsStr.put("fcm", fcm);
            paramsStr.put("time", time);
            paramsStr.put("sign", signStr);
            String url = sdkChannel.getAuthUrl();
            HttpAgent.getInstance().get(url, paramsStr, new HttpFutureCallback() {
                @Override
                public void completed(String result) {
                    try {
                        PaoJiaoAuthInfo res = JSON.parseObject(result,
                                PaoJiaoAuthInfo.class);

                        if (res != null && res.getData() != null
                                && res.getCode() == 1) {
                            callback.onSuccess(new SDKVerifyResult(true, res.getData().getUid(),res.getData().getUserName(), res.getData().getNiceName(),res.getData().getRealNameAuthStatus()));
                            return;

                        }

                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    callback.onFailed(sdkChannel.getSdkCode()
                            + " verify failed. the post result is " + result);
                }

                @Override
                public void failed(String e) {
                    callback.onFailed(sdkChannel.getSdkCode()
                            + " verify failed. " + e);
                }

            });*/

        } catch (Exception e) {
            e.printStackTrace();
            callback.onFailed(sdkChannel.getSdkCode()
                    + " verify execute failed. the exception is "
                    + e.getMessage());
        }
    }
    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("LeQuWangSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            PjThirdSdkChannel channel =channelService.findChannelById(channelGame.getSdkChannelId());
            String sign = params.get("sign");
            try {
               // params.put("gamekey", channelGame.getSdkAppKey());
                String md5before = sortParam(params)+"&"+channelGame.getSdkAppKey();
                log.info("LeQuWangSDK orderCallBack encryption params:" + md5before);
                if (StrKit.isBlank(sign) || !SignUtil.isSignOK(md5before, sign)) {
                    log.error("Invalid sign\noriginal string:" + md5before + "\nyour sign:" + sign);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("ext");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("success");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("amount"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("LeQuWang收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    iod.setMoney(amount.floatValue());
                    orderService.updateOrder(iod);
                }
                log.info("+++++++++Moxia，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("order_id"));

            } catch (Exception e) {
                log.error("Moxia orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("fail");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("success");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("fail");
            callback.onSuccess(vs);
            log.error("LeQuWang充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {

    }

    /**
     * 对请求参数按照一定的规则排序，默认使用Collections.sort
     *
     * @param params
     *            请求中获取的键值
     * @return
     */
    private static String sortParam(Map<String, String> params) {
        // 去掉清源签名未用到的参数
        params.remove("channelGameId");
        params.remove("ip2");
        StringBuffer content = new StringBuffer();
        // 按照key做排序
        List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);
        for (int i = 0; i < keys.size(); i++) {
            String key = (String) keys.get(i);
            // sign参数不参与加密
            if ("sign".equals(key) || key.startsWith("ip")
                    || "channelGameId".equals(key)) {
                continue;
            }
            String value = (String) params.get(key);
            content.append("&").append(key).append("=").append(value);
        }

        return content.toString().substring(1);
    }
    public static void main(String [] args){
        String sign = "db9728c9d06cf363178f62806475b105";
        String key = "57bfd1ff6e436f1aca41b534dd751c62";
        Map<String, String> params = new HashMap<>();
        params.put("gameid", "856");
        params.put("serverid", "1");
        params.put("uid", "7362782");
        params.put("platform", "lequ");
        params.put("fcm", "1");
        params.put("time", "1587954407");
        //{"gameid":"856","serverid":"1","uid":"7362782","fcm":"1","time":"1587954407","sign":"db9728c9d06cf363178f62806475b105"}

        String signStr = SignUtil.md5(SignUtil2.sortParam2(params) +"&"+key);
        System.out.println("+++++++++signStr"+signStr);
        System.out.println("+++++++++sign"+sign);
    }
}
