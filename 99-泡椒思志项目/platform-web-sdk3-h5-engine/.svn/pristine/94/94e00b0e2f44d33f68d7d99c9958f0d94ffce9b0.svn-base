package com.paojiao.sdk3.controller.thirdsdk.tudou;

import com.paojiao.sdk3.common.util.SignUtil2;
import org.apache.log4j.Logger;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class TuDouSign {
    private static final Logger log = Logger.getLogger(TuDouSign.class);

    //生成签名   secret 平台分配的
    public static String signEncode(HashMap<String, String> params,String secret){
        params.remove("sign");
        Set keys=params.keySet();
        Object[] keyArr=keys.toArray();
        Arrays.sort(keyArr);
        StringBuffer str = new StringBuffer();
        str.append(secret);
        for(Object key:keyArr){
            str.append(key);
            str.append(params.get(key));
        }
        str.append(secret);
        log.info("拼接后的字符串: "+str.toString());
        return getMD5(str.toString()).toUpperCase();
    }

    public static String getMD5(String str) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            String md5=new BigInteger(1, md.digest()).toString(16);
            return fillMD5(md5);
        } catch (Exception e) {
            throw new RuntimeException("MD5加密错误:"+e.getMessage(),e);
        }
    }
    public static String fillMD5(String md5){
        return md5.length()==32?md5:fillMD5("0"+md5);
    }

   /* public static void main(String[] args) {
        //参数
      *//*  HashMap<String, String> params = new HashMap<>();
        params.put("appKey"  , "12345678");
        params.put("userID"  , "123456");
        params.put("appID"  , "1581232870");
        params.put("channelID"  , "10001");
        params.put("cpOrderNo"  , "12020010100088888888");
        params.put("orderNo" , "12020010100099999999");
        params.put("money" , "0.01");
        params.put("productID" , "2000");
        params.put("productName" , "神宠");
        params.put("roleID" , "18");
        params.put("roleName" , "张三");
        params.put("serverID" , "4");
        params.put("serverName" , "4587524");
        params.put("extension" , "4||8688_535||4587524||2002||神宠");
        params.put("sign" , "A9878532BA84CD14386317BD5A3B6AAC");
       String sign = signEncode(params,);
        System.out.printf("Sign: %s", sign);*//*
    }*/
   /*public static void main(String[] args) {
       String serverSecret  =  "O1frU6HbVKtsB9LSejkcUR1Q53BfMRDe";
       Map<String,String> map = new HashMap<>();
       map.put("cpOrderNo","202006241137292547b9321639313082");
       map.put("ext","202006241137292547");
       map.put("finishedTime","1592969873846");
       map.put("gameId","3058");
       map.put("orderNo","H5_15929698500799449");
       map.put("price","6.0");
       map.put("roleId","19404000");
       map.put("serverId","13001");
       map.put("uid","24046979");
       String signParams =  SignUtil2.generateSign(map,serverSecret);
       log.info(signParams);
       String sign =  SignUtil2.md5(signParams + serverSecret);
       log.info(signParams);
   }*/
}
