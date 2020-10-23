package com.paojiao.sdk3.controller.thirdsdk.huawei;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Aop;
import com.jfinal.kit.JsonKit;
import com.paojiao.sdk3.common.util.PjMap;
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
 * 类描述：华为SDK
 *
 * @Author: jiangkun
 * @Date: 2020/4/26 10:21
 */
public class HuaWeiSDK implements ItfSdk {
    private static final Logger log = Logger.getLogger(HuaWeiSDK.class);
    private PjThirdSdkOrderService orderService = Aop.get(PjThirdSdkOrderService.class);
    private PjThirdSdkChannelGameService channelGameService = Aop.get(PjThirdSdkChannelGameService.class);
    private PjThirdSdkChannelService channelService = Aop.get(PjThirdSdkChannelService.class);
    final String CP_AUTH_SIGN_PRIVATE_KEY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCCvHpQ31HiYKeG+02969+ULyv8mZNjPj/FLi+M1YpsCt9Q39HpC6plhAtZUVAK7bfNYYZCD2xOFC6tZjWSLm0vwK/dKfP418XhP9ULfWg7/+PBt02mAad1kfPO+xJC0+vyJ9Yh0XTBlq01t5gm81qMOjja4y+NwlE7SkCxETTIJPz8kaCgqXivWCgNFFGosIngCEbA18RNJtdSMsyFzi7aXpHQ/7uUlyXCs9zqyRczwvchlgT+nj43IJ34r1kKgx1ExnOw4KUrLLAQ7rvq5+lxPsnCLV8Epf4z336SbrjUhG2a6tSiePm0wRYMRD1qmLja0Di1CyQ+ha9DnBst1/VtAgMBAAECggEAQhZW2pTZRs9HQHO+y9f1kGn8GVfk6pEoGVwMi2vS6mTgmHhcGytbeq+yMPdqt+uNM1QuUyyKujl3kw4M3JV9els0S1+OxecFT6U94+4EB/iFwIIRzW4eoc8i6SmABKouJp4+n5/LHqU1b+ccEeyIhERWQ0f+3PEysP8LDrc88EMQQVlb9k+77TthoTkLnAyJcQ1+VI46olINbNprhF69F0oryqCa0AQD6U3cVn5FjuVtBjuTkx1Tw2BlGvMkm7leZyBC2VLqAEJRmg4dmobV/qbOxikM95jeRFwBPoEyc3Q4678TsjuN98hLgI2Jp6XlsBElKm5gM/5ipJ8pNqSqwQKBgQDMxLmMtw7qbau88auaRnVuIfc/y7a90HddT3HcpWJRSFDizPk0vdcWBA1KAWx4SY1VxjGDqaLCkinlNR1btYJey3Eiul40O/X0vFPWHZoR+gnXXV5CbUqQJW3FuMOhJ6DEWyzUTPzZF41dqZagkrWZGj7Fw/IcHTKFhpuHP2yAXQKBgQCjcgq2e8Lz2ThknIU7TAF/PkOZj5BaIa7CimK42gdiCmPGDXUiA90ryuh1zrx+a4T3wmTO3PA9mI1o0F1ogv0Ygmpfn/zu0dT1XDIOLClvGpCe/hcpIq7RJoNME21QALneXf6vBi9G9GVICdYYQXRJrGijksnt9Gip07zZRzs4UQKBgFjkJbCCX0VBasZRGy+T2rJ+qDjXlHL+JnMpY8JnQTEL9aEfXieZKd/yzloMGCx3sZVEvoXrhC53CRzpW99OAlRoeKqcwPxn8zPU9YgDvbiEFPWbIKoxi6bbuLWWqcYxz8at1d4rtbAAW2wHjM4UIiVekVWE5Htz6VSxxJ6H1/A5AoGAPP3pkX9NmMGOkbz22tHaHSmXAE7ah0fady48+M4jwyotYVLUSwU2G4l0hcHIBUUKMYqRI8C+xb2Px3U55i47VFIWb+i78kLLPWRSKYfBTnyTS0F2UxtmMRY2GMWHHTuoIJri111vdwLsaJ2DDzodswBra97zC6ERDY6+AjbamoECgYEAyWVASWrOlM2f0vu+toJE7e4AA+VQWhSKpIeQXEk5TR33H2+Z+sb6Ws7+2Y4imqXGf62fJCxef3+LD4HdtX4XtlL09eO5aG9jlcyPQOfFf3qV/sYbSUexY9QE/azrUKhmpseR1HijIuiafbSiyhglREXyQndz76U3qrhWKovrU6Q=";
    final String RETURN_CODE_SUCCEED = "0";
    public static final String SIGN_ALGORITHMS = "SHA1WithRSA";
    public static final String SIGN_ALGORITHMS256 = "SHA256WithRSA";
    public static final java.util.Base64.Decoder decoder = java.util.Base64.getDecoder();
    public static final java.util.Base64.Encoder encoder = java.util.Base64.getEncoder();
    private static final int HTTP_RESPONSE_STATUS_CODE_OK = 200;
    @Override
    public void verify(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjCpGame game, String sdkToken, ISDKVerifyListener callback) {
        try {
            log.info("HuaWeiSDK  客户端登录返回:" + sdkToken);
            if (StringUtils.isEmpty(sdkToken)) {
                log.info("HuaWeiSDK 客户端登录返回为空");
                callback.onFailed(" verify failed. " + "HuaWeiSDK 客户端登录返回为空");
                return;
            }
            JSONObject json = JSONObject.parseObject(sdkToken);
            if (StringUtils.isBlank(json.getString("playerId"))) {
                log.info("HuaWeiSD-verify: playerId is null");
                callback.onFailed("HuaWeiSDK-verify: token is null.");
                return;
            }
            if (StringUtils.isBlank(json.getString("playerLevel"))) {
                log.info("HuaWeiSD-verify: playerLevel is null");
                callback.onFailed("HuaWeiSDK-verify: token is null.");
                return;
            }
            if (StringUtils.isBlank(json.getString("ts"))) {
                log.info("HuaWeiSD-verify: ts is null");
                callback.onFailed("HuaWeiSDK-verify: token is null.");
                return;
            }
            if (StringUtils.isBlank(json.getString("gameAuthSign"))) {
                log.info("HuaWeiSD-verify: gameAuthSign is null");
                callback.onFailed("HuaWeiSDK-verify: token is null.");
                return;
            }

            //华为参数签名
            Map<String,String> Values = new HashMap<>();
            Values.put("method","external.hms.gs.checkPlayerSign");
            Values.put("appId",channelGame.getSdkAppId());
            Values.put("cpId",channelGame.getPayKey());
            Values.put("ts",json.getString("ts"));
            Values.put("playerId",json.getString("playerId"));
            Values.put("playerLevel",json.getString("playerLevel"));
            Values.put("playerSSign",json.getString("gameAuthSign"));
            String cpSign =  HuaWeiUtils.generateCPSign(Values,CP_AUTH_SIGN_PRIVATE_KEY);
            //签名结果为
            log.info("HuaWeiSDK:登录参数加密结果为:" + cpSign);
            log.info("HuaWeiSDK:gameAuthSign参数为:" + json.getString("gameAuthSign"));

            Map<String, String> params = new HashMap<String, String>();
            params.put("method","external.hms.gs.checkPlayerSign");
            params.put("appId",channelGame.getSdkAppId());
            params.put("cpId",channelGame.getPayKey());
            params.put("ts",json.getString("ts"));
            params.put("playerId",json.getString("playerId"));
            params.put("playerLevel",json.getString("playerLevel"));
            params.put("playerSSign",json.getString("gameAuthSign"));
            params.put("cpSign",cpSign);
            String url = sdkChannel.getAuthUrl();
            //请求华为登录接口做二次验证  请求路径、参数
            log.info("HuaWeiSDK获取用户信息:" + url + ",参数:" + params.toString());
            Map<String,Object> responseParamPairs = HuaWeiUtils.doPost(url,params);
            if(responseParamPairs.isEmpty())
            {
                log.info("HuaWeiSDK:登录验证结果为空 None response responseParamPairs.");
                return;
            } else {
                log.info("HuaWeiSDK登录验证结果:" + JSONObject.toJSONString(responseParamPairs));
                if(RETURN_CODE_SUCCEED.equalsIgnoreCase(HuaWeiUtils.getString("rtnCode",responseParamPairs))) {
                    callback.onSuccess(new SDKVerifyResult(true, json.getString("playerId"), null, null));
                    return;
                }else{
                    callback.onFailed(sdkChannel.getSdkCode() +"HuaWeiSDK.verify failed. ");
                    return;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            callback.onFailed(sdkChannel.getSdkCode() + " verify execute failed. the exception is " + e.getMessage());
        }
    }
    @Override
    public void orderCallBack(PjMap<String, String> params, HttpServletRequest request, ISDKVerifyListener callback) {
        log.info("HuaWeiSDK orderCallBack:" + JsonKit.toJson(params));
        SDKVerifyResult vs = new SDKVerifyResult();
        HuaWeiPayCallBackVerify huaWeiPayCallBackVerify = new HuaWeiPayCallBackVerify();
        try {
            PjThirdSdkChannelGame channelGame = channelGameService.findGameById(params.getToInt("channelGameId"));

            //PjThirdSdkChannel channel =channelService.findChannelById(channelGame.getSdkChannelId());
            try {
                String sign = params.get("sign");
                String requestId = params.get("requestId");
                String result = params.get("result");
                String accessMode = HuaWeiUtils.nullToEmpty(params.get("accessMode"));
                String amount = params.get("amount");
                String bankId = HuaWeiUtils.nullToEmpty(params.get("bankId"));
                String extReserved = HuaWeiUtils.nullToEmpty(params.get("extReserved"));
                String sysReserved = HuaWeiUtils.nullToEmpty(params.get("sysReserved"));
                String notifyTime = HuaWeiUtils.nullToEmpty(params.get("notifyTime"));
                String orderId = params.get("orderId");
                String orderTime = HuaWeiUtils.nullToEmpty(params.get("orderTime"));
                String payType = HuaWeiUtils.nullToEmpty(params.get("payType"));
                String productName = params.get("productName");
                String spending = HuaWeiUtils.nullToEmpty(params.get("spending"));
                String tradeTime = HuaWeiUtils.nullToEmpty(params.get("tradeTime"));
                String userName = params.get("userName");
                String signType = HuaWeiUtils.nullToEmpty(params.get("signType"));

                if (sign.isEmpty()){
                    log.error("HuaWei orderCallBack ERROR: sign is Null");
                    vs.setReturnMsg(vs.resultJson(HuaWeiPayCallbackCode.PARAM_ERROR));
                    callback.onSuccess(vs);
                }
                if (orderId.isEmpty()){
                    log.error("HuaWei orderCallBack ERROR: orderId is Null");
                    vs.setReturnMsg(vs.resultJson(HuaWeiPayCallbackCode.PARAM_ERROR));
                    callback.onSuccess(vs);
                }
                Map<String,Object> map = new HashMap<>();
                map.put("accessMode",accessMode);
                map.put("amount",amount);
                if (!bankId.isEmpty()){
                    map.put("bankId",bankId);
                }
                if (!extReserved.isEmpty()){
                    map.put("extReserved",extReserved);
                }
                map.put("notifyTime",notifyTime);
                map.put("orderId",orderId);
                map.put("orderTime",orderTime);
                map.put("payType",payType);
                map.put("productName",productName);
                map.put("requestId",requestId);
                map.put("result",result);
                if (!spending.isEmpty()){
                    map.put("spending",spending);
                }
                if (!sysReserved.isEmpty()){
                    map.put("sysReserved",sysReserved);
                }
                map.put("tradeTime",tradeTime);
                map.put("userName",userName);

                String conent =  huaWeiPayCallBackVerify.getSignData(map);
                log.info("HuaWeiSDK orderCallBack encryption params:" + conent);
                boolean isFlag = huaWeiPayCallBackVerify.doCheck(conent,sign,channelGame.getSignKey(),signType);
                if (!isFlag){
                    log.info("HuaWeiSDK orderCallBack :验证签名出错");
                    vs.setReturnMsg(vs.resultJson(HuaWeiPayCallbackCode.SING_VERIFY_FAIL));
                    callback.onSuccess(vs);
                    return;
                }

                String cporder = params.get("requestId");
                PjThirdSdkOrder iod = orderService.findOrderByOrderNo(cporder);
                if (iod == null) {
                    log.error("HuaWeiSDK orderCallBack  ERROR:orer not found,orderNo:[" + cporder + "]");
                    vs.setReturnMsg(vs.resultJson(HuaWeiPayCallbackCode.ORDER_NONE));
                    callback.onSuccess(vs);
                    return;
                } else if (iod.getStatus() == PayStatus.PAY_SUCCESS.id) {// 已完成支付
                    log.error("HuaWeiSDK orderCallBack  重复回调,orderNo:[" + cporder + "]");
                    vs.setReturnMsg(vs.resultJson(HuaWeiPayCallbackCode.SUCCESS));
                    callback.onSuccess(vs);
                    return;
                }

                // 真实收款
                Double money = Double.valueOf(params.get("amount"));
                // 实际收款金额不一致
                if (iod.getMoney() != money.floatValue()) {
                    log.error("HuaWei收款金额与订单金额不符,orderNo:[" + cporder + "],订单金额："
                            + iod.getMoney() + ",实际收款金额：" + money);
                    // 更新订单金额
                    iod.setMoney(money.floatValue());
                    orderService.updateOrder(iod);
                }
                log.info("+++++++++Moxia，完成支付....");
                orderService.finishOrderAndCallbackCp(cporder,
                        params.get("orderId"));

            } catch (Exception e) {
                log.error("Moxia orderCallBack error:" + e.getMessage());
                vs.setReturnMsg(vs.resultJson(HuaWeiPayCallbackCode.SYSTEM_ERROR));
                callback.onSuccess(vs);
                return;
            }
            vs.setReturnMsg(vs.resultJson(HuaWeiPayCallbackCode.SUCCESS));
            callback.onSuccess(vs);
        } catch (Exception e) {
            vs.setReturnMsg(vs.resultJson(HuaWeiPayCallbackCode.SYSTEM_ERROR));
            callback.onSuccess(vs);
            log.error("HuaWeiSDK 充值回调请求异常！params:[" + JsonKit.toJson(params) + "]");
            e.printStackTrace();
        }
    }

    @Override
    public void getOrderNo(PjThirdSdkChannel sdkChannel, PjThirdSdkChannelGame channelGame, PjThirdSdkOrder order, PjMap<String, String> params, ISDKVerifyListener callback) {
        SDKVerifyResult  result =new SDKVerifyResult();
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        paramsMap.put("merchantId", channelGame.getPayKey());
        paramsMap.put("country","CN");
        paramsMap.put("currency","CNY");
        paramsMap.put("applicationID", channelGame.getSdkAppId());
        paramsMap.put("amount",order.getMoney()+"0");
        paramsMap.put("productName",order.getGoodsName());
        paramsMap.put("productDesc",order.getGoodsName());
        paramsMap.put("requestId",order.getOrderNumber());
        paramsMap.put("sdkChannel", 3);
        paramsMap.put("urlver", "2");
        paramsMap.put("url","http://h5.paojiao.cn/api/payCallBack/10890");

        log.info("HuaWeiH5SDK: onGetOrderID 加密参数为："+JSONObject.toJSONString(paramsMap));
        String sign =  HuaWeiUtils.getSign(paramsMap,channelGame.getSdkAppKey());
        log.info("HuaWeiH5SDK: onGetOrderID 加密后Sign结果为："+sign);
        StringBuffer sf = new StringBuffer(sign);
        sf.append("_");
        log.info("HuaWeiH5SDK: onGetOrderID 加密后sf 结果为："+sf.toString());
        result.setExtension(sf.toString());
        callback.onSuccess(result);
    }
    public static void main(String [] args){
       /* String CP_AUTH_SIGN_PRIVATE_KEY ="MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCCvHpQ31HiYKeG+02969+ULyv8mZNjPj/FLi+M1YpsCt9Q39HpC6plhAtZUVAK7bfNYYZCD2xOFC6tZjWSLm0vwK/dKfP418XhP9ULfWg7/+PBt02mAad1kfPO+xJC0+vyJ9Yh0XTBlq01t5gm81qMOjja4y+NwlE7SkCxETTIJPz8kaCgqXivWCgNFFGosIngCEbA18RNJtdSMsyFzi7aXpHQ/7uUlyXCs9zqyRczwvchlgT+nj43IJ34r1kKgx1ExnOw4KUrLLAQ7rvq5+lxPsnCLV8Epf4z336SbrjUhG2a6tSiePm0wRYMRD1qmLja0Di1CyQ+ha9DnBst1/VtAgMBAAECggEAQhZW2pTZRs9HQHO+y9f1kGn8GVfk6pEoGVwMi2vS6mTgmHhcGytbeq+yMPdqt+uNM1QuUyyKujl3kw4M3JV9els0S1+OxecFT6U94+4EB/iFwIIRzW4eoc8i6SmABKouJp4+n5/LHqU1b+ccEeyIhERWQ0f+3PEysP8LDrc88EMQQVlb9k+77TthoTkLnAyJcQ1+VI46olINbNprhF69F0oryqCa0AQD6U3cVn5FjuVtBjuTkx1Tw2BlGvMkm7leZyBC2VLqAEJRmg4dmobV/qbOxikM95jeRFwBPoEyc3Q4678TsjuN98hLgI2Jp6XlsBElKm5gM/5ipJ8pNqSqwQKBgQDMxLmMtw7qbau88auaRnVuIfc/y7a90HddT3HcpWJRSFDizPk0vdcWBA1KAWx4SY1VxjGDqaLCkinlNR1btYJey3Eiul40O/X0vFPWHZoR+gnXXV5CbUqQJW3FuMOhJ6DEWyzUTPzZF41dqZagkrWZGj7Fw/IcHTKFhpuHP2yAXQKBgQCjcgq2e8Lz2ThknIU7TAF/PkOZj5BaIa7CimK42gdiCmPGDXUiA90ryuh1zrx+a4T3wmTO3PA9mI1o0F1ogv0Ygmpfn/zu0dT1XDIOLClvGpCe/hcpIq7RJoNME21QALneXf6vBi9G9GVICdYYQXRJrGijksnt9Gip07zZRzs4UQKBgFjkJbCCX0VBasZRGy+T2rJ+qDjXlHL+JnMpY8JnQTEL9aEfXieZKd/yzloMGCx3sZVEvoXrhC53CRzpW99OAlRoeKqcwPxn8zPU9YgDvbiEFPWbIKoxi6bbuLWWqcYxz8at1d4rtbAAW2wHjM4UIiVekVWE5Htz6VSxxJ6H1/A5AoGAPP3pkX9NmMGOkbz22tHaHSmXAE7ah0fady48+M4jwyotYVLUSwU2G4l0hcHIBUUKMYqRI8C+xb2Px3U55i47VFIWb+i78kLLPWRSKYfBTnyTS0F2UxtmMRY2GMWHHTuoIJri111vdwLsaJ2DDzodswBra97zC6ERDY6+AjbamoECgYEAyWVASWrOlM2f0vu+toJE7e4AA+VQWhSKpIeQXEk5TR33H2+Z+sb6Ws7+2Y4imqXGf62fJCxef3+LD4HdtX4XtlL09eO5aG9jlcyPQOfFf3qV/sYbSUexY9QE/azrUKhmpseR1HijIuiafbSiyhglREXyQndz76U3qrhWKovrU6Q=";
        String sign ="MmfAtfsBLWA4xl1CRPuFtM6wiK1xCg/owmdEm2EKNGStuEzqLnF5b3xiN0lScAEMsDbK6urtUfZCU0KSPH3dR6m42BS3CWCmtEX9R4UoOmeVTsR0FxFiHFbSEMPUOC5FapXCXK0czPJFm41BgM9W9RIkf50gnPxGdlzux49/9O10pdoXBS24II3r4I6WaCE/4QymtYQgPhy6IkXkFimP993X15UsqaaZNKF8JEoQBtYH3d0edKhycSdLzlh6mxu0V5wgoLH0ibgPGi717kFw8n6hLyPO84dBdIrHmv1aBRBvxmnNU3Nl2JKi1khsHAxAUESDEDQ2pq4xdR0YS6XqOg==";
        Map<String,String> Values = new HashMap<>();
        Values.put("method","external.hms.gs.checkPlayerSign");
        Values.put("appId","102185103");
        Values.put("cpId","41847624");
        Values.put("ts","1589339739985");
        Values.put("playerId","1179802078800266");
        Values.put("playerLevel","1");
        Values.put("playerSSign","MmfAtfsBLWA4xl1CRPuFtM6wiK1xCg/owmdEm2EKNGStuEzqLnF5b3xiN0lScAEMsDbK6urtUfZCU0KSPH3dR6m42BS3CWCmtEX9R4UoOmeVTsR0FxFiHFbSEMPUOC5FapXCXK0czPJFm41BgM9W9RIkf50gnPxGdlzux49/9O10pdoXBS24II3r4I6WaCE/4QymtYQgPhy6IkXkFimP993X15UsqaaZNKF8JEoQBtYH3d0edKhycSdLzlh6mxu0V5wgoLH0ibgPGi717kFw8n6hLyPO84dBdIrHmv1aBRBvxmnNU3Nl2JKi1khsHAxAUESDEDQ2pq4xdR0YS6XqOg==");
        String cpSign =  HuaWeiUtils.generateCPSign(Values,CP_AUTH_SIGN_PRIVATE_KEY);
        //签名结果为
        log.info("HuaWeiSDK:登录参数加密结果为:" + cpSign);
        log.info("HuaWeiSDK:gameAuthSign参数为:" + sign);*/
       // String sign ="kDuT4AU4meFQpTuIcjzZwGqUrKCnVWd2Bi9o228WcLT5oXd9qgJcLnLuY49KlboeS7/EMgvFlNI/f62e9LPGJFnn4iobAaO9xgyMkh9B5JMZGQgRXuoW8yEuGNHvrxpsOhI3dL8BKq1dJmnMrFDYqeeLKdpN3T1UiHjwP4rCTv+REm68enlwy0HqPL0i0X+s1Shc5MImagyB/AHVIb3MtHQdH3kRAFloa6iiTLu4/cGMRaJpGkuVEAOW9h1mokxP3XzWXsf5NkNDjlreGC6eE1oTVBFt4BXla6S7D2411L8MVlV/YGCJyIuA9WLtg9XRENE9qN/LuwTATtNBtp8wrg==";
        String sign19 ="fW8rLwYQfjriqepR9GNUpKkWwNn4jRF1O4hPikYLefpMy30498pnQs5SbMpyJfgZB7Y0Qfgdhi9VGtuoyj19HW3ldCsSy37ZOTV0uoGD8XwNBqqB+loEG9y04scJTMc6++9K9sDghGH/4cekxdEwyWxzhzxBjUvtVvjOyk568tcoMDnF6I021EHRoHsTe1cwjbr4JPGl0REjFzhZU9VPN9nQHZncjxJETzRstwi08vA7VHGoZLD6Qh1icEUFAHJdYOXQ9l85NG9tlfukbCF9Qhlh4nxTLcGAHAvBBK12vN6HHNWbmXq4DFsGLGYyaoxEQ4Sl+hgVtDR7WbwgAASR3Q==";
       // String signParams = "accessMode=0&amount=10.00&notifyTime=1589438766462&orderId=WX2a1ebfeaa279aade18be83a16ecd91&orderTime=2020-05-14 14:45:56&payType=17&productName=首充10元礼包&requestId=H5_1589438752463691&result=0&spending=0.00&sysReserved=on2k0wfJT3xERrVyX_LTV9kJCMqw&tradeTime=2020-05-14 14:46:06&userName=41847624";
        String signParams19 = "accessMode=0&amount=10.00&notifyTime=1590140944140&orderId=ZH0200522144123541bXBd8uvE793133&orderTime=2020-05-22 14:41:23&payType=19&productName=元宝&requestId=H5_15901296791935754&result=0&tradeTime=2020-05-22 14:41:23&userName=41847624";
        String publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArZtDa5ucq1EeEV1ChqZqzVCexI8XimylmHUTY1xqO6/R/QctLikTsTeXPT5Qc6zPxNWl719gNVjcnyhipkhxTvGF8IyKw3Y5TTVuJJqGBCEssqPyWQHRkzpfUrmr8wae8WXvJwZcH8vsIAn22dl+MXvk4FOPbXIUOaU8S2StMeiXl+ioIu3HPFNLkG8RqSo9trqXUghUs9jSSzy2dlz/MbGi8VSZFLV7g+gOysI1bkPSnO54t50+fefdvwm5UIa4n2sxKUxb/Yc4mUFWl1JXONRGf6tSHeyP6Y/n+NM8XMYjyJXiN1vwyQDiR16bfyrSxKvbPjBgmwX55n4pounJWQIDAQAB";
        String signType = "RSA256";
        boolean a = HuaWeiPayCallBackVerify.doCheck(signParams19,sign19,publicKey,signType);
        if (a){
            log.info("成功");
        }else{
            log.info("失败");
        }



    }


}
