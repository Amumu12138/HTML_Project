package com.paojiao.sdk3.common.util;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.util.*;

/**
 *
 * @author wangdeyu
 *
 */
public class SignUtil2 {
	public static final Logger log = Logger.getLogger(SignUtil.class);
	public static String md5before;
	public static String mySign;

	/***
	 * 生成sign
	 */
	public static String generateSign(Map<String, String> prarms, String key) {
		md5before = sortParam(prarms);
		System.out.println(md5before);
		if (!UrlEncoderUtils.hasUrlEncoded(md5before))
			try {
				md5before = URLEncoder.encode(md5before, "UTF-8");
			} catch (Exception e) {
				log.error("签名字符串进行URLEncoder.encode时出现错误：" + e.getMessage());
				return null;
			}
		//log.info("md5before=====[" + md5before + "]");
		return md5(md5before.toString() + key);

	}




	public static String generateUcSign(Map<String, String> prarms, String key) {
		String md5before = sortParam(prarms);
		log.info("============>>generateSign[" + JSON.toJSONString(prarms) + "] \n\t md5before[" + md5before + "]");
		return md5(md5before.toString() + key);
	}


	public static String generateUcSign2(Map<String, String> prarms, String key) {
		String md5before = sortParam2(prarms);

		try {
			md5before = URLEncoder.encode(md5before, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		log.info("============>>generateSign[" + JSON.toJSONString(prarms) + "] \t md5before[" + md5before +key+ "]");
		return md5(md5before.toString() + key);

	}



	public static boolean isSignOK(String signStr, String sign) {

		String newSign = md5(signStr);

		return newSign.toLowerCase().equals(sign.toLowerCase());

	}

	public boolean isSignOK(Map<String, String> params, String sign, String key) {
		this.mySign = generateSign(params, key);
		if (mySign == null || sign == null) {
			return false;
		}
		return mySign.toLowerCase().equals(sign.toLowerCase());
	}

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
			sb.append(Integer.toHexString((bts[i] & 0xFF) | 0x100).substring(1,
					3));
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
	public static String sortParam(Map<String, String> params) {
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
			String value = (String) params.get(key);
			content.append(key);
			content.append("=");
			content.append(value);
		}
		return content.toString();
	}


	public static String sortParam2(Map<String, String> params) {
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
			if(i>0)
				content.append("&");
			String value = (String) params.get(key);
			content.append(key).append("=").append(value);
		}
		return content.toString();
	}




	public static Map<String, String> encodeMap2(Map<String, String> param){
		Map<String, String> newMap = new HashMap<String, String>();
		Iterator<Map.Entry<String, String>> it = param.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry<String, String> entry = it.next();
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


	public static String mapToUrlNotEncode2(Map<String, String> params) {

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
	/**
	 * 对请求参数按照一定的规则排序,使用LinkedHashMap 顺序排序
	 *
	 * @param params
	 *            请求中获取的键值
	 * @return
	 */
	public static String sortParam3(Map<String, String> params) {
		StringBuffer content = new StringBuffer();
		// 按照key做排序
		List<String> keys = new ArrayList<String>(params.keySet());
		//Collections.sort(keys);
		for (int i = 0; i < keys.size(); i++) {
			String key = (String) keys.get(i);
			// sign参数不参与加密
			if ("sign".equals(key)) {
				continue;
			}
			if(i>0)
				content.append("&");
			String value = (String) params.get(key);
			content.append(key).append("=").append(value);
		}
		return content.toString();
	}
}
