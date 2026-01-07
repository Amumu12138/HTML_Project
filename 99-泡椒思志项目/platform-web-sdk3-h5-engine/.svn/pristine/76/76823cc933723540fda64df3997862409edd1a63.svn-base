package com.paojiao.sdk3.controller.thirdsdk.yinlian;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

/**
 * AES加密解密算法
 * 默认采用AES-128-ECB加密模式
 */
public class AESUtils {

    private static final String SKEY = "eETLVLbYKcgaZiuO";

    /**
     * 加密
     * @param sSrc
     * @param skey
     * @return
     * @throws Exception
     */
    public static String Encrypt(String sSrc, String skey){
        try {
            byte[] raw = skey.getBytes("utf-8");
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");//"算法/模式/补码方式"
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
            byte[] encrypted = cipher.doFinal(sSrc.getBytes("utf-8"));
            return BinaryToHex(encrypted);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 解密
     * @param sSrc
     * @return
     * @throws Exception
     */
    public static String Decrypt(String sSrc, String skey){
        try {
            byte[] raw = skey.getBytes("utf-8");
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec);
            try {
                byte[] original = cipher.doFinal(HexToBinary(sSrc));
                String originalString = new String(original,"utf-8");
                return originalString;
            } catch (Exception e) {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
    /**
     * 二进制转16进制
     * @param str
     * @return
     */
    private static String BinaryToHex(byte str[]){
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < str.length; i++) {
            String hex = Integer.toHexString(str[i] & 0xFF);
            if (hex.length()==1){
                hex ='0' + hex;
            }
            sb.append(hex.toUpperCase());
        }
        return sb.toString();
    }

    /**
     * 16进制转二进制
     * @param hexStr
     * @return
     */
    private static byte[] HexToBinary(String hexStr) {
        if (hexStr.length()<1){
            return null;
        }
        byte[] result = new byte[hexStr.length()/2];
        for (int i = 0; i < hexStr.length()/2; i++) {
            int high = Integer.parseInt(hexStr.substring(i*2, i*2+1), 16);
            int low = Integer.parseInt(hexStr.substring(i*2+1, i*2+2), 16);
            result[i] = (byte) (high * 16 + low);
        }
        return result;
    }

    public static void main(String[] args) {
        String key = "eETLVLbYKcgaZiuO";
        String userId = "afef55922918d46d15f5e5c06bbc48a7d88742fd12855c1dabf9b34987cc4736a37fcc\n" +
                "e1d2cd6f3bb68f32e4019aef1133882223ecf4c4739bb6f0c5bc470659eccc4936a29b9948cc61\n" +
                "c384afe877b3";

        String userIdEnc = AESUtils.Decrypt(userId, key);
        System.out.println("YinLianSDK userId加密后为："+userIdEnc);

    }
}
