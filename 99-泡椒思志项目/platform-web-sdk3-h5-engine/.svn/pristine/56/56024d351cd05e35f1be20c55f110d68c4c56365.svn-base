package com.paojiao.sdk3.common.util;


import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;


public class UaUtil {

    public static int  weixin = 1;//微信浏览器
    public static int  mobile_android = 2;//android移动端
    public static int  mobile_ios = 3;//ios移动端
    public static int  pc = 4;//pc端


    /**
     * 判断ua 是pc、微信、移动端
     * @param request
     * @return
     */
    public static int getClientType(HttpServletRequest request) {
        String ua = request.getHeader("User-Agent");
        if(StringUtils.isNotBlank(ua)){
            ua = ua.toLowerCase();
            if(ua.contains("micromessenger")){//微信浏览器
                return weixin;
            }else if(ua.contains("android")){//android移动端
                return mobile_android;
            }else if(ua.contains("iphone") ||ua.contains("ipad") ||ua.contains("ipod") ||ua.contains("ios")){//ios移动端
                return mobile_ios;
            }else{
                return pc;
            }
        }

        return pc;
    }


}
