package com.paojiao.sdk3.common.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.kit.StrKit;
import com.paojiao.sdk3.common.PjConstants;
import com.paojiao.sdk3.common.util.https.HttpsUtil;
import org.apache.log4j.Logger;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: zhouzhenyi
 * @Date: 2019/12/10 15:13
 * @Description:
 * -1:接口调用异常
 * 0:认证失败、未实名认证
 * 1：实名认证成年人
 * 2：实名认证未成年
 * 3：实名认证8岁以下未成年人
 * 4：实名认证8-16岁未成年人
 * 5：实名认证16岁以上未成年人
 *
 */
public class UcUtil {
    public static final Logger log = Logger.getLogger(UcUtil.class);

    //验证身份证
    private static final String REAL_NAME_AUTH_URL= "https://member.paojiao.cn/api/doAuthentication";

    //查询用户实名认证状态
    private static final String QUERY_REAL_NAME_AUTH_URL = "https://member.paojiao.cn/api/getRealNameInfo";



    /**
     * 实名认证
     *
     * @param platform 平台id
     * @param uid      用户id pj_member_user 中的id
     * @param name     用户姓名
     * @param number   用户身份证号码
     */
    public static int doRealNameAuth(Integer platform, Integer uid, String name, String number) {
        try {
            Map<String, String> map = new HashMap<String, String>();
            map.put("platform", platform + "");
            map.put("uid", uid + "");
            map.put("name", name);
            map.put("number", number);
            map.put("ts", new Date().getTime() + "");
            String sign = SignUtil2.generateUcSign2(map, PjConstants.SDK_SIGN_KEY);
            map.put("sign", sign);
            String ret = null;
            log.info("======>>请求用户实名认证:" + JSON.toJSONString(map));

            ret = HttpsUtil.post(REAL_NAME_AUTH_URL, map, null);
            log.info("======>>[" + uid + "]请求用户实名认证结果:" + ret);

            JSONObject retObj = JSON.parseObject(ret);

            Integer code = retObj.getInteger("code");
            if(code == -1){
                return 0;
            }
            return code;
        } catch (Exception e) {
            log.error("请求用户实名认证异常", e);
        }

        return 0;
    }


    /**
     * 查询用户实名认证信息
     * @param platform 平台id
     * @param uid 用户id pj_member_user 中的id
     * @return
     */
    public static int queryRealNameAuth(Integer platform, Integer uid) {
        try {
            Map<String, String> map = new HashMap<String, String>();
            map.put("platform", platform + "");
            map.put("uid", uid + "");
            map.put("ts", new Date().getTime() + "");
            String sign = SignUtil2.generateUcSign2(map, PjConstants.SDK_SIGN_KEY);
            map.put("sign", sign);
            String ret = null;
            log.info("======>>查询用户实名认证状态:" + JSON.toJSONString(map));

            ret = HttpsUtil.post(QUERY_REAL_NAME_AUTH_URL, map, null);
            log.info("======>>[" + uid + "]查询用户实名认证状态结果:" + ret);

            JSONObject retObj = JSON.parseObject(ret);

            Integer code = retObj.getInteger("code");
            if(code == -1){
                return 0;
            }

            return code;
        } catch (Exception e) {
            log.error("查询用户实名认证状态异常", e);
        }

        return 0;
    }



    /**
     * 生成用户中心访问链接
     * @param platform 平台id
     * @param uid 用户id pj_member_user 中的id
     * @param gameId 游戏id
     * @param cid cid
     * @param toUrl 需要跳转的链接
     * @return
     */
    public static String genToUrl(int platform,int uid,int gameId,String cid,String toUrl) {

        Map<String, String> paramToSign = new HashMap<String, String>();
        paramToSign.put("gameId",gameId + "");
        paramToSign.put("uid", uid + "");
        paramToSign.put("cid", StrKit.isBlank(cid)?"":cid);
        paramToSign.put("udid", "");
        paramToSign.put("sdkVersion", "");
        paramToSign.put("appVersion", "");
        paramToSign.put("imei", "");
        paramToSign.put("mac", "");
        paramToSign.put("os", "");
        paramToSign.put("tBrand", "");
        paramToSign.put("token", "");
        paramToSign.put("ts", new Date().getTime() + "");

        String sign = SignUtil2.generateUcSign(paramToSign, PjConstants.SDK_SIGN_KEY);

        paramToSign.put("sign", sign);
        paramToSign.put("platform", platform + "");
        paramToSign.put("toUrl", toUrl);
        paramToSign.put("p", "y");

        Map<String, String> map = SignUtil2.encodeMap2(paramToSign);
        String param = SignUtil2.mapToUrlNotEncode2(map);

        String host ="https://member.paojiao.cn/index";

        String url = "";
        if(host.contains("?")){
            url = host + "&" + param;
        }else{
            url = host + "?" + param;
        }

        return url;
    }

    public static void main(String[] args) {
        //System.out.println(genToUrl(1,23029051,3000,"paojiao","https://member.paojiao.cn/authentication?from=RealNameAuth"));

       // doRealNameAuth(1,21796313,"测试","430527199011010622");

        queryRealNameAuth(1,23029051);

    }

}
