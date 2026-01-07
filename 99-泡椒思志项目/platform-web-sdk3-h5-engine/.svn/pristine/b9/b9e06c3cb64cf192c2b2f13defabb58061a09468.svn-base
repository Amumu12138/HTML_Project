package com.paojiao.sdk3.common;



/**
 * 支付方式.
 * @author Van
 *
 */
public enum PayStyle {

	PAOJIAO_MONEY("泡椒币支付",0),
	ALIPAY_MOBILE("支付宝支付",1),
	TENPAY_MOBILE("财付通支付",2),
	UNION_MOBILE("银联支付",3),
	RECHARGECARD_MOBILE("手机充值卡支付",4),
	PAYPALM("掌上汇通支付",6),
	MO9("MO9支付",5),
	YEEPAY("易宝支付",7),
	JCARDPAY("骏卡支付",8),
	PJTICKET("代金券支付",9),
	PJGOLD_AND_TICKET("泡椒币+代金券",10),
	WXPAY("微信支付",11),
	SZWXPAY("神州付微信支付",12),
	WFTPAY("威富通微信支付",13),
	YOUYANG_WX("有氧微信支付",14),
	YOUYANG_ALI("有氧支付宝支付",15),
	HEEPAY_MUGUAN_WX("汇元网穆冠微信支付",16),
	PJ_ACTIVE("活动或后台发放",20),
	PAY_CENTER("支付中心支付",29);


	public String name;//名称
	public int id;

	/**
	 * 构造枚举.
	 * @param name 名称.
	 */
	private PayStyle(String name,int id) {
		this.name = name;
		this.id=id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public static PayStyle getById(int v) {
		PayStyle gender = null;
		PayStyle[] list = PayStyle.values();

		for (PayStyle g : list) {
			if (g.id == v) {
				gender = g;
			}
		}
		return gender;
	}


}
