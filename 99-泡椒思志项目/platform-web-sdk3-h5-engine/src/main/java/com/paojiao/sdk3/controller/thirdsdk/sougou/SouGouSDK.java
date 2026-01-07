package com.paojiao.sdk3.controller.thirdsdk.sougou;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.DateUtil;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil2;
import com.paojiao.sdk3.controller.pay.PayStatus;
import com.paojiao.sdk3.controller.thirdsdk.*;
import com.paojiao.sdk3.controller.thirdsdk.tudou.TuDouSign;
import com.paojiao.sdk3.model.PjCpGame;
import com.paojiao.sdk3.model.PjThirdSdkChannel;
import com.paojiao.sdk3.model.PjThirdSdkChannelGame;
import com.paojiao.sdk3.model.PjThirdSdkOrder;
import com.paojiao.sdk3.service.PjThirdSdkChannelGameService;
import com.paojiao.sdk3.service.PjThirdSdkOrderService;
import org.apache.commons.lang.StringUtils;
import org.apache.http.client.utils.DateUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * @author jiangkun
 * @Description:TDH5（搜狗SDK）
 * @date 2020年09月04日
 */
public class SouGouSDK implements ItfSdk {

    private static final Logger log = Logger.getLogger(SouGouSDK.class);

    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);

    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);


    /**
     * SDK用户登录验证接口
     */
    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken,
                       ISDKVerifyListener callback) {
        log.info("SouGouSDK verify客户端返回sdkToken: " + sdkToken);
        if (StringUtils.isBlank(sdkToken)) {
            log.info("SouGouSDK-客户端登录返回为空");
            callback.onFailed("SouGouSDK verify failed. " + "SouGouSDK客户端登录返回为空");
            return;
        }
        try {
            JSONObject obj = JSONObject.parseObject(sdkToken);
            final String uid = obj.getString("uid");
            final String platform = obj.getString("platform");
            final String gid = obj.getString("gid");
            final String sid = obj.getString("sid");
            final String guest = obj.getString("guest");
            final String mobile = obj.getString("mobile");
            final String adult = obj.getString("adult");
            final String client = obj.getString("client");
            final String time = obj.getString("time");
            final String auth = obj.getString("auth");
            if (StringUtils.isBlank(uid)) {
                log.info("QuickSD-verify: uid is null");
                callback.onFailed("SouGouSDK-verify: uid is null.");
                return;
            }
            if (StringUtils.isBlank(auth)) {
                log.info("SouGouSDK-verify: auth is null");
                callback.onFailed("SouGouSDK-verify: auth is null.");
                return;
            }
            if (StringUtils.isBlank(time)) {
                log.info("SouGouSDK-verify: time is null");
                callback.onFailed("SouGouSDK-verify: time is null.");
                return;
            }
            //加密参数
            HashMap<String, String> params = new HashMap<>();
            params.put("platform", platform);
            params.put("uid", uid);
            params.put("gid", gid);
            params.put("sid", sid);
            params.put("guest", guest);
            params.put("mobile", mobile);
            params.put("adult", adult);
            params.put("client", client);
            params.put("time", time);
            String signStr = SignUtil2.sortParam2(params) + "&" + channelGame.getPayKey();
            log.info("SouGouSDK-verify:签名参数：" + signStr);
            String sign = SignUtil2.md5(signStr);
            log.info("SouGouSDK-verify:签名结果：" + sign);
            if (auth.equals(sign)) {
                callback.onSuccess(new SDKVerifyResult(true, uid, "", null));
                return;
            } else {
                callback.onFailed(sdkChannel.getSdkCode() + " verify failed,登录验证签名失败");
                return;
            }
        } catch (Exception e) {
            log.error("SouGouSDK-verify: verify error!", e);
        }

    }

    /**
     * SDK订单回调接口
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("SouGouSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));
            String sign = params.get("auth");
            try {
                //参数
                HashMap<String, String> callbackParams = new HashMap<>();
                callbackParams.put("platform", params.get("platform"));
                callbackParams.put("oid", params.get("oid"));    //充值订单号，由搜狗游戏平台生成
                callbackParams.put("uid", params.get("uid"));
                callbackParams.put("gid", params.get("gid"));
                callbackParams.put("sid", params.get("sid"));
                callbackParams.put("money", params.get("money"));       //充值金额(单位:人民币 分)
                callbackParams.put("coin", params.get("coin"));
                callbackParams.put("product", URLEncoder.encode(params.get("product")));       //
                callbackParams.put("extra", params.get("extra"));
                callbackParams.put("time", params.get("time"));
                String signStr = SignUtil2.sortParam2(callbackParams) + "&" + channelGame.getPayKey();
                log.info("SouGouSDK orderCallBack-----支付回调加密参数:" + signStr);
                String newSign = SignUtil2.md5(signStr);
                log.info("SouGouSDK orderCallBack-----支付回调加密结果:" + newSign);
                if (!sign.equals(newSign)) {
                    log.error("SouGouSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("{\"code\":200,\"msg\": \"参数签名错误\",\"data\":{}}");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("extra");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("SouGouSDK orderCallBack  ERROR:orer not found,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("{\"code\":100,\"msg\": \"参数格式错误\",\"data\":{}}");
                    callback.onSuccess(vs);
                    return;
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("SouGouSDK orderCallBack  重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("{\"code\":399,\"msg\": \"充值已经成功\",\"data\":{}}");
                    callback.onSuccess(vs);
                    return;
                }
                // 真实收款
                Double money = Double.valueOf(params.get("money"))/ 100;
                // 实际收款金额不一致
                if (iod.getMoney() != money.floatValue()) {
                    log.error("SouGouSDK orderCallBack 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + money);
                    vs.setReturnMsg("{\"code\":500,\"msg\": \"金额不符\",\"data\":{}}");
                    callback.onSuccess(vs);
                    return;
                }
                log.info("+++++++++SouGouSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder, params.get("oid"));

            } catch (Exception e) {
                log.error("SouGouSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("{\"code\":500,\"msg\": \"其他错误\",\"data\":{}}");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("{\"code\":0,\"msg\": \"成功\",\"data\":{}}");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("{\"code\":500,\"msg\": \"其他错误\",\"data\":{}}");
            callback.onSuccess(vs);
            log.error("SouGouSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
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
        String time= DateUtil.timeStamp();
        result.setExtension(time);
        callback.onSuccess(result);
    }
}
