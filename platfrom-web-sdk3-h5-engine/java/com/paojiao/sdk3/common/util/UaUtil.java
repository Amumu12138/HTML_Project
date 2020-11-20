package com.paojiao.sdk3.common.util;


import com.paojiao.sdk3.controller.BaseController;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class UaUtil {
    public static final Logger log = Logger.getLogger(UaUtil.class);
    public static int weixin = 1;//微信浏览器
    public static int mobile_android = 2;//android移动端
    public static int mobile_ios = 3;//ios移动端
    public static int pc = 4;//pc端


    /**
     * 判断ua 是pc、微信、移动端
     *
     * @param request
     * @return
     */
    public static int getClientType(HttpServletRequest request) {
        String ua = request.getHeader("User-Agent");
        if (StringUtils.isNotBlank(ua)) {
            ua = ua.toLowerCase();
            if (ua.contains("micromessenger")) {//微信浏览器
                return weixin;
            } else if (ua.contains("android")) {//android移动端
                return mobile_android;
            } else if (ua.contains("iphone") || ua.contains("ipad") || ua.contains("ipod") || ua.contains("ios")) {//ios移动端
                return mobile_ios;
            } else {
                return pc;
            }
        }

        return pc;
    }


    /**
     * 获取手机型号
     *
     * @param request
     * @return
     */
    public static String getMobileType(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        Pattern pattern = Pattern.compile(";\\s?(\\S*?\\s?\\S*?)\\s?(Build)?/");
        Matcher matcher = pattern.matcher(userAgent);
        String model = null;
        if (matcher.find()) {
            model = matcher.group(1).trim();
        } else {
            model = "未知型号";
        }
        return model;
    }
}
