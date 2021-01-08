package com.paojiao.sdk3.controller.thirdsdk.qutoutiao;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.EncryptUtils;
import com.paojiao.sdk3.common.util.HttpUrlUtil;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.*;

import com.paojiao.sdk3.controller.thirdsdk.quick.QuickSDKUtil;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkChannelGameService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author jiangkun
 * @Description:QuTouTiao（趣头条SDK）
 * @date 2020年5月22日
 */
public class QuTouTiaoSDK implements ItfSdk {

    private static final Logger log = Logger.getLogger(QuTouTiaoSDK.class);

    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);

    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);


    /**
     * SDK用户登录验证接口
     */
    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken,
                       ISDKVerifyListener callback) {
        log.info("QuTouTiaoSDK verify客户端返回sdkToken: " + sdkToken);
        if (StringUtils.isBlank(sdkToken)) {
            log.info("QuTouTiaoSDK-客户端登录返回为空");
            callback.onFailed("QuTouTiaoSDK verify failed. " + "QuTouTiaoSDK客户端登录返回为空");
            return;
        }
        try {
            JSONObject obj = JSONObject.parseObject(sdkToken);
            final String appId = obj.getString("app_id");
            if (StringUtils.isBlank(appId)) {
                log.info("QuickSD-verify: app_id is null");
                callback.onFailed("QuTouTiaoSDK-verify: app_id is null.");
                return;
            }
            final String platform = obj.getString("platform");
            if (StringUtils.isBlank(platform)) {
                log.info("QuTouTiaoSDK-verify: platform is null");
                callback.onFailed("QuTouTiaoSDK-verify: platform is null.");
                return;
            }
            final String ticket = obj.getString("ticket");
            if (StringUtils.isBlank(ticket)) {
                log.info("QuTouTiaoSDK-verify: ticket null");
                callback.onFailed("QuTouTiaoSDK-verify: ticket is null.");
                return;
            }
            final String time = obj.getString("time");
            if (StringUtils.isBlank(time)) {
                log.info("QuTouTiaoSDK-verify: time null");
                callback.onFailed("QuTouTiaoSDK-verify: time is null.");
                return;
            }
            final String sign = obj.getString("sign");
            if (StringUtils.isBlank(sign)) {
                log.info("QuTouTiaoSDK-verify: sign null");
                callback.onFailed("QuTouTiaoSDK-verify: sign is null.");
                return;
            }

            /*StringBuilder sb = new StringBuilder();
            sb.append("app_id").append(appId).
                    append("app_key").append(channelGame.getSdkAppKey()).
                    append("platform").append(platform).
                    append("ticket").append(ticket).
                    append("time").append(time);*/
            Map<String,String> Value = new HashMap<>();
            Value.put("app_id",appId);
            Value.put("app_key",channelGame.getSdkAppKey());
            Value.put("platform",platform);
            Value.put("ticket",ticket);
            Value.put("time",time);
            log.info("QuTouTiaoSDK:MD5加密前:" + Value.toString());
            String newSign =  QuTouTiaoSign.sign(Value);
            log.info("QuTouTiaoSDK:MD5加密后:" + newSign);

            Map<String, String> params = new HashMap<String, String>();
            params.put("app_id", appId);
            params.put("platform", platform);
            params.put("ticket", ticket);
            params.put("time", time);
            params.put("sign", newSign);
            String url = sdkChannel.getAuthUrl();
            //验证登录
            HttpAgent.getInstance().get(url, params, new HttpFutureCallback() {
                @Override
                public void completed(String result) {

                    if (StringUtils.isBlank(result)) {
                        callback.onFailed("QuTouTiaoSDK-verify: result is null.");
                        return;
                    }
                    log.info("QuTouTiaoSDK-verify: result: " + result);//返回结果为json数据
                    JSONObject js = JSONObject.parseObject(result);
                    int code = js.getInteger("code");
                    JSONObject data = js.getJSONObject("data");
                    String openId = data.getString("open_id");
                    String nickName = data.getString("nickname");
                    if (code == 0) {
                        callback.onSuccess(new SDKVerifyResult(true, openId, nickName, null));
                        return;
                    }
                }

                @Override
                public void failed(String err) {
                    callback.onFailed(sdkChannel.getSdkCode() + " verify failed. " + err);
                }

            });
        } catch (Exception e) {
            log.error("QuTouTiaoSDK-verify: verify error!", e);
        }

    }

    /**
     * SDK订单回调接口
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("QuTouTiaoSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            //PjThirdSdkChannel channel =channelService.findChannelById(channelGame.getSdkChannelId());
            try {
                String tradeNo = request.getParameter("trade_no");
                String openId = request.getParameter("open_id");
                String totalFee = request.getParameter("total_fee");
                String time = request.getParameter("time");
                String extJson = request.getParameter("ext");
                JSONObject json = JSONObject.parseObject(extJson);
                String ext = json.getString("ext");
                String sign = request.getParameter("sign");
                if (sign.isEmpty()) {
                    log.error("QuTouTiao orderCallBack ERROR: sign is Null");
                    vs.setReturnMsg("message!=\"ok\"");
                    callback.onSuccess(vs);
                    return;
                }
                if (openId.isEmpty()) {
                    log.error("QuTouTiao orderCallBack ERROR: openId is Null");
                    vs.setReturnMsg("message!=\"ok\"");
                    callback.onSuccess(vs);
                    return;
                }
                Map<String,String> Value = new HashMap<>();
                Value.put("app_id", channelGame.getSignKey());
                Value.put("app_key", channelGame.getPayKey());
                Value.put("open_id", openId);
                Value.put("trade_no", tradeNo);
                log.info("QuTouTiaoSDK orderCallBack::加密串为:" + Value.toString());
                String newSign =  QuTouTiaoSign.sign(Value);
                log.info("QuTouTiaoSDK orderCallBack::加密加密结果:" + newSign);

                Map<String, String> orderParams = new HashMap<String, String>();
                orderParams.put("trade_no", tradeNo.trim());
                orderParams.put("app_id", channelGame.getSignKey().trim());
                orderParams.put("open_id", openId.trim());
                orderParams.put("sign", newSign);

                log.info("QuTouTiaoSDK orderCallBack::充值结果查询请求参数:" + orderParams.toString());
                String resultJson = HttpAgent.getInstance().get(channelGame.getCpServerUrl(), orderParams);
                JSONObject jsonData = JSONObject.parseObject(resultJson);
                log.info("QuTouTiaoSDK orderCallBack::充值结果查询返回参数:" + jsonData.toString());
                if (jsonData.getInteger("code") != 0) {
                    log.info("QuTouTiaoSDK orderCallBack::充值结果查询code为：" + jsonData.getInteger("code"));
                    vs.setReturnMsg("message!=\"ok\"");
                    callback.onSuccess(vs);
                    return;
                }

                JSONObject data = jsonData.getJSONObject("data");
                Integer status = data.getInteger("status");
                log.info("QuTouTiaoSDK orderCallBack:status为:" + status);
                if (status != 1) {
                    log.info("QuTouTiaoSDK orderCallBack:充值结果查询状态为:" + status);
                    vs.setReturnMsg("message!=\"ok\"");
                    callback.onSuccess(vs);
                    return;
                }

                String cporder = ext;
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("QuTouTiaoSDK orderCallBack  ERROR:orer not found,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("message!=\"ok\"");
                    callback.onSuccess(vs);
                    return;
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("QuTouTiaoSDK orderCallBack  重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("{message=\"ok\"}");
                    callback.onSuccess(vs);
                    return;
                }
                // 真实收款
                Double money = Double.valueOf(Double.valueOf(totalFee) / 100);
                // 实际收款金额不一致
                if (iod.getMoney() != money.floatValue()) {
                    log.error("QuTouTiaoSDK orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + money);
                    // 更新订单金额
                    iod.setMoney(money.floatValue());
                    orderService.updateOrder(iod);
                }
                log.info("+++++++++Moxia，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        tradeNo);

            } catch (Exception e) {
                log.error("Moxia orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("message!=\"ok\"");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("{message=\"ok\"}");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("message!=\"ok\"");
            callback.onSuccess(vs);
            log.error("QuTouTiaoSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }

    }

    /**
     * 获取订单接口
     */
    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order,
                           PjMap<String, String> params, ISDKVerifyListener callback) {
        SDKVerifyResult result = new SDKVerifyResult();
        result.setExtension(order.getSdkUserId());
        callback.onSuccess(result);
    }

    public static void main(String[] args) {
        String aa = "app_ida3x8z92UnQqGapp_keyLyHrkdpNVSZjHCQldOtBqZ65iu1nBz3QIcYgDKZopsehdH7aM39dftvHcAlbuFfmd1d1vp1p1vt1t1vtime1550631186";
        String bb = "app_ida3W8uF7tqoiwapp_keyLfIWW7j0OXCAHj1PGtOHUy8ybslIPaDSplatformqtttickett11XqaQ9FVPupBEtuiXTVtime1590140634";
        String newSign = EncryptUtils.md5(aa);
        System.out.println(newSign);
        String totalFee = "600";
        Double money = Double.valueOf(Double.valueOf(totalFee) / 100);
        System.out.println("------------"+money);
    }
}
