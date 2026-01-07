package com.paojiao.sdk3.controller.thirdsdk.foffwan;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
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

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;

/**
 * 类描述：5144玩SDK
 *
 * @Author: jiangkun
 * @Date: 2020/6/2 10:21
 */
public class FoffWanSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(FoffWanSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("FoffWanSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("FoffWanSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "FoffWanSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String uid = json.getString("uid");
            final String uname = json.getString("uname");
            final String gid = json.getString("gid");
            final String sid = json.getString("sid");
            final String time = json.getString("time");
            final String sign = json.getString("sign");

            if (StringUtils.isEmpty(uid)) {
                log.info("FoffWanSDK uid为空");
                callback.onFailed(" verify failed：FoffWanSDK:appId为空");
                return;
            }
            if (StringUtils.isEmpty(time)) {
                log.info("FoffWanSDK time为空");
                callback.onFailed(" verify failed：FoffWanSDK:time为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("FoffWanSDK sign为空");
                callback.onFailed(" verify failed：FoffWanSDK:sign为空");
                return;
            }


            StringBuffer sf = new StringBuffer();
            sf.append(channelGame.getCpUserName()).append("#")
                    .append(gid).append("#")
                    .append(sid).append("#")
                    .append(uid).append("#")
                    .append(channelGame.getSignKey()).append("#")
                    .append(time);
            log.info("FoffWanSDK  参数加密前: " + sf.toString());
            String newSign = SignUtil.md5(sf.toString());
            log.info("FoffWanSDK  参数加密后: " + newSign);
            if (!sign.equals(newSign)) {
                callback.onFailed(sdkChannel.getSdkCode() + " FoffWanSDK verify failed：验证签名错误");
                return;
            } else {
                log.info("FoffWanSDK 验证sign成功");
                callback.onSuccess(new SDKVerifyResult(true, uid, uname, null, ""));
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
        log.info("FoffWanSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            String sign = params.get("sign");

            try {
                StringBuffer sf = new StringBuffer();
                sf.append(channelGame.getCpUserName()).append("#")
                        .append(params.get("gid")).append("#")
                        .append(params.get("sid")).append("#")
                        .append(params.get("uid")).append("#")
                        .append(params.get("time")).append("#")
                        .append(params.get("orderid")).append("#")
                        .append(params.get("money")).append("#")
                        .append(channelGame.getPayKey());
                log.info("FoffWanSDK.orderCallBack 加密前参数："+sf.toString());
                String newSign = SignUtil.md5(sf.toString());
                log.info("FoffWanSDK.orderCallBack 加密结果为："+newSign);
                if (!sign.equals(newSign)){
                    log.error("FoffWanSDK ERROR Invalid sign original string:" + newSign + " your sign:" + sign);
                    vs.setReturnMsg("{\"code\":5,\"msg\" :\"\\u7b7e\\u540d\\u9519\\u8bef\"}");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("other");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("{\"code\":11,\"msg\" :\"\\u8ba2\\u5355\\u91cd\\u590d\"}");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("money"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("FoffWanSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    //iod.setMoney(amount.floatValue());
                    //orderService.updateOrder(iod);
                    vs.setReturnMsg("{\"code\":15,\"msg\" :\"\\u5145\\u503c\\u91d1\\u989d\\u9519\\u8bef\"}");
                    callback.onSuccess(vs);
                    return;
                }
                log.info("+++++++++FoffWanSDK，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("orderid"));

            } catch (Exception e) {
                log.error("FoffWanSDK orderCallBack error:" + e.getMessage());
                vs.setReturnMsg("{\"code\":18,\"msg\" :\"\\u5176\\u4ed6\\u9519\\u8bef\"}");
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg("{\"code\":1,\"msg\" :\"\\u6210\\u529f\"}");
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg("{\"code\":18,\"msg\" :\"\\u5176\\u4ed6\\u9519\\u8bef\"}");
            callback.onSuccess(vs);
            log.error("FoffWanSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
    }

    public static void main(String[] args) {
      System.out.println(SignUtil.md5("1001#1002#1#xinyoukeji#1506515930#xy0021558455#1#xykjpay"));
    }
}
