package com.infox.h5.action;


import java.util.Map;
import java.util.logging.Logger;

import com.google.gson.JsonObject;
import com.infox.h5.core.AndApi;
import com.infox.h5.utils.JsonUtils;
import com.infox.h5.utils.ParamsUtils;
import com.jfinal.core.Controller;

public class ApiAction extends Controller {
	
	private static AndApi andApi = new AndApi();

	/**
	 * 发送短信到手机
	 */
	public void sendUserInfo() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.sendUserInfo(params));
	}
	/**
	 * 获取游戏信息
	 */
	public void getGameInfo() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.getGameInfo(params));
	}
	/**
	 * 融合创建订单
	 */
	public void getOrderID() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.getOrderID(params));
	}
	
	/**
	 * 获取用户切支付结果
	 */
	public void getOrderNo() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.getOrderNo(params));
	}
	/**
	 * 拉起支付
	 */
	public void getOrderUrl() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.getOrderUrl(params));
	}
	/**
	 * 初始化悬浮窗
	 */
	public void openGame() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.openGame(params));
	}
	/**
	 * 一键注册
	 */
	public void random() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.random(params));
	}
	/**
	 * 账号密码注册
	 */
	public void reg() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.reg(params));
	}
	/**
	 * 登录
	 */
	public void getToken() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.getToken(params));
	}

	public void getCptoKen() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.getCptoKen(params));
	}

	public void getIosGameInfo() {
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		super.renderJson(andApi.getIosGameInfo(params));
	}

	/**
	 * 上报角色信息
	 */
	public void reportRoleInfo(){
		Map<String, Object> params = ParamsUtils.getParams(super.getParaMap());
		String jsonParams =JsonUtils.objectToJson(params);
		super.renderJson(jsonParams);
	}

}
