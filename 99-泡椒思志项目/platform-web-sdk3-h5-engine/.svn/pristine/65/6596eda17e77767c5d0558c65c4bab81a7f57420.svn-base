package com.paojiao.sdk3.controller.pay;

/**
 * 订单状态.
 *
 */
public enum PayStatus {
	// 0待付款，1订单完成，2发货失败，3等待发货
	WAIT_PAY("等待付款", 0),
	PAY_SUCCESS("交易成功", 1),
	PAY_NOTIFY_FAL("交易成功", 2),
	PAY_WAIT("等待发货", 3);

	public String name;// 名称
	public int id;

	/**
	 * 构造枚举.
	 *
	 * @param name
	 *            名称.
	 */
	private PayStatus(String name, int id) {
		this.name = name;
		this.id = id;
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

	public static PayStatus getById(int v) {
		PayStatus gender = null;
		PayStatus[] list = PayStatus.values();

		for (PayStatus g : list) {
			if (g.id == v) {
				gender = g;
			}
		}
		return gender;
	}

}
