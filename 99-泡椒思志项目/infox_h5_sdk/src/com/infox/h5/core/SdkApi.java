package com.infox.h5.core;

import java.util.Map;

/**
 * sdkApi
 * 
 * @author 156
 *
 */
public interface SdkApi {
	/**
	 * 发送短信到手机
	 */
	public String sendUserInfo(Map<String, Object> params);

	/**
	 * 获取游戏信息
	 */
	public String getGameInfo(Map<String, Object> params);

	/**
	 * 融合创建订单
	 */
	public String getOrderID(Map<String, Object> params);
	
	/**
	 * 获取用户切支付结果
	 * @Description:
	 * @param params
	 * @return
	 */
	public String getOrderNo(Map<String, Object> params);

	/**
	 * 拉起支付
	 */
	public String getOrderUrl(Map<String, Object> params);

	/**
	 * 初始化悬浮窗
	 */
	public String openGame(Map<String, Object> params);

	/**
	 * 一键注册
	 */
	public String random(Map<String, Object> params);

	/**
	 * 账号密码注册
	 */
	public String reg(Map<String, Object> params);

	/**
	 * 登录
	 */
	public String getToken(Map<String, Object> params);

	/**
	 * 验签
	 * 
	 * @param params
	 * @param key
	 * @return
	 */
	public String paySign(Map<String, Object> params, String key);

	public String getCptoKen(Map<String, Object> params);

	@Deprecated
	public String getIosGameInfo(Map<String, Object> params);
}
