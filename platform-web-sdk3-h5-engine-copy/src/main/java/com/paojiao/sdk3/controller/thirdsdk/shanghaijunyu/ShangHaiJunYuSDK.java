package com.paojiao.sdk3.controller.thirdsdk.shanghaijunyu;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
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
import java.util.*;

/**
 * 类描述：上海君娱SDK
 *
 * @Author: jiangkun
 * @Date: 2020/4/26 10:21
 */
public class ShangHaiJunYuSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(ShangHaiJunYuSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("ShangHaiJunYuSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("ShangHaiJunYuSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "ShangHaiJunYuSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String uid = json.getString("uid");
            final String time = json.getString("time");
            final String supportShare = json.getString("support_share");
            final String supportFollow = json.getString("support_follow");
            final String follow = json.getString("follow");
             String age = json.getString("age");
            final String ext = json.getString("ext");

            final String sign = json.getString("sign");
            if (StringUtils.isEmpty(uid)) {
                log.info("ShangHaiJunYuSDK uid为空");
                callback.onFailed(" ShangHaiJunYuSDK: verify failed：uid为空");
                return;
            }
            if (StringUtils.isEmpty(time)) {
                log.info("ShangHaiJunYuSDK time为空");
                callback.onFailed(" ShangHaiJunYuSDK: verify failed：time为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("ShangHaiJunYuSDK sign为空");
                callback.onFailed(" ShangHaiJunYuSDK: verify failed：sign为空");
                return;
            }
            if (age.equals("0")){
                age ="0";
            }
            //把前端获取到的参数按照渠道加密规则进行加密对比
            StringBuffer sf = new StringBuffer();
            sf.append("uid=").append(uid+"&").
                    append("appid=").append(channelGame.getSignKey()+"&").
                    append("time=").append(time+"&").
                    append("appkey=").append(channelGame.getPayKey());

            log.info("ShangHaiJunYuSDK sign 加密参数 " + sf.toString());
           if(!SignUtil.isSignOK(sf.toString(), sign)){
               callback.onFailed(sdkChannel.getSdkCode()
                       + " verify failed. the two signatures are inconsistent ");
               return;
            }else{
               log.info("ShangHaiJunYuSDK 验证sign成功");
               callback.onSuccess(new SDKVerifyResult(true, uid,null, null,age));
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
        log.info("ShangHaiJunYuSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

           // PjThirdSdkChannel channel =channelService.findChannelById(channelGame.getSdkChannelId());
            String sign = params.get("sign");
            try {

                StringBuffer sf = new StringBuffer();
                sf.append("uid=").append(params.get("uid")).append("&")
                .append("appid=").append(channelGame.getSignKey()).append("&")
                .append("money=").append(params.get("money")).append("&")
                .append("orderid=").append(params.get("orderid")).append("&")
                .append("ext=").append(params.get("ext")).append("&")
                .append("time=").append(params.get("time")).append("&")
                .append("appkey=").append( channelGame.getPayKey());

                //String md5before =  SignUtil.sortParam3(params);
                log.info("ShangHaiJunYuSDK orderCallBack encryption params:" + sf.toString());
                if (StrKit.isBlank(sign) || !SignUtil.isSignOK(sf.toString(), sign)) {
                    log.error("ShangHaiJunYuSDK Invalid sign original string:" + sf.toString() + " your sign:" + sign);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                String cporder = params.get("cpOrderId");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("ShangHaiJunYuSDK ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("ShangHaiJunYuSDK 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("success");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("money"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("ShangHaiJunYuSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    iod.setMoney(amount.floatValue());
                    orderService.updateOrder(iod);
                }
                log.info("+++++++++Moxia，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("orderid"));

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
            log.error("ShangHaiJunYuSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {

    }


    public static void main(String [] args){
        Map<String, String> params = new HashMap<>();
        params.put("uid", "6897968");
        params.put("appid", "682");
        params.put("time","1589008411");
        params.put("appkey", "RP8p4WK4L7OQo9n1Rj7df");
        String str = SignUtil2.mapToUrlNotEncode2(params);
        String sgin = "168bafa41903ed4b38633050b6100502";
        String newSign =  SignUtil2.md5(str);
        System.out.println("sign    --------------sgin    "+sgin);
        System.out.println("newSign    -----------sgin    "+newSign);
    }
}
