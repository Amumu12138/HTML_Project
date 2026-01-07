package com.paojiao.sdk3.common.util;

import java.util.Date;

import org.apache.commons.lang.RandomStringUtils;

/**
 * Token生成器.
 * 
 * @author Administrator
 *
 */
public final class TokenGenerator {

	/**
	 * token 生成算法
	 * 
	 * @param username
	 * @return
	 */
	public static String generateToken(String username) {
		return RandomStringUtils.randomAlphanumeric(32);
	}

	/**
	 * token 生成算法
	 * 
	 * @param username
	 * @return
	 */
	public static String generateToken2(String username) {
		StringBuilder sb = new StringBuilder(username);
		sb.append(new Date().getTime());
		sb.append(RandomStringUtils.randomAlphanumeric(32));
		return SignUtil.md5(sb.toString());
	}
}
