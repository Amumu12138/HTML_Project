package com.paojiao.sdk3.common.util.report;


public enum SyncType {
	ACTIVATE("激活", 1),
	REGISTER("注册", 2),
	RECHARGE("充值", 3);

	/**名字**/
	public String name;
	/**代码**/
	public Integer code;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	private SyncType(String name, Integer code) {
		this.name = name;
		this.code = code;
	}

	public static SyncType getById(int code) {
		SyncType type = null;
		SyncType[] list = SyncType.values();
		for (SyncType g : list) {
			if (g.code == code) {
				type = g;
			}
		}
		return type;
	}

}
