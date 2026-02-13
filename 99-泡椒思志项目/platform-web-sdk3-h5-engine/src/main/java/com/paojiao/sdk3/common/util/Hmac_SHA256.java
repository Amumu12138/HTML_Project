package com.paojiao.sdk3.common.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class Hmac_SHA256 {
    public static String sha256_mac(String message,String key){
        String outPut= null;
        try{
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(),"HmacSHA256");
            sha256_HMAC.init(secret_key);
            byte[] bytes = sha256_HMAC.doFinal(message.getBytes());
            outPut = byteArrayToHexString(bytes);
        }catch (Exception e){
            System.out.println("Error HmacSHA256========"+e.getMessage());
        }
        return outPut;
    }
    public static String byteArrayToHexString(byte[] b) {
        StringBuilder sb = new StringBuilder();
        String stmp;
        for (int n = 0; b != null && n < b.length; n++) {
            stmp = Integer.toHexString(b[n] & 0XFF);
            if (stmp.length() == 1)
                sb.append('0');
            sb.append(stmp);
        }
        return sb.toString().toLowerCase();
    }

    public static void main(String[] args) {
        String key = "zNLgAGgqsEWJOg1nFVaO5r7fAlIQxr1u";
        String stringA="appid=wx1234567&offer_id=12345678&openid=odkx20ENSNa2w5y3g_qOkOvBNM1g&pf=android&ts=1507530737&zone_id=1";
        String stringSignTemp=stringA+"&org_loc=/cgi-bin/midas/getbalance&method=POST&secret=zNLgAGgqsEWJOg1nFVaO5r7fAlIQxr1u";
        String resultMassage = sha256_mac(stringSignTemp,key);
        System.out.println(resultMassage);
    }
}
