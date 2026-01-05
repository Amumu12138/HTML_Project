package com.paojiao.sdk3.controller.thirdsdk.zzhalou;

import com.jfinal.aop.Aop;
import com.paojiao.sdk3.service.PjThirdSdkChannelService;
import org.apache.log4j.Logger;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

/**
 * HmacSHA256Secure
 *
 * @author jiangkun
 * @date 2020/11/10
 */
public class HmacSHA256Secure {
    private static final Logger log = Logger.getLogger(HmacSHA256Secure.class);
    //private static final String secretKey = "ac13cc04l8841lkh9vepvgff6rw3hrwb";

    public static byte[] encrypt(byte[] data, String secretKey) throws Exception {
        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);
        return mac.doFinal(data);
    }

    /**
     * 2进制数字转换为16进制字符串
     *
     * @param data
     * @return
     */
    public static String encodeByteToHex(byte[] data) {
        if (data == null || data.length < 1) {
            return null;
        }
        StringBuffer hex = new StringBuffer();
        for (int i = 0; i < data.length; i++) {
            int h = data[i] & 0XFF;
            if (h < 16) {
                hex.append("0");
            }
            hex.append(Integer.toHexString(h));
        }

        return hex.toString();
    }

    public static String encryptionSign(String params, String key) {
        try {
            String sign = encodeByteToHex(HmacSHA256Secure.encrypt(params.getBytes(), key));
            log.info("ZhengZhouHaLouSDK-Sign:" + sign);
            return sign;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}