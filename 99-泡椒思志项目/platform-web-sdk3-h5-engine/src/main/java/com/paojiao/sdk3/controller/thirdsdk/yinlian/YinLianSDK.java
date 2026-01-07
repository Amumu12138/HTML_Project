package com.paojiao.sdk3.controller.thirdsdk.yinlian;

import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.util.DateUtil;
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
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 类描述：银联SDK
 *
 * @Author: jiangkun
 * @Date: 2020/6/1 10:37
 */
public class YinLianSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(YinLianSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
    	return;
    }
    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("YinLianSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            PjThirdSdkChannel channel =channelService.findChannelById(channelGame.getSdkChannelId());
            String sign = params.get("sign");
            try {
                String md5before = SignUtil.sortParam3(params)+"&"+channelGame.getSignKey();
                log.info("YinLianSDK orderCallBack 待加密参数:" + md5before);
                if (StrKit.isBlank(sign) || !SignUtil.isSignOK(md5before, sign)) {
                    log.error("YinLianSDK ERROR: Invalid sign  original string:" + md5before + "  your sign:" + sign);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                //我方订单号字段
                String cporder = params.get("cp_order");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("YinLianSDK ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("YinLianSDK 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("success");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("fee"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("YinLianSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    iod.setMoney(amount.floatValue());
                    orderService.updateOrder(iod);
                }
                log.info("+++++++++YinLian，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("qqes_order"));

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
            log.error("YinLianSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {

        SDKVerifyResult result = new SDKVerifyResult();
        StringBuffer sb = new StringBuffer();
        String time = DateUtil.timeStamp();
        //params 中的参数由前端传入
        String extStr = URLDecoder.decode(params.get("extStr"));
        String qqesuid = params.get("qqesuid");
        String channelid = params.get("channelid");
        String channeluid =  params.get("channeluid");

        int idx = order.getMoney().toString().lastIndexOf(".");//查找小数点的位置
        String money = order.getMoney().toString().substring(0,idx);//截取从字符串开始到小数点位置的字符串，就是整数部分

        Map<String,String> map = new HashMap<>();
        map.put("order", order.getOrderNumber());
        map.put("cpgameid", channelGame.getPayKey());
        map.put("qqesuid", qqesuid);
        map.put("channelid", channelid);
        map.put("channeluid", channeluid);
        map.put("cpguid", channelGame.getSdkAppKey());
        map.put("goodsname", order.getGoodsName());
        map.put("fee",money);
        map.put("ext", extStr);
        map.put("timestamp", time);

       String signStr = SignUtil2.sortParam2(map) +"&"+channelGame.getSignKey();
        log.info("YinLianSDK getOrderNo  待加密参数："+signStr);
       String sign =  SignUtil2.md5(signStr);
        log.info("YinLianSDK getOrderNo  加密结果为："+sign);
        sb.append(sign).append("_").append(qqesuid)
                .append("_").append(channelGame.getSdkAppKey())
                .append("_").append(time)
                .append("_").append(channelid)
                .append("_").append(channeluid)
                .append("_").append(extStr);
        log.info("YinLianSDK getOrderNo  ----签名参数----："+sb.toString());
        result.setExtension(sb.toString());
        callback.onSuccess(result);
    }


    public static void main(String [] args){

    }
}