package com.paojiao.sdk3.common;

import java.util.Map;

import com.paojiao.sdk3.common.util.BeanToMapUtil;

/**
 * 根据 user agent string 来判断出客户端的浏览器以及平台等信息
 * 
 * @author wangdeyu
 */
public class UserAgent {
	private String browserInfo;// 浏览器类型
	private String osType;// 操作系统类型
	private String os;// 操作系统

	public UserAgent() {
	}

	public UserAgent(String browserInfo, String osType, String os) {
		this.browserInfo = browserInfo;
		this.osType = osType;
		this.os = os;
	}



	public String getBrowserInfo() {
		return browserInfo;
	}

	public void setBrowserInfo(String browserInfo) {
		this.browserInfo = browserInfo;
	}

	public String getOsType() {
		return osType;
	}

	public void setOsType(String osType) {
		this.osType = osType;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	/**
	 * 将UserAgent转成map；
	 * 
	 * @param map
	 * @return
	 */
	public Map<String, String> toMap() {
		try {
			return BeanToMapUtil.convertBean(this);
		} catch (Exception e) {
			return null;
		}

	}
}