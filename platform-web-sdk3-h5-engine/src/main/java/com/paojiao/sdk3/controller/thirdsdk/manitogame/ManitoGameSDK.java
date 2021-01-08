package com.paojiao.sdk3.controller.thirdsdk.manitogame;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.util.EncryptUtils;
import com.paojiao.sdk3.common.util.PjMap;
import com.paojiao.sdk3.common.util.SignUtil;
import com.paojiao.sdk3.common.util.SignUtil2;
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
 * @author tqy
 * @Description:大神游戏SDK（海南奥科）
 * @date 2020年5月7日
 */
public class ManitoGameSDK implements ItfSdk {

    private static final Logger log = Logger.getLogger(ManitoGameSDK.class);

    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);

    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);


    /**
     * SDK用户登录验证接口
     */
    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken,
                       ISDKVerifyListener callback) {
        log.info("ManitoGameSDK verify客户端返回sdkToken: " + sdkToken);
        if (StringUtils.isBlank(sdkToken)) {
            log.info("ManitoGameSDK-客户端登录返回为空");
            callback.onFailed("ManitoGameSDK verify failed. " + "ManitoGameSDK客户端登录返回为空");
            return;
        }
        try {
            JSONObject obj = JSONObject.parseObject(sdkToken);
            if (StringUtils.isBlank(obj.getString("token"))) {
                log.info("QuickSD-verify: token is null");
                callback.onFailed("ManitoGameSDK-verify: token is null.");
                return;
            }
            Map<String, String> params = new HashMap<>();
            //获取渠道传入的token
            String token = obj.getString("token");
            params.put("token", token);
            String url = sdkChannel.getAuthUrl();
            //验证登录
            HttpAgent.getInstance().get(url, params, new HttpFutureCallback() {
                @Override
                public void completed(String result) {
                    if (StringUtils.isBlank(result)) {
                        callback.onFailed("ManitoGameSDK-verify: result is null.");
                        return;
                    }
                    log.info("ManitoGameSDK-verify: result: " + result);//返回结果为json数据
                    JSONObject js = JSONObject.parseObject(result);
                    String uid = js.getJSONObject("data").getString("uid");
                    String code = js.getString("code");
                    if (null != code && code.equals("0")) {
                        callback.onSuccess(new SDKVerifyResult(true, uid, null, null));
                        return;
                    }
                }

                @Override
                public void failed(String err) {
                    callback.onFailed(sdkChannel.getSdkCode() + " verify failed. " + err);
                }

            });
        } catch (Exception e) {
            log.error("ManitoGameSDK-verify: verify error!", e);
        }

    }

    /**
     * SDK订单回调接口
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("ManitoGameSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            String sign = params.get("sign");
            try {
                StringBuffer sf = new StringBuffer();
                sf.append(params.get("order_no")).append("+")
                        .append(params.get("cp_order")).append("+")
                        .append(params.get("user_id")).append("+")
                        .append(params.get("product_id")).append("+")
                        .append(params.get("price")).append("+")
                        .append(params.get("role_id")).append("+")
                        .append(params.get("server_id")).append("+")
                        .append(params.get("ext")).append("+")
                        .append(params.get("time")).append("+")
                        .append(channelGame.getPayKey());
                log.info("ManitoGameSDK orderCallBack 待加密参数:" + sf.toString());
                String newSign = SignUtil.md5(sf.toString());
                log.info("ManitoGameSDK orderCallBack 加密结果为:" + newSign);
                if (!sign.equals(newSign)) {
                    log.error("ManitoGameSDK ERROR: Invalid sign  original string:" + newSign + "  your sign:" + sign);
                    vs.setReturnMsg("-1");
                    callback.onSuccess(vs);
                    return;
                }
                //我方订单号字段
                String cporder = params.get("cp_order");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ManitoGameSDK ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("ManitoGameSDK 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("0");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("price"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("ManitoGameSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
					vs.setReturnMsg("-1");
					callback.onSuccess(vs);
					return;
                }
                log.info("+++++++++ManitoGameSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("order_no"));

            } catch (Exception e) {
                log.error("ManitoGameSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("-1");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("0");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("-1");
            callback.onSuccess(vs);
            log.error("ManitoGameSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
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
        String aa= "20200616142858625963+H5_15922889378566417+184326+1001+10.00+141837503301243+30+H5_15922889378566417+1592288971+3e3ecf7d6fbbbf9012025fa9d0302649559ec932";
        String bb = "{\"order_no\":\"20200616142858625963\",\"cp_order\":\"H5_15922889378566417\",\"ext\":\"H5_15922889378566417\",\"user_id\":\"184326\",\"role_id\":\"141837503301243\",\"price\":\"10.00\",\"product_id\":\"1001\",\"ip\":\"120.77.99.166\",\"sign\":\"9332a98812ac2a4247f1efcfc2fbee80\",\"time\":\"1592288971\",\"server_id\":\"30\",\"channelGameId\":\"10935\"}\n";
        log.info(SignUtil2.md5(aa));
    }

}
