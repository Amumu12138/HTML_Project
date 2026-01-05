package com.paojiao.sdk3.common.util;

import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class EncryptUtils {
	
	/**  
     * 用MD5算法进行加密  
     * @param str 需要加密的字符串  
     * @return MD5加密后的结果  
     */    
    public static String encodeMD5String(String str) {    
        return encode(str, "MD5");    
    }    
    
    /**  
     * 用SHA算法进行加密  
     * @param str 需要加密的字符串  
     * @return SHA加密后的结果  
     */    
    public static String encodeSHAString(String str) {    
        return encode(str, "SHA");    
    }    
    
    /**  
     * 用base64算法进行加密  
     * @param str 需要加密的字符串  
     * @return base64加密后的结果  
     */    
    public static String encodeBase64String(String str) {    
        BASE64Encoder encoder =  new BASE64Encoder();    
        return encoder.encode(str.getBytes());    
    }    
        
    /**  
     * 用base64算法进行解密  
     * @param str 需要解密的字符串  
     * @return base64解密后的结果  
     * @throws IOException   
     */    
    public static String decodeBase64String(String str) throws IOException {    
        BASE64Decoder encoder =  new BASE64Decoder();    
        return new String(encoder.decodeBuffer(str));    
    }    
        
    private static String encode(String str, String method) {    
        MessageDigest md = null;    
        String dstr = null;    
        try {    
            md = MessageDigest.getInstance(method);    
            md.update(str.getBytes());    
            dstr = new BigInteger(1, md.digest()).toString(16);    
        } catch (NoSuchAlgorithmException e) {    
            e.printStackTrace();    
        }    
        return dstr;    
    }
    
    public static String md5(String txt){
        return encrypt(txt, "MD5");
    }
    
    private static String encrypt(String txt, String algorithName){
        if(txt == null || txt.trim().length() == 0){
            return null;
        }
        if(algorithName == null || algorithName.trim().length() == 0){
            algorithName = "MD5";
        }
        try{
            MessageDigest m = MessageDigest.getInstance(algorithName);
            m.reset();
            m.update(txt.getBytes(Charset.forName("UTF-8")));
            byte[] bts = m.digest();
            return hex(bts);
        }catch (Exception e){
        	e.printStackTrace();
        }
        return null;
    }
    
    private static String hex(byte[] bts){
        StringBuilder sb = new StringBuilder();
        for(int i=0; i<bts.length; i++){
            sb.append(Integer.toHexString((bts[i] & 0xFF) | 0x100).substring(1,3));
        }
        return sb.toString();
    }
        
    public static void main(String[] args) throws IOException {    
        String user = "oneadmin";    
        System.out.println("原始字符串 " + user);    
        System.out.println("MD5加密 " + encodeMD5String(user));    
        System.out.println("SHA加密 " + encodeSHAString(user));    
        String base64Str = encodeBase64String(user);    
        System.out.println("Base64加密 " + base64Str);    
        System.out.println("Base64解密 " + decodeBase64String(base64Str));    
    }    

}
