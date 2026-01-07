package com.paojiao.sdk3.common;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.kit.JsonKit;

public enum StatusType {
	AUTH_SUCCESS(1, "验证成功"),
	GAME_NONE(2, "游戏不存在"),
	CHANNEL_GAME_EXCEPTION(3,"渠道游戏异常"),
	CHANNEL_GAME_NONE(4, "SDK渠道游戏不存在"),
	SDK_CHANNEL_NONE(5,"SDK渠道不存在"),
	SIGN_ERROR(6, "MD5签名错误"),
	SDKTOKEN_EMPTY(7,"客户端请求的sdkToken为空！"),
	USER_FORBIDDEN(8, "此用户被禁用！"),
	AUTH_FAILED(9,"SDK渠道验证token失败！"),
	AUTH_EXCEPTION(10, "SDK渠道验证发生异常！"),
	REQUEST_VERIFY_EXCEPTION(11, "初始化验证请求异常"),
	ORDER_MONEY_INVALID(12, "订单金额不合法！"),
	USER_NONE(13, "用户不存在！"),
	USER_NOT_LOGIN(14, "未登录或登录超时！"),
	ORDER_FAL(15,"充值订单生成失败！"),
	ORDER_EXC(15, "充值订单生成异常！"),
	USER_NAME_TOO_LONG(16,"用户名过长！"),
	PJ_REG_EXCEPTION(17, "泡椒注册异常！"),
	CP_ORDER_EXISTS_EXCEPTION(18, "订单已过期或已成功支付，请返回游戏查看！"),
	IOS_VER_FAL(19, "IOS支付凭证验证失败！"),
	SDK_ORDER_NONE(	20, "渠道订单不存在！"),
	SDK_GAME_PAY_NONE(21, "游戏支付环境未设置！"),
	SDK_GAME_PAY_ERROR(	22, "获取游戏支付环境异常！"),
	USER_IDCARD_EXIST(23, "身份证号码已被使用！"),
	USER_IDCARD_INVALID(23, "身份证号码格式不正确！"),
	USER_REAL_NAME_AUTH_EXC(24, "实名认证异常！"),
	USER_REAL_NAME_AUTH_EXIST(25, "用户已经通过实名认证！"),
	PARAM_ERROR(26, "参数错误"),
	QUERY_ERROR(27, "查询失败"),
	CREATE_SDK_GAME_PAY_EXCEPTION(28, "生成游戏支付环境失败"),
	PJ_LOGIN_EXCEPTION(29, "泡椒登录异常！"),
	REPORT_USER_ROLE_INFO(30, "上报玩家角色信息失败"),
	GET_PAY_CONFIG_EXCEPTION(31, "获取支付配置失败"),
	VERIFY_TOKEN_EXCEPTION(32, "token验证异常"),
	INIT_FLOAT_BOX_EXCEPTION(33, "获取悬浮菜单失败"),
	GEN_PAY_URL_EXCEPTION(34, "支付链接生成失败"),
	OPEN_UC_EXCEPTION(35, "获取悬浮菜单失败"),
	GET_RH_ORDER_EXCEPTION(36, "获取订单失败"),
	GET_POPUP_CONFIG_ERROR(37, "获取弹窗配置失败"),
	GET_FLOAT_CONFIG_ERROR(38, "获取悬浮窗红点状态失败"),
	GET_FLOAT_PAGE_ERROR(39, "获取悬浮窗页面失败"),
	USER_REAL_NAME_AUTH_NONE(40, "未实名认证,请前往设置进行实名认证"),
	NO_AGE_NO_PAY(41, "未成年不允许充值"),
	PAY_MONEY_EXCESS(42, "充值金额过大"),
	MONTH_PAY_MONEY_EXCESS(43, "当月累计充值已达到上线");


	public int id;
	public String msg;

	private StatusType(int id, String msg) {
		this.id = id;
		this.msg = msg;
	}

	public static void main(String[] args) {
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("msg", CHANNEL_GAME_NONE.msg);
		res.put("state", CHANNEL_GAME_NONE.id);
		System.out.println(JsonKit.toJson(res));
	}
}
