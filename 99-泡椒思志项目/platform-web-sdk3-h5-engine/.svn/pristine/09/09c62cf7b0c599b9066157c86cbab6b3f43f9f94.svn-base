package com.paojiao.sdk3.controller.thirdsdk.qutoutiao;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class QuTouTiaoSign {

    private static final String appID = "a3W8uF7tqoiw";
    private static final String appKey = "uEbJv3OFchgGiZrAJAIcNXR25VVNMdVhDo3hVEndFFOIZNXOhhsBEFKpMGFTCXiN";
    //app_ida3W8uF7tqoiwapp_keyLfIWW7j0OXCAHj1PGtOHUy8ybslIPaDSplatformqtttickett11XqaQ9FVPupBEtuiXTVtime1590140634
    public static void main(String[] args) {
       // {"ext":"{\"ext\":\"H5_15904766938843984\"}","open_id":"u11XqxKX9bgXwysdQuBEP","total_fee":"1000","ip":"47.93.213.28","sign":"012e08a11791dd926163171c659d0c94","trade_no":"20200526150717-union-qtt-79079","time":"1590476863","app_id":"a3W8uF7tqoiw","channelGameId":"10896"}
        Map<String,String> Values = new HashMap<>();
        Values.put("app_id", appID);
        Values.put("app_key", appKey); // 上传业务参数键值对
        Values.put("open_id", "u11XqxKX9bgXwysdQuBEP");
        Values.put("trade_no", "20200526150717-union-qtt-79079");
        //Values.put("total_fee", "1000");
        //Values.put("time", "1590476863");
        String s = new QuTouTiaoSign().sign(Values);
        System.out.println(s);
        Values.put("sign", s);
        try {
            System.out.println(new QuTouTiaoSign().checkSign(Values));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String getMD5(String need2Encode) throws NoSuchAlgorithmException {
        byte[] buf = need2Encode.getBytes();
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        md5.update(buf);
        byte[] tmp = md5.digest();
        StringBuilder sb = new StringBuilder();
        for (byte b : tmp) {
            sb.append(String.format("%02x", b & 0xff));
        }
        return sb.toString();
    }

    public static String sign(Map<String,String> val) {
        val.remove("sign");
        val.put("app_key", appKey);
        ArrayList<String> keys = new ArrayList<>();
        for (String key : val.keySet()) {
            keys.add(key);
        }
        keys.sort(new Comparator<String>() {
            @Override
            public int compare(String l,String r) {
                int i = l.compareTo(r);
                if (i>0) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
        String r = "";
        String hashed = "";
        for (String i : keys) {
            r += i+val.get(i);
        }
        try {
            hashed = getMD5(r);
        } catch (Exception e) {
            e.printStackTrace();
        }
        val.remove("app_key");
        return hashed;
    }

    public static boolean checkSign(Map<String,String> val) throws Exception {
        String sign1 = val.get("sign");
        if (sign1 == "") {
            throw new Exception("sign error");
        }
        String sign2 = sign(val);
        val.remove("app_key");
        if (sign1.equals(sign2)==false) {
            throw new Exception("sign error");
        }
        return true;
    }
}

