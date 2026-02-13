package com.paojiao.sdk3.controller.pay.util;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.util.*;

/**
 * 支付api签名工具
 * @author zhouzhenyi
 * @date 2018年3月3日
 */
public class PaySignUtil {

    private final static Logger log = Logger.getLogger(PaySignUtil.class);


    public static boolean verifySign(Map<String, Object> params, String sign,  String key) {

        String mySign = generateSign(params, key);
        log.info("============>>generateSign["+ JSON.toJSONString(params)+"] \t mySign["+mySign+"] \t youSign["+sign+"]");
        if (mySign == null || sign == null) {
            return false;
        }
        return mySign.toLowerCase().equals(sign.toLowerCase());
    }

    /***
     * 生成sign
     */
    public static String generateSign(Map<String, Object> prarms, String key) {
        String md5before = sortParam(prarms);

        try {
            md5before = URLEncoder.encode(md5before, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        log.info("============>>generateSign["+ JSON.toJSONString(prarms)+"] \t md5before["+md5before+"]");
        return md5(md5before.toString() + key);

    }


    /**
     * md5
     *
     * @param txt
     * @return
     */
    public static String md5(String txt) {

        if (txt == null || txt.trim().length() == 0) {
            return null;
        }

        String algorithName = "MD5";

        try {
            MessageDigest m = MessageDigest.getInstance(algorithName);
            m.reset();
            m.update(txt.getBytes(Charset.forName("UTF-8")));
            byte[] bts = m.digest();

            return hex(bts);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


    private static String hex(byte[] bts) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < bts.length; i++) {
            sb.append(Integer.toHexString((bts[i] & 0xFF) | 0x100).substring(1,3));
        }
        return sb.toString();
    }

    /**
     * 对请求参数按照一定的规则排序，默认使用Collections.sort
     *
     * @param params
     *            请求中获取的键值
     * @return
     */
    public static String sortParam(Map<String, Object> params) {
        StringBuffer content = new StringBuffer();
        // 按照key做排序
        List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);
        for (int i = 0; i < keys.size(); i++) {
            String key = (String) keys.get(i);
            // sign参数不参与加密
            if ("sign".equals(key)) {
                continue;
            }
            if (i > 0)
                content.append("&");
            Object _value = params.get(key);
            String value ="";
            if(null != _value){
                value = _value.toString();
            }
            content.append(key).append("=").append(value);
        }
        return content.toString();
    }




    /**
     * URLEncoder map中的所有参数
     * @param param
     * @return
     */
    public static Map<String, Object> encodeMap(Map<String, Object> param){
        Map<String, Object> newMap = new HashMap<String, Object>();
        Iterator<Map.Entry<String, Object>> it = param.entrySet().iterator();
        while (it.hasNext()) {
         Map.Entry<String, Object> entry = it.next();
         try {
            String value="";
             Object _value = entry.getValue();
             if( _value != null){
                 value = _value.toString();
             }
            newMap.put(entry.getKey(), URLEncoder.encode(value,"utf-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        }
        return newMap;
    }

    /**
     * URLDecoder map 中的所有参数
     * @param param
     * @return
     */
    public static Map<String, Object> decodeMap(Map<String, Object> param){
        Map<String, Object> newMap = new HashMap<String, Object>();
        Iterator<Map.Entry<String, Object>> it = param.entrySet().iterator();
        while (it.hasNext()) {
         Map.Entry<String, Object> entry = it.next();
         try {
             String value="";
             Object _value = entry.getValue();
             if( _value != null){
                 value = _value.toString();
             }
            newMap.put(entry.getKey(), URLDecoder.decode(value,"utf-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        }
        return newMap;
    }




    /**
     * 将Map中的数据组装成url
     *
     * @param params
     * @return
     */
    public static String mapToUrlNotEncode(Map<String, Object> params) {

        StringBuilder sb = new StringBuilder();
        boolean isFirst = true;
        for (String key : params.keySet()) {
            Object _value = params.get(key);
            String value ="";
            if(_value != null){
                value = _value.toString();
            }
            if (isFirst) {
                sb.append(key + "=" + value);
                isFirst = false;
            } else {
                if (value != null) {
                    sb.append("&" + key + "=" + value);
                } else {
                    sb.append("&" + key + "=");
                }
            }
        }
        return sb.toString();
    }


}
