package com.paojiao.sdk3.controller.thirdsdk.qiqiyou;

import com.alibaba.fastjson.JSONObject;
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
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.*;

/**
 * 类描述：七七游SDK
 *
 * @Author: jiangkun
 * @Date: 2020/4/28 10:37
 */
public class QiQiYouSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(QiQiYouSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);

    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("QiQiYouSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("QiQiYouSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "QiQiYouSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            final String qqesUid = json.getString("qqesuid");
            final String channelId = json.getString("channelid");
            final String channelUid = json.getString("channeluid");
            final String qqesnickName = URLDecoder.decode(json.getString("qqesnickname"));
            final String cpGameId = json.getString("cpgameid");
            final String ext = URLDecoder.decode(json.getString("ext"));
            final String qqestimesTamp = json.getString("qqestimestamp");
            final String sign = json.getString("sign");
            if (StringUtils.isEmpty(qqesUid)) {
                log.info("QiQiYouSDK qqesUid为空");
                callback.onFailed(" verify failed：QiQiYouSDK:qqesUid为空");
                return;
            }
            if (StringUtils.isEmpty(sign)) {
                log.info("QiQiYouSDK sign为空");
                callback.onFailed(" verify failed：QiQiYouSDK:sign为空");
                return;
            }
            Map<String, String> params = new HashMap<>();
            params.put("qqesuid", qqesUid);
            params.put("channelid", channelId);
            params.put("channeluid", channelUid);
            params.put("qqesnickname",qqesnickName);
            params.put("cpgameid", cpGameId);
            params.put("ext", ext);
            params.put("qqestimestamp", qqestimesTamp);
            log.info("QiQiYouSDK sign 待加密参数 " + SignUtil2.sortParam2(params) + "&"+channelGame.getSignKey());
            String signStr = SignUtil2.sortParam2(params) + "&"+channelGame.getSignKey();
            if(!SignUtil.isSignOK(signStr, sign)){
                callback.onFailed(sdkChannel.getSdkCode()
                        + " verify failed. the two signatures are inconsistent ");
                return;
            }else{
                log.info("QiQiYouSDK 验证sign成功");
                callback.onSuccess(new SDKVerifyResult(true, qqesUid,qqesnickName, qqesnickName,ext));
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
        log.info("QiQiYouSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            PjThirdSdkChannel channel =channelService.findChannelById(channelGame.getSdkChannelId());
            String sign = params.get("sign");
            try {
                String md5before = SignUtil.sortParam3(params)+"&"+channelGame.getSignKey();
                log.info("QiQiYouSDK orderCallBack 待加密参数:" + md5before);
                if (StrKit.isBlank(sign) || !SignUtil.isSignOK(md5before, sign)) {
                    log.error("QiQiYouSDK ERROR: Invalid sign  original string:" + md5before + "  your sign:" + sign);
                    vs.setReturnMsg("fail");
                    callback.onSuccess(vs);
                    return;
                }
                //我方订单号字段
                String cporder = params.get("cp_order");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("QiQiYouSDK ERROR:orer not found,orderNo:[" + cporder + "]");
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("QiQiYouSDK 重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg("success");
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double amount = Double.valueOf(params.get("fee"));
                // 实际收款金额不一致
                if (iod.getMoney() != amount.floatValue()) {
                    log.error("QiQiYouSDK 收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + amount);
                    // 更新订单金额
                    iod.setMoney(amount.floatValue());
                    orderService.updateOrder(iod);
                }
                log.info("+++++++++Moxia，完成支付....");
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
            log.error("QiQiYouSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
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
        log.info("QiQiYouSDK getOrderNo  待加密参数："+signStr);
       String sign =  SignUtil2.md5(signStr);
        log.info("QiQiYouSDK getOrderNo  加密结果为："+sign);
        sb.append(sign).append("_").append(qqesuid)
                .append("_").append(channelGame.getSdkAppKey())
                .append("_").append(time)
                .append("_").append(channelid)
                .append("_").append(channeluid)
                .append("_").append(extStr);
        log.info("QiQiYouSDK getOrderNo  ----签名参数----："+sb.toString());
        result.setExtension(sb.toString());
        callback.onSuccess(result);
    }


    public static void main(String [] args){
        String key = "4895ea797ee3fa064895ea797ee3fa4b";
        Map<String, String> params = new HashMap<>();
        params.put("qqesuid", "12341842");
        params.put("channelid", "1");
        params.put("channeluid", "9693753");
        params.put("qqesnickname", URLDecoder.decode("%E7%94%84%E6%96%B0%E6%A2%85"));
        params.put("cpgameid", "495");
        params.put("ext", URLDecoder.decode("%7B%22game%22%3A%22djx%22%2C%22appkey%22%3A%22158796970671%22%2C%22token%22%3A%22ef6e9a51b711f5714a01178cbb0727cd%22%2C%22channel%22%3A%220%22%2C%22ext%22%3A%22eyJmbGFnIjpudWxsLCJpc19yZWFsbmFtZSI6MCwiaXNfYWR1bHQiOjAsImFnZSI6MH0%3D%22%2C%22is_realname%22%3A0%2C%22is_adult%22%3A0%2C%22age%22%3A0%7D"));
        params.put("qqestimestamp", "1588143195");
        log.info("QiQiYouSDK sign 待加密参数 " + SignUtil2.sortParam2(params) + "&"+ key );
        String signStr = "channelid=1&channeluid=4073011&cpgameid=495&cpguid=4895ea797ee3f996&ext={\"game\":\"djx\",\"appkey\":\"158796970671\",\"token\":\"ec29bbf8d453b16d3543fb0fe70ef926\",\"channel\":\"0\",\"ext\":\"eyJmbGFnIjpudWxsLCJpc19yZWFsbmFtZSI6MSwiaXNfYWR1bHQiOjEsImFnZSI6Mjh9\",\"is_realname\":1,\"is_adult\":1,\"age\":28}&fee=100&goodsname=首充100元礼包&order=H5_15882288281113154&qqesuid=7473108&timestamp=1588228828&4895ea797ee3fa064895ea797ee3fa4b";
        log.info("QiQiYouSDK sign -----sign: 513ada6b9a4a37cec251442ddc38c97e");
        log.info("QiQiYouSDK sign ---newSign: " + SignUtil2.md5(signStr));

        String str = String.valueOf("10.0");//浮点变量a转换为字符串str

        int idx = str.lastIndexOf(".");//查找小数点的位置
        String strNum = str.substring(0,idx);//截取从字符串开始到小数点位置的字符串，就是整数部分
        log.info("----------------"+strNum);

    }
}