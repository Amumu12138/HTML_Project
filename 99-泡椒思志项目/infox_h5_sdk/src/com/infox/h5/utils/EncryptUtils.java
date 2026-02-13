package com.infox.h5.utils;

import java.nio.charset.Charset;
import java.security.MessageDigest;

public class EncryptUtils {


    public static String md5(String txt){

        return encrypt(txt, "MD5");
    }

    public static String sha(String txt){

        return encrypt(txt, "SHA");
    }

    public static  String sha1(String txt){

        return encrypt(txt, "SHA1");
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
    

	public static String md5(byte[] source) {
		String s = null;
		char hexDigits[] = { // 用来将字节转换成 16 进制表示的字符
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',
				'e', 'f' };
		try {
			java.security.MessageDigest md = java.security.MessageDigest
					.getInstance("MD5");
			md.update(source);
			byte tmp[] = md.digest(); // MD5 的计算结果是一个 128 位的长整数，
			// 用字节表示就是 16 个字节
			char str[] = new char[16 * 2]; // 每个字节用 16 进制表示的话，使用两个字符，
			// 所以表示成 16 进制需要 32 个字符
			int k = 0; // 表示转换结果中对应的字符位置
			for (int i = 0; i < 16; i++) { // 从第一个字节开始，对 MD5 的每一个字节
				// 转换成 16 进制字符的转换
				byte byte0 = tmp[i]; // 取第 i 个字节
				str[k++] = hexDigits[byte0 >>> 4 & 0xf]; // 取字节中高 4 位的数字转换,
				// >>> 为逻辑右移，将符号位一起右移
				str[k++] = hexDigits[byte0 & 0xf]; // 取字节中低 4 位的数字转换
			}
			s = new String(str); // 换后的结果转换为字符串

		} catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}

}
